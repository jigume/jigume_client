import { Marker } from '@src/types/goods';
import MarkerPin from '../../asset/icon/markerPin.svg';
import { PreViewerMarker, sheetProviderType } from './index.d';

export const setMarkerDom = (
  item: Marker,
  sheetProvider: sheetProviderType,
  setPreViewer: React.Dispatch<
    React.SetStateAction<PreViewerMarker | undefined>
  >
) => {
  const markerElement = document.createElement('div');
  markerElement.className = 'relative z-10 w-[40px] h-[57px]';
  const markerPin = document.createElement('img');
  markerPin.src = MarkerPin;
  const markerImage = document.createElement('img');
  markerImage.className =
    'absolute left-[5px] top-[5px] z-[99] h-[30px] w-[30px] rounded-full bg-gray-300 prodImg';
  markerElement.setAttribute('data-id', String(item.goodsId));
  // markerImage.src = item.goodsRepImgUrl;
  markerElement.appendChild(markerPin);
  markerElement.appendChild(markerImage);

  markerElement.onclick = () => {
    sheetProvider.handleSheet('mid');
    setPreViewer({
      position: {
        lat: item.latitude,
        lng: item.longitude,
      },
      categoryId: item.categoryId,
      goodsId: item.goodsId,
      goodsRepImgUrl: '',
    });
  };

  return markerElement;
};

export const setClusterDom = (
  setPreViewer: React.Dispatch<
    React.SetStateAction<PreViewerMarker | undefined>
  >,
  count: number,
  sheetProvider: sheetProviderType,
  clusterIdList: string[],
  imageUrl?: string
) => {
  const markerElement = document.createElement('div');

  markerElement.className = 'relative z-30 w-[40px] h-[57px]';
  const markerPin = document.createElement('img');
  markerPin.src = MarkerPin;
  const markerImage = document.createElement('img');
  markerImage.className =
    'absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300';
  // markerImage.src = imageUrl;
  const markerCount = document.createElement('div');
  markerCount.className =
    'absolute w-7 h-7 rounded-full flex items-center justify-center text-sm z-50 -top-3 -right-4 text-white bg-[#F5535E]';
  markerCount.textContent = String(count);
  markerElement.appendChild(markerPin);
  markerElement.appendChild(markerImage);
  markerElement.appendChild(markerCount);

  markerElement.onclick = () => {
    sheetProvider.handleSheet('mid');
    setPreViewer({
      position: {
        lat: -1,
        lng: -1,
      },
      categoryId: -1,
      goodsId: -1,
      goodsRepImgUrl: '',
      goodsIdList: clusterIdList.map((id) => Number(id)),
    });
  };

  return markerElement;
};
