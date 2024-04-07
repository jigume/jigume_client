import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Loading from '@src/pages/Map/components/Loading';
import StyledTextarea from '@src/components/StyledTextarea';
import { useMutation } from 'react-query';
import { postModifyNotice } from '@src/api/goods';
import { authState } from '@src/data';
import { AuthType } from '@src/types/data';
import { useRecoilState } from 'recoil';
import { GoodsNoticeContextType } from '../../index.d';
import ConfirmAlert from '../ConfirmAlert';
import NoticeModifyHeader from './components/NoticeModifyHeader';

export default function GoodsNoticeModify() {
  const { goods, isSuccess, isNoticeSuccess, notice } =
    useOutletContext<GoodsNoticeContextType>();
  const [newNotice, setNewNotice] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [auth] = useRecoilState<AuthType>(authState);

  const handleNotice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNotice(e.target.value);
  };

  const { mutate: modifyNotice } = useMutation(
    'modifyNotice',
    postModifyNotice
  );

  const handleModifyNotice = () => {
    if (newNotice !== notice.content && newNotice.length === 0)
      modifyNotice({
        goodsId: goods.goodsPageDto.goodsId,
        boardId: goods.goodsPageDto.boardId,
        boardContent: newNotice,
        accessToken: auth.accessToken as string,
      });
  };

  useEffect(() => {
    if (isSuccess && isNoticeSuccess) setNewNotice(notice.content);
  }, [isSuccess, isNoticeSuccess]);

  if (!isSuccess || !isNoticeSuccess)
    return (
      <div className="container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll p-28 px-0 pt-14">
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto h-svh w-full max-w-screen-sm overflow-y-scroll px-0 py-14">
      <NoticeModifyHeader
        rightMenu={
          <button className="text-sm" onClick={handleModifyNotice}>
            완료
          </button>
        }
        curr={newNotice}
        prev={notice.content}
        setIsConfirm={setIsConfirm}
      />

      {/* content */}
      <div className="flex flex-col gap-4 px-4">
        <div className="pt-20 text-xl font-bold">
          더 나은 안내가 필요하신가요?
          <br />
          공지글의 내용을 수정해보세요.
        </div>

        <div>
          <div className="py-2 text-sm">공지 내용</div>
          <StyledTextarea
            value={newNotice}
            height={256}
            placeholder=""
            onChange={handleNotice}
          />
        </div>
      </div>
      {isConfirm && <ConfirmAlert setIsConfirm={setIsConfirm} />}
    </div>
  );
}
