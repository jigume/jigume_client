import React from 'react';

export default function InfoContent({ introduction }) {
  return (
    <div className="flex w-[343px] py-[32px] place-content-center font-normal">
      {introduction}
    </div>
  );
}
