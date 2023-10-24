import React from 'react';

export default function OpenGraphViewer({ openGraph, link }) {
  return (
    <div className="w-full flex flex-row items-center gap-2 border rounded-md overflow-hidden">
      <div className="h-20 aspect-square">
        {openGraph?.image ? (
          <img
            className="w-full h-full object-cover"
            src={openGraph?.image?.url}
          />
        ) : (
          <div className="w-full h-full object-cover bg-gray-300 animate-pulse" />
        )}
      </div>

      <div className="h-20 w-full flex flex-col justify-evenly grow-0 gap-2 py-2 pr-4 overflow-hidden">
        <div className="w-full line-clamp-2 text-xs overflow-hidden">
          {!openGraph?.title ? (
            <div className="w-4/5 h-4 bg-gray-300 animate-pulse" />
          ) : (
            openGraph?.title
          )}
        </div>
        <div className="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
          {!link ? (
            <div className="w-3/4 h-3 bg-gray-200 animate-pulse" />
          ) : (
            link
          )}
        </div>
      </div>
    </div>
  );
}
