import React from 'react';

export default function OpenGraphViewer({ openGraph, link, imgSize = 'h-20' }) {
  return (
    <div className="flex w-full flex-row items-center gap-2 overflow-hidden rounded-md border">
      <div className={`aspect-square ${imgSize}`}>
        {openGraph?.image ? (
          <img
            className="h-full w-full object-cover"
            src={openGraph?.image?.url}
          />
        ) : (
          <div className="h-full w-full animate-pulse bg-gray-300 object-cover" />
        )}
      </div>

      <div className="flex h-20 w-full grow-0 flex-col justify-evenly gap-2 overflow-hidden py-2 pr-4">
        <div className="line-clamp-2 w-full overflow-hidden text-xs">
          {!openGraph?.title ? (
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-300" />
          ) : (
            openGraph?.title
          )}
        </div>
        <div className="truncate text-xs text-gray-500">
          {!link ? (
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
          ) : (
            link
          )}
        </div>
      </div>
    </div>
  );
}
