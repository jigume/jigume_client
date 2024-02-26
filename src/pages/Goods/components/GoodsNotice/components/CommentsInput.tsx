import { postCommentAtBoard, postCommentAtComment } from '@src/api/goods';
import SendIcon from '@src/asset/icon/SendIcon.svg';
import { GoodsPageDTO } from '@src/types/goods';
import { useMutation } from 'react-query';
import { PostCommentStateType } from '@src/pages/Goods/index.d';

const initContent = { value: '', targetCommentId: -1 };

export default function CommentsInput({
  data,
  content,
  setContent,
}: {
  data: GoodsPageDTO;
  content: PostCommentStateType;
  setContent: React.Dispatch<React.SetStateAction<PostCommentStateType>>;
}) {
  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prev) => ({ ...prev, value: e.target.value }));
  };

  const { mutate: postComment } = useMutation(
    'postCommentAtBoard',
    () =>
      postCommentAtBoard(
        data.goodsId as number,
        data.boardId as number,
        content.value
      ),
    {
      onSuccess: () => setContent(initContent),
    }
  );

  const { mutate: postReply } = useMutation(
    'postCommentAtComment',
    postCommentAtComment,
    {
      onSuccess: () => setContent(initContent),
    }
  );

  const handlePost = () => {
    if (content.value.length > 0) {
      if (content.targetCommentId === -1) postComment();
      else
        postReply({
          goodsId: data.goodsId as number,
          boardId: data.boardId as number,
          parentCommentId: content.targetCommentId,
          content: content.value,
        });
    }
  };

  return (
    <div className="container fixed inset-x-0 bottom-0 mx-auto max-w-screen-sm border-t bg-white px-4 pb-5 pt-4">
      <div className="relative w-full">
        <input
          className="block w-full rounded-md border bg-white py-4 pl-3 pr-14 text-sm placeholder:text-slate-400 focus:border-success focus:outline-none focus:ring-1 focus:ring-success disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          placeholder="댓글을 입력하세요"
          onChange={handleContent}
          value={content.value}
        />

        <button
          className="absolute right-2 top-1/2 flex size-9 shrink-0 -translate-y-1/2 items-center justify-center rounded-md bg-gray-100"
          onClick={handlePost}
        >
          <img src={SendIcon} alt="댓글 입력" />
        </button>
      </div>
    </div>
  );
}
