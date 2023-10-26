import React from 'react';

import { MultiInput } from './MultiInput';
import { Input } from '@ui5/webcomponents-react';

export function TextArrayInput({
  defaultOpen,
  inputProps: _inputProps,
  sectionTooltipContent,
  placeholder,
  toInternal = value => value || [],
  toExternal = value => value.filter(val => typeof val === 'string'),
  readOnly,
  customFormatFn,
  ariaLabel,
  ...props
}) {
  const { validate, ...inputProps } = _inputProps || {};
  const readOnlyOptions = readOnly ? { readOnly: true } : {};

  return (
    <MultiInput
      defaultOpen={defaultOpen}
      toInternal={toInternal}
      toExternal={toExternal}
      sectionTooltipContent={sectionTooltipContent}
      readOnly={readOnly}
      inputs={[
        ({
          value,
          setValue,
          ref,
          updateValue,
          focus,
          index,
          internalValue,
          setMultiValue,
        }) => (
          <Input
            placeholder={Math.abs(index) === 1 ? placeholder : ''}
            key={index}
            value={value || ''}
            ref={ref}
            onInput={e => {
              setValue(e.target.value);
              updateValue();
            }}
            className="input-full"
            // onKeyDown={e => focus(e)}
            // onBlur={() => {
            //   const fieldValue = internalValue?.filter(val => !!val);
            //   setMultiValue(
            //     typeof customFormatFn === 'function'
            //       ? customFormatFn(fieldValue)
            //       : fieldValue,
            //   );
            // }}
            {...readOnlyOptions}
            {...inputProps}
            aria-label={ariaLabel}
          />
        ),
      ]}
      {...props}
    />
  );
}
