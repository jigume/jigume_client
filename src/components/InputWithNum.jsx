import React from 'react';
/**
 * Styled Input과 maxLength
 * @param {object} param
 * @param {string} param.value
 * @param {function} param.onChange
 * @param {number} param.maxLength
 * @returns
 */
export default function InputWithNum({ value, onChange, maxLength }) {
  return (
    <div className="w-full h-12 block relative">
      <input
        type="text"
        placeholder="입력해 주세요"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="mt-1 block w-full py-3 pl-3 pr-16 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      />
      <div className="text-gray-500 absolute top-0 right-4 translate-y-1/2">
        {value.length !== 0 ? value.length : 0}/20
      </div>
    </div>
  );
}
