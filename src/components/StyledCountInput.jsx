import React from 'react';
import CurrencyInput from 'react-currency-input-field';

/**
 * Styled Currency Input
 * @param {object} param
 * @param {string} param.value
 * @param {function} param.onChange
 * @returns
 */
export default function StyledCountInput({ value, onChange }) {
  return (
    <CurrencyInput
      suffix=" 개"
      className="border rounded-md w-full p-3 text-sm font-medium text-right border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      value={value}
      defaultValue={0}
      decimalsLimit={2}
      onValueChange={onChange}
    />
  );
}
