import Camera from '@src/asset/icon/initAccess/camera.svg';
import SaveArea from '@src/asset/icon/initAccess/saveArea.svg';
import Position from '@src/asset/icon/initAccess/position.svg';
import NextButton from '@src/components/NextButton';

export default function InitAccessRights() {
  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div className="flex h-full flex-col justify-center pb-24">
        <div className="pb-4 text-xl font-bold">앱 접근권한 안내</div>
        <div className="text-[#3E404C]">
          미동의 시, 지구미 서비스의 이용이 제한 될 수 있습니다.
        </div>

        <div className="flex flex-col gap-6 py-10">
          <div className="flex">
            <img className="size-12" src={SaveArea} alt="저장공간" />
            <div className="pl-4">
              <div className="text-lg font-medium text-[#252730]">저장공간</div>
              <div className="break-keep text-[#3E404C]">
                사용자 식별정보등 앱 사용 관련 정보를 사용합니다.
              </div>
            </div>
          </div>
          <div className="flex">
            <img className="size-12" src={Position} alt="위치정보" />
            <div className="pl-4">
              <div className="text-lg font-medium text-[#252730]">위치정보</div>
              <div className="break-keep text-[#3E404C]">
                현재위치를 기반으로 가장 가까운 구매폼 추천해드립니다.
              </div>
              <div className="font-light text-[#858899] underline">
                자세히 보기
              </div>
            </div>
          </div>
          <div className="flex">
            <img className="size-12" src={Camera} alt="카메라" />
            <div className="pl-4">
              <div className="text-lg font-medium text-[#252730]">카메라</div>
              <div className="break-keep text-[#3E404C]">
                구매폼을 작성하며 카메라 및 앨범에서 이미지를 등록합니다.
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#858899]">
          ※ 설정 &gt; 애플리케이션 &gt; 지구미 &gt; 권한 메뉴에서도 <br />
          설정하실 수 있습니다.
        </div>
      </div>

      <NextButton linkTo="/auth/init/user" />
    </div>
  );
}
