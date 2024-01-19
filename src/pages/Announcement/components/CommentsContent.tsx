import addCommentIcon from '@src/asset/icon/addCommentIcon.svg';
import User from './User';
import CommentsText from './CommentsText';

export default function CommentsContent() {
  return (
    <div className="container mx-auto mt-8 max-w-screen-sm bg-white">
      <div className="mb-4 border-b-2 border-gray-100 p-5 text-[14px] font-medium">
        댓글 23
      </div>
      <div>
        <User title="임시제목" username="유저이름" count={1} />
        <CommentsText />
        <div className="m-4 flex flex-row pl-12 text-[14px]">
          <div className="p-1 align-middle">
            <img src={addCommentIcon} alt="답글달기" />
          </div>
          <div className="align-middle text-gray-600">답글달기</div>
        </div>
        <div className="m-4 pl-12 align-middle text-[14px] font-medium text-cyan-400">
          이전 답글 1개 더보기
        </div>
        <div className="pl-14">
          <User title="임시제목" username="유저이름" count={1} />
          <CommentsText />
        </div>
        <div className="pl-14">
          <User title="임시제목" username="유저이름" count={1} />
          <CommentsText />
        </div>
      </div>
      <div className="mt-24"> </div>
    </div>
  );
}
