import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { GoodsNoticeContextType, PostCommentStateType } from '../../index.d';
import DetailHeader from '../DetailHeader';
import ProductAbout from './components/ProductAbout';
import CommentsContent from './components/CommentsContent';
import CommentsInput from './components/CommentsInput';

export default function GoodsNoticeContent() {
  const {
    goods,
    isSuccess,
    isNoticeSuccess,
    isCommentSuccess,
    notice,
    comment,
  } = useOutletContext<GoodsNoticeContextType>();

  const [content, setContent] = useState<PostCommentStateType>({
    value: '',
    targetCommentId: -1,
  });

  return (
    <div className="container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll p-28 px-0 pt-14">
      <DetailHeader
        rightMenu={
          goods && (
            <Link
              className="text-sm"
              to={`/buying/${goods.goodsPageDto.goodsId}/notice/modify`}
            >
              편집하기
            </Link>
          )
        }
      />
      {/* {comment} */}
      <div className="bg-gray-100">
        <ProductAbout
          data={goods?.goodsPageDto}
          notice={notice}
          isSuccess={isSuccess}
          isNoticeSuccess={isNoticeSuccess}
        />

        <CommentsContent
          comment={comment}
          isSuccess={isSuccess}
          isCommentSuccess={isCommentSuccess}
          setContent={setContent}
        />

        <CommentsInput
          data={goods?.goodsPageDto}
          content={content}
          setContent={setContent}
        />
      </div>
    </div>
  );
}
