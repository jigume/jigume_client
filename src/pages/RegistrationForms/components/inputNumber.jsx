import React from 'react';

const InputNumber = (props) => {
  return (
    <input
      type="number"
      placeholder={props.placeholder}
      className="mt-1 h-10 w-50 bg-slate-200"
    />
  );
};

export default InputNumber;
