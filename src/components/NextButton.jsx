import React from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * Styled Next Button
 * @param {object} param
 * @param {string | undefined} param.content
 * @param {boolean} param.isDisabled
 * @param {function} param.onClick
 * @param {string} param.linkTo
 * @returns
 */
export default function NextButton({
  content = '다음으로 넘어가기',
  isDisabled,
  onClick,
  linkTo,
}) {
  const navigate = useNavigate();
  return (
    <button
      disabled={isDisabled}
      className="mb-6 h-12 bg-success text-white text-center w-full text-md p-3 rounded-lg active:scale-[99%] transition-all ease-in-out duration-300 disabled:bg-gray-300 active:disabled:scale-100"
      onClick={onClick || (() => navigate(linkTo))}
    >
      {content}
    </button>
  );
}
