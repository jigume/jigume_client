import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import { RegisterContextType } from '@src/types/register';
import NextButton from '@src/components/NextButton';
import StyledTextarea from '@src/components/StyledTextarea';
import { postGoods } from '@src/api/register';
import LoadingButton from '@src/components/LoadingButton';
import { initData } from '../..';

const notice = `픽업 기간은 배송 완료 예정일인 9월 10일부터 13일 까지 입니다. 댓글로 픽업 시간을 알려주세요!

노쇼, 잠수를 타는 행위를 하실 경우 보증금을 돌려드리지 않습니다!

돈 아끼기 위해 참여한 구매잖아요.
보증금을 돌려받지 못하면 너무 아쉽겠죠?
픽업시간 반드시 지켜주시기 바랍니다!`;

function Notice() {
  const { data, setData } = useOutletContext<RegisterContextType>();
  const navigate = useNavigate();

  const handleNotice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, introduction: e.target.value },
    }));
  };

  const mutate = useMutation(
    'post_goods',
    () => postGoods(data.imageInput, data.goodsDto, data.position),
    {
      retry: false,
      onSuccess: (res) => {
        setData(initData);
        navigate(`/goods/${res}/submitted`);
      },
    }
  );

  return (
    <div className="flex h-[calc(100svh-48px)] w-full flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="pb-10 text-lg font-bold">
          댓글을 통해 팔로워들과 소통해요.
          <br />
          팔로워만 볼 수 있는 공지를 올려보세요.
        </div>
        <div>
          <div className="mb-2 text-sm font-thin">폼 내용</div>
          <StyledTextarea
            height={210}
            placeholder={notice}
            onChange={handleNotice}
            value={data.goodsDto.introduction}
          />
        </div>
      </div>
      {mutate.isLoading ? (
        <LoadingButton />
      ) : (
        <NextButton
          content="공동 구매 폼 게시하기"
          onClick={() => mutate.mutate()}
        />
      )}
    </div>
  );
}

export default Notice;
