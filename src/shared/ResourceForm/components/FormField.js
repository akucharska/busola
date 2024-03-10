import classnames from 'classnames';
import { FlexBox, Icon } from '@ui5/webcomponents-react';
import { Tooltip } from 'shared/components/Tooltip/Tooltip';
import { Label } from '../../../shared/ResourceForm/components/Label';
import { spacing } from '@ui5/webcomponents-react-base';

import { useCreateResourceDescription } from 'components/Extensibility/helpers';

import './FormField.scss';

export function FormField({
  simple,
  advanced,
  propertyPath,
  label,
  input,
  className,
  required,
  disabled,
  tooltipContent,
  isAdvanced,
  isListItem,
  defaultValue,
  messageStrip,
  inputInfo,
  updatesOnInput,
  style,
  ...props
}) {
  const { validate, ...inputProps } = props;
  const inputInfoLink = useCreateResourceDescription(inputInfo);

  return (
    <FlexBox
      className={classnames('form-field', className)}
      justifyContent="Center"
      direction="Column"
      style={{ ...style }}
    >
      <FlexBox wrap="Wrap" alignItems="Center" className="bsl-col-md--12">
        {!isListItem && <Label required={required && !disabled}>{label}</Label>}
        <div className="tooltip-column">
          {tooltipContent && (
            <Tooltip className="has-tooltip" delay={0} content={tooltipContent}>
              <Icon
                aria-label=""
                className="bsl-icon-m"
                name="message-information"
                design="Information"
                style={spacing.sapUiTinyMarginBegin}
              />
            </Tooltip>
          )}
        </div>
      </FlexBox>
      <FlexBox wrap="Wrap" alignItems="Center">
        <div className="bsl-col-md--12">
          <FlexBox wrap="Wrap" alignItems="Center">
            {messageStrip
              ? messageStrip
              : input({
                  updatesOnInput,
                  required,
                  disabled,
                  className: 'full-width',
                  ...inputProps,
                })}
            {inputInfo && (
              <Label wrappingType="Normal" style={{ marginTop: '5px' }}>
                {inputInfoLink}
              </Label>
            )}
          </FlexBox>
        </div>
      </FlexBox>
    </FlexBox>
  );
}
