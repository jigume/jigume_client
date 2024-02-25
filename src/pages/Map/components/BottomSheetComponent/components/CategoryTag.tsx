import { FilterType } from '../index.d';

export default function CategoryTag({
  item,
  index,
  filter,
  setFilter,
}: {
  item: FilterType;
  index: number;
  filter: FilterType[];
  setFilter: React.Dispatch<React.SetStateAction<FilterType[]>>;
}) {
  return (
    <div
      className="rounded-lg border border-gray-100 bg-white px-2 py-1 font-light"
      onClick={() => {
        const prevData = [...filter];

        prevData[index] = {
          ...prevData[index],
          checked: !item.checked,
        };

        setFilter(prevData);
      }}
    >
      <img className="mr-1 inline-block size-4" src={item.icon} alt="필터" />
      <span className="text-xs">{item.name}</span>
    </div>
  );
}
