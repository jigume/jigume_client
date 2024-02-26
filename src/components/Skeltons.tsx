import PlaceInfo from '@src/pages/Goods/components/PlaceInfo';
import ItemComponent from '@src/pages/Map/components/BottomSheetComponent/components/ItemComponent';

export function CommentSkeleton() {
  return (
    <div className="container mx-auto mt-8 max-w-screen-sm bg-white">
      <div className="flex items-center gap-2 border-b p-4 text-lg font-medium text-gray-700">
        <div>댓글</div>
        <div className="h-4 w-6 animate-pulse rounded-sm bg-zinc-300" />
      </div>

      <div className="grid animate-pulse grid-cols-8 gap-4 px-4 py-8">
        <div className="col-span-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="aspect-square size-8 rounded-full bg-zinc-300" />
            <div className="h-4 w-16 rounded-sm bg-zinc-300" />
          </div>
          <div className="h-4 w-24 rounded-sm bg-zinc-300" />
        </div>

        <div className="col-span-7 col-start-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="h-3 w-16 rounded-sm bg-zinc-300" />
            <div className="h-3 w-24 rounded-sm bg-zinc-300" />
            <div className="h-3 w-12 rounded-sm bg-zinc-300" />
          </div>
          <div className="h-3 w-32 rounded-sm bg-zinc-300" />
        </div>

        <div className="col-span-7 col-start-2">
          <div className="h-3 w-20 rounded-sm bg-zinc-300" />
        </div>

        <div className="col-span-7 col-start-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="aspect-square size-8 rounded-full bg-zinc-300" />
            <div className="h-4 w-20 rounded-sm bg-zinc-300" />
          </div>
          <div className="h-4 w-16 rounded-sm bg-zinc-300" />
        </div>

        <div className="col-span-6 col-start-3 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="h-3 w-16 rounded-sm bg-zinc-300" />
            <div className="h-3 w-24 rounded-sm bg-zinc-300" />
            <div className="h-3 w-12 rounded-sm bg-zinc-300" />
          </div>
          <div className="h-3 w-32 rounded-sm bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}

export function NoticeSkeleton() {
  return (
    <>
      {/* 상품 정보 */}
      <div className="w-full bg-white">
        <ItemComponent />
      </div>

      <div className="flex flex-col gap-2 bg-gray-100 px-4 pt-8">
        {/* 위치 정보 */}
        <PlaceInfo bg="bg-white" />

        {/* 공지사항 */}
        <div className="rounded-xl bg-white px-4 py-6">
          <div className="pb-3 text-xl">공지사항</div>

          <div className="flex animate-pulse flex-col gap-3">
            <div className="h-3 w-44 rounded-sm bg-zinc-300" />
            <div className="flex gap-2">
              <div className="h-3 w-10 rounded-sm bg-zinc-300" />
              <div className="h-3 w-20 rounded-sm  bg-zinc-300" />
            </div>
            <div className="h-3 w-28 rounded-sm bg-zinc-300" />
            <div className="h-3 w-32 rounded-sm bg-zinc-300" />
            <div className="flex gap-2">
              <div className="h-3 w-20 rounded-sm bg-zinc-300" />
              <div className="h-3 w-20 rounded-sm  bg-zinc-300" />
            </div>
            <div className="h-3 w-36 rounded-sm bg-zinc-300" />
          </div>
        </div>
      </div>
    </>
  );
}
