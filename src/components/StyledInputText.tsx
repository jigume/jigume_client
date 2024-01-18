import React from 'react';
import { StyledInputTextType } from './index.d';

export default function StyledInputText({
  value,
  onChange,
  placeholder,
  height = 12,
}: StyledInputTextType) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`block w-full rounded-md border border-slate-300 bg-white p-3 text-sm placeholder:text-slate-400 focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none ${`h-${height}`}`}
    />
  );
}
