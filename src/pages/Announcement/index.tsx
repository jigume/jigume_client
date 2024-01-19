import React from 'react';
import ProductAbout from './components/ProductAbout';
import CommentsContent from './components/CommentsContent';
import CommentsInput from './components/CommentsInput';

export default function Announcement() {
  return (
    <div className="container mx-auto max-w-screen-sm px-0">
      <svg
        width="375"
        height="48"
        viewBox="0 0 375 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37 31.0002L30 24.0002L37 17.0002"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="bg-gray-100">
        <ProductAbout />
        <CommentsContent />
        <CommentsInput />
      </div>
    </div>
  );
}
