import React from 'react';
/**
 * Styled Input과 maxLength
 * @param {object} param
 * @param {string} param.content
 * @param {function} param.handleContent
 * @returns
 */
export default function StyledTextarea({ content, handleContent }) {
  return (
    <textarea
      name="introduce"
      className="border border-slate-300 rounded-md w-full p-3 text-sm placeholder-slate-400 focus:outline-none focus:border-success focus:ring-1 focus:ring-success disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      placeholder="1명이라도 공동구매에 함께하면 추가배송비가 절반 넘게 절약될거에요!"
      onChange={handleContent}
      value={content}
    />
  );
}
