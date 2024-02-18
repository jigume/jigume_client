export default function ProductContent({
  introduction,
}: {
  introduction?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 border-b border-gray-300 py-8 ${
        !introduction ? 'animate-pulse' : ''
      }`}
    >
      {introduction ? (
        <div>{introduction}</div>
      ) : (
        <>
          <div className="h-3 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-3/4 rounded bg-gray-300" />
          <div className="h-3 w-1/2 rounded bg-gray-300" />
        </>
      )}
    </div>
  );
}

ProductContent.defaultProps = {
  introduction: undefined,
};
