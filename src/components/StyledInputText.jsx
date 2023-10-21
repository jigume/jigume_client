import React from 'react';

/**
 * Styled Input과 maxLength
 * @param {object} param
 * @param {string} param.value
 * @param {function} param.onChange
 * @param {string} param.placeholder
 * @returns
 */
export default function StyledInputText({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-12 mt-1 block w-full py-3 px-3 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
    />
  );
}
