import MarkerPin from '../../asset/icon/markerPin.svg';

export const setMarkerDom = (item, sheetProvider, setPreViewer) => {
  const markerElement = document.createElement('div');
  markerElement.className = 'relative z-10 w-[40px] h-[57px]';
  const markerPin = document.createElement('img');
  markerPin.src = MarkerPin;
  const markerImage = document.createElement('div');
  markerImage.className =
    'absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300';
  markerImage.style.backgroundImage = `url(${item.imageUrl})`;
  markerElement.appendChild(markerPin);
  markerElement.appendChild(markerImage);
  markerElement.onclick = () => {
    sheetProvider.handleSheet('mid');
    setPreViewer(item);
  };

  return markerElement;
};

export const setClusterDom = (imageUrl, count) => {
  const markerElement = document.createElement('div');
  markerElement.className = 'relative z-30 w-[40px] h-[57px]';
  const markerPin = document.createElement('img');
  markerPin.src = MarkerPin;
  const markerImage = document.createElement('div');
  markerImage.className =
    'absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300';
  markerImage.style.backgroundImage = `url(${imageUrl})`;
  const markerCount = document.createElement('div');
  markerCount.className =
    'absolute w-7 h-7 rounded-full flex items-center justify-center text-sm z-50 -top-3 -right-4 text-white bg-[#F5535E]';
  markerCount.textContent = count;
  markerElement.appendChild(markerPin);
  markerElement.appendChild(markerImage);
  markerElement.appendChild(markerCount);

  return markerElement;
};
