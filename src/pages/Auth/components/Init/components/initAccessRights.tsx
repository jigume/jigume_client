import React from 'react';
import Camera from '../../../../../asset/icon/initAccess/camera.svg';
import SaveArea from '../../../../../asset/icon/initAccess/saveArea.svg';
import Position from '../../../../../asset/icon/initAccess/position.svg';

export default function InitAccessRights() {
  return (
    <div className="ml-4 mt-20 content-center">
      <div className="h-[44px] text-[20px] font-bold">앱 접근권한 안내</div>
      <div className="pb-2 text-[16px] font-semibold">
        <div className="inline text-[#1EBAD2]">선택적 </div>접근 권한
      </div>
      <div className="text-[14px] font-normal text-[#3E404C]">
        미동의 시에도 지구미 서비스를 이용할 수 있으나. 일부 서비스의 이용이
        제한 될 수 있습니다.
      </div>
      <div className="flex pt-8">
        <div className="flex size-[40px] justify-center rounded-[20px] bg-[#0D99FF33]">
          <img
            className="size-[28px] place-self-center"
            src={SaveArea}
            alt="저장공간"
          />
        </div>
        <div className="pl-4">
          <div className="text-[16px] font-medium text-[#252730]">저장공간</div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            사용자 식별정보등 앱 사용 관련 정보를
          </div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            사용합니다.
          </div>
        </div>
      </div>
      <div className="flex pt-6">
        <div className="flex size-[40px] justify-center rounded-[20px] bg-[#0D99FF33]">
          <img
            className="size-[28px] place-self-center"
            src={Position}
            alt="위치정보"
          />
        </div>
        <div className="pl-4">
          <div className="text-[16px] font-medium text-[#252730]">위치정보</div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            현재위치를 기반으로 가장 가까운 구매폼
          </div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            추천해드립니다.
          </div>
          <div className="text-[12px] font-medium text-[#858899]">
            위치기반 서비스 이용약관 자세히 보기 &gt;
          </div>
        </div>
      </div>
      <div className="flex pt-6">
        <div className="flex size-[40px] justify-center rounded-[20px] bg-[#0D99FF33]">
          <img
            className="size-[28px] place-self-center"
            src={Camera}
            alt="카메라"
          />
        </div>
        <div className="pl-4">
          <div className="text-[16px] font-medium text-[#252730]">카메라</div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            구매폼을 작성하며 카메라 및 앨범에서 이미지를
          </div>
          <div className="text-[14px] font-normal text-[#3E404C]">
            등록합니다.
          </div>
        </div>
      </div>
      <div className="pt-8">
        <div className="text-[13px] font-normal text-[#858899]">
          ※ 설정 &gt; 애플리케이션 &gt; 지구미 &gt; 권한 메뉴에서도
        </div>
        <div className="text-[13px] font-normal text-[#858899]">
          설정하실 수 있습니다.
        </div>
      </div>
    </div>
  );
}
