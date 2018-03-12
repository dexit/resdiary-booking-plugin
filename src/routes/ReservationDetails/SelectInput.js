import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default props => {
  return (
    <Select
      {...props}
      value={props.input.value}
      onChange={value => {
        props.input.onChange(value);
        props.handleChange && props.handleChange(value.value);
      }}
      onBlur={() => props.input.onBlur(props.input.value.value)}
      options={props.options}
      clearable={false}
    />
  );
};
