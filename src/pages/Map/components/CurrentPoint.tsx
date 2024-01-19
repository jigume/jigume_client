export default function CurrentPoint() {
  return (
    <div className="flex size-[32px] items-center justify-center rounded-full bg-primaryBlue">
      <div className="relative z-30 size-[16px] rounded-full bg-white" />
      <div className="absolute z-10 size-[30px] animate-ping rounded-full bg-primaryBlue" />
    </div>
  );
}
