import category from '@src/pages/Map/components/BottomSheetComponent/data';

export default function ModifyCategory({
  idx,
  btn,
  onClick,
}: {
  idx: number;
  btn?: JSX.Element;
  onClick?: () => void;
}) {
  const { icon, name } = category.filter((item) => item.idx === idx)[0];

  return (
    <span
      className="flex w-fit shrink-0 items-center rounded-md border bg-white px-3 py-2 text-sm"
      onClick={onClick}
    >
      <img className="mr-1 inline-block size-[16px]" src={icon} alt={name} />
      {name} {btn}
    </span>
  );
}

ModifyCategory.defaultProps = {
  btn: undefined,
  onClick: undefined,
};
