import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default props => {
  return (
    <Select
      {...props}
      value={{label: props.input.value}}
      onChange={value => {
        props.input.onChange(value.label);
        props.handleChange(value.value)
      }}
      onBlur={() => props.input.onBlur(props.input.value)}
      options={props.options}
      clearable={false}
    />
  )
};