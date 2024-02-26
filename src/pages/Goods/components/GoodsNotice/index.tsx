import { Link, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import ProductAbout from './components/ProductAbout';
import CommentsContent from './components/CommentsContent';
import CommentsInput from './components/CommentsInput';
import { GoodsContextType, PostCommentStateType } from '../../index.d';
import DetailHeader from '../DetailHeader';

export default function GoodsNotice() {
  const { goods, isSuccess } = useOutletContext<GoodsContextType>();
  const [content, setContent] = useState<PostCommentStateType>({
    value: '',
    targetCommentId: -1,
  });

  return (
    <div className="container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll p-28 px-0 pt-14">
      <DetailHeader
        rightMenu={
          <Link className="text-sm" to="/modify">
            편집하기
          </Link>
        }
      />

      <div className="bg-gray-100">
        <ProductAbout data={goods?.goodsPageDto} isSuccess={isSuccess} />

        <CommentsContent
          data={goods?.goodsPageDto}
          isSuccess={isSuccess}
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
