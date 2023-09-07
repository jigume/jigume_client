import React from 'react';

const InputText = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="mt-1 h-10 w-50 bg-slate-200"
    />
  );
};

export default InputText;
