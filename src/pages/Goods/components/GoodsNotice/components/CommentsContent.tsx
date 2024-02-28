import addCommentIcon from '@src/asset/icon/addCommentIcon.svg';
import { GoodsPageDTO } from '@src/types/goods';
import { useMutation } from 'react-query';
import { getComment } from '@src/api/goods';
import React, { useEffect } from 'react';
import { getFormettedDate } from '@src/utils';
import { CommentSkeleton } from '@src/components/Skeltons';
import { PostCommentStateType } from '@src/pages/Goods/index.d';
import TimeAgo from 'javascript-time-ago';
import { add } from 'date-fns';

export default function CommentsContent({
  data,
  isSuccess,
  setContent,
}: {
  data: GoodsPageDTO;
  isSuccess: boolean;
  setContent: React.Dispatch<React.SetStateAction<PostCommentStateType>>;
}) {
  const timeAgo = new TimeAgo('ko');

  const {
    data: comment,
    mutate: getGoodsComment,
    isSuccess: isCommentSuccess,
  } = useMutation('goodsNotice', () =>
    getComment(data.goodsId as number, data.boardId as number)
  );

  const handleCommentType = (targetCommentId: number) => {
    setContent((prev) => ({ ...prev, targetCommentId }));
  };

  // 24시간 이내는 전체 포맷 아니면 n 시간 전
  const dateFormetter = (date: string | number) => {
    if (add(new Date(date), { days: 1 }) < new Date())
      return getFormettedDate(date);
    return timeAgo.format(new Date(date));
  };

  useEffect(() => {
    if (isSuccess) getGoodsComment();
  }, [isSuccess]);

  if (!isSuccess || !isCommentSuccess) return <CommentSkeleton />;

  return (
    <div className="container mx-auto mt-8 max-w-screen-sm bg-white">
      <div className="flex items-center gap-2 border-b p-4 text-lg font-medium text-gray-700">
        <div>댓글</div>
        <div className="text-zinc-900">{comment.commentDtoList.length}</div>
      </div>

      {/* content */}
      <div className="grid grid-cols-8 gap-3 px-4 py-8">
        {comment.commentDtoList.map((item, idx) => (
          <React.Fragment key={item.parent.commentId}>
            {/* parent */}
            <div className="col-span-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="aspect-square size-8 rounded-full"
                  src={item.parent.memberProfileUrl}
                  alt="사용자 프로필 이미지"
                />
                <div>{item.parent.memberNickname}</div>
              </div>
              <div className="text-sm text-gray-700">
                {dateFormetter(item.parent.created_at)}
              </div>
            </div>
            <div className="col-span-7 col-start-2 flex flex-col gap-1 px-4">
              <div>{item.parent.content}</div>
              <span
                className="flex w-fit cursor-pointer items-center gap-1 p-1 text-gray-500 active:opacity-70"
                onClick={() => handleCommentType(item.parent.commentId)}
              >
                <img
                  className="size-4 shrink-0 font-light"
                  src={addCommentIcon}
                  alt="답글달기"
                />
                답글달기
              </span>
            </div>

            {/* reply */}
            {item.reply.map((item2) => (
              <React.Fragment key={item2.commentId}>
                <div className="col-span-7 col-start-2 flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="aspect-square size-8 rounded-full"
                      src={item2.memberProfileUrl}
                      alt="사용자 프로필 이미지"
                    />
                    <div>{item2.memberNickname}</div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {dateFormetter(item.parent.created_at)}
                  </div>
                </div>
                <div className="col-span-6 col-start-3 flex flex-col gap-1">
                  {item2.content}
                </div>
              </React.Fragment>
            ))}

            {idx !== comment.commentDtoList.length - 1 && (
              <div className="col-span-8 h-[1px] w-full bg-zinc-300" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
