import React from 'react';

export default function UserName({ nickName }) {
  return (
    <div className="flex flex-col justify-center text-center text-gray950">
      <div>{nickName}</div>
    </div>
  );
}
