import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMutation } from 'react-query';
import NextButton from '../../../../components/NextButton';
import StyledTextarea from '../../../../components/StyledTextarea';
import postGoods from '../../../../api/register';
import LoadingButton from '../../../../components/LoadingButton';

const notice = `픽업 기간은 배송 완료 예정일인 9월 10일부터 13일 까지 입니다. 댓글로 픽업 시간을 알려주세요!

노쇼, 잠수를 타는 행위를 하실 경우 보증금을 돌려드리지 않습니다!

돈 아끼기 위해 참여한 구매잖아요.
보증금을 돌려받지 못하면 너무 아쉽겠죠?
픽업시간 반드시 지켜주시기 바랍니다!`;

function Notice() {
  /** @type {{data:{
   * image: any[]
   * address: string
   *  goodsDto: {
   *    goodsName: string
   *    boardContent: string
   *    introduction: string
   *    link: string
   *    goodsPrice: number
   *    deliveryFee: number
   *    mapX: number | undefined
   *    mapY: number | undefined
   *    goodsLimitCount: number
   *    goodsLimitTime: Date
   *    categoryName: number
   *  }
   * }}} 등록할 상품 정보  */
  const { data, setData } = useOutletContext();

  const handleNotice = (e) => {
    setData((prev) => ({
      ...prev,
      goodsDto: { ...prev.goodsDto, introduction: e.target.value },
    }));
  };

  const mutate = useMutation(
    'post_goods',
    () => postGoods(data.image, data.goodsDto),
    {
      retry: false,
    },
  );

  return (
    <div className="w-full h-[calc(100svh-48px)] flex flex-col justify-between">
      <div />
      <div className="pb-24">
        <div className="text-lg font-bold pb-10">
          댓글을 통해 팔로워들과 소통해요.
          <br />
          팔로워만 볼 수 있는 공지를 올려보세요.
        </div>
        <div>
          <div className="text-sm mb-2 font-thin">폼 내용</div>
          <StyledTextarea
            height="210px"
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
