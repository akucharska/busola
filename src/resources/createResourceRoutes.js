import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { columnLayoutState } from 'state/columnLayoutAtom';

import { Spinner } from 'shared/components/Spinner/Spinner';
import { usePrepareDetailsProps, usePrepareListProps } from './helpers';
import { Route } from 'react-router-dom';
import pluralize from 'pluralize';
import { FlexibleColumnLayout } from '@ui5/webcomponents-react';
import { useFeature } from 'hooks/useFeature';

export const createPath = (
  config = { detailsView: false, pathSegment: '' },
) => {
  const { detailsView = false, pathSegment = '' } = config;

  const details = detailsView ? '/:resourceName' : '';

  return `${pathSegment}${details}`;
};

export const createUrl = (
  { resourceType, pathSegment, namespaced, resourceName },
  namespace,
) => {
  const namespacePrefix = namespaced ? `/namespaces/${namespace}` : '';
  const details = resourceName || '';
  pathSegment = pathSegment || pluralize(resourceType).toLowerCase();

  return `${namespacePrefix}/${pathSegment}/${details}`;
};

export const createKubernetesUrl = ({
  resourceType,
  namespace,
  resourceName,
  apiGroup = '',
  apiVersion,
}) => {
  const namespaceSegment = namespace ? `namespaces/${namespace}/` : '';
  const details = resourceName || '';
  const apiPrefix = apiGroup ? 'apis/' : 'api';
  resourceType = pluralize(resourceType).toLowerCase();

  return `${apiPrefix}${apiGroup}/${apiVersion}/${namespaceSegment}${resourceType}/${details}`;
};

const ListWrapper = ({ children, details, ...props }) => {
  const { isEnabled: isColumnLeyoutEnabled } = useFeature('COLUMN_LAYOUT');
  const layoutState = useRecoilValue(columnLayoutState);

  const elementListProps = usePrepareListProps(props);
  const elementDetailsProps = usePrepareDetailsProps({
    ...props,
    customResourceName: layoutState?.midColumn?.resourceName,
    customNamespaceId: layoutState.midColumn?.namespaceId,
  });

  const listComponent = React.cloneElement(children, {
    ...elementListProps,
    enableColumnLayout: isColumnLeyoutEnabled,
  });
  const detailsComponent = React.cloneElement(details, {
    ...elementDetailsProps,
  });

  return (
    <FlexibleColumnLayout
      style={{ height: '100%' }}
      layout={layoutState?.layout || 'OneColumn'}
      startColumn={<div slot="">{listComponent}</div>}
      midColumn={<div slot="">{detailsComponent}</div>}
    />
  );
};

const DetailsWrapper = ({ children, ...props }) => {
  const elementProps = usePrepareDetailsProps(props);
  return React.cloneElement(children, elementProps);
};

export const createResourceRoutes = ({
  List = null,
  Details = null,
  namespaced = true,
  resourceType = '',
  resourceI18Key = '',
  ...props
}) => {
  const pathSegment = resourceType.toLowerCase();

  const listPath = createPath({ pathSegment });
  const detailsPath = Details
    ? createPath({ pathSegment, detailsView: true })
    : '';

  return (
    <React.Fragment key={listPath}>
      <Route
        path={listPath}
        exact
        element={
          <Suspense fallback={<Spinner />}>
            <ListWrapper
              resourceType={resourceType}
              resourceI18Key={resourceI18Key}
              hasDetailsView={!!Details}
              details={<Details />}
              {...props}
            >
              <List allowSlashShortcut />
            </ListWrapper>
          </Suspense>
        }
      />
      {detailsPath ? (
        <Route
          path={detailsPath}
          element={
            <Suspense fallback={<Spinner />}>
              <DetailsWrapper
                resourceType={resourceType}
                resourceI18Key={resourceI18Key}
                {...props}
              >
                <Details />
              </DetailsWrapper>
            </Suspense>
          }
        />
      ) : null}
    </React.Fragment>
  );
};
