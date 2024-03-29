import { StyledTextareaType } from '.';

export default function StyledTextarea({
  value,
  onChange,
  height = undefined,
  placeholder,
}: StyledTextareaType) {
  return (
    <textarea
      style={{ height: height || 'auto' }}
      className="w-full rounded-md border border-slate-300 p-3 text-sm placeholder:text-slate-400 focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
