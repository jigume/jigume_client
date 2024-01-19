import { InputWithNumType } from '.';

export default function InputWithNum({
  value,
  onChange,
  maxLength,
}: InputWithNumType) {
  return (
    <div className="relative block h-12 w-full">
      <input
        type="text"
        placeholder="입력해 주세요"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="mt-1 block w-full rounded-md border border-slate-300 bg-white py-3 pl-3 pr-16 text-sm placeholder:text-slate-400 focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
      />
      <div className="absolute right-4 top-0 translate-y-1/2 text-gray-500">
        {value.length !== 0 ? value.length : 0}/20
      </div>
    </div>
  );
}
