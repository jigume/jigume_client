import React from 'react';
/**
 * Styled Input과 maxLength
 * @param {object} param
 * @param {string} param.value
 * @param {function} param.onChange
 * @param {number} param.height
 * @param {string} param.placeholder
 * @returns
 */
export default function StyledTextarea({
  value,
  onChange,
  height = undefined,
  placeholder,
}) {
  return (
    <textarea
      style={{ height: height || 'auto' }}
      className="border border-slate-300 rounded-md w-full p-3 text-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
