import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import { StyledCurrencyInputType } from '.';

export default function StyledCountInput({
  value,
  onValueChange,
}: StyledCurrencyInputType) {
  return (
    <CurrencyInput
      suffix=" 개"
      className="w-full rounded-md border border-slate-300 p-3 text-right text-sm font-medium placeholder:text-slate-400 focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      value={value}
      defaultValue={0}
      decimalsLimit={2}
      onValueChange={onValueChange}
    />
  );
}
