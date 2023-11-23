import MarkerPin from '../../../asset/icon/markerPin.svg';

export const markerDom = `<div class='relative z-30'><div class='w-[40px]'><img src=${MarkerPin} /><div class="absolute left-[5px] top-[5px] z-50 h-[30px] w-[30px] rounded-full bg-gray-300" style="background-image: url('$IMG')" /></div></div>`;

export const currentPoint = `<div class="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-primaryBlue"><div class="absolute z-30 h-[16px] w-[16px] rounded-full bg-white" /></div><div class="absolute z-10 h-[30px] w-[30px] animate-ping rounded-full bg-primaryBlue opacity-30 " />`;

export const userPosition = document.createElement('div');
userPosition.className =
  'flex h-[32px] w-[32px] items-center justify-center rounded-full bg-primaryBlue';
const userPositionCircle = document.createElement('div');
userPositionCircle.className =
  'absolute z-30 h-[16px] w-[16px] rounded-full bg-white';
const userPositionAnimation = document.createElement('div');
userPositionAnimation.className =
  'absolute z-10 h-[30px] w-[30px] animate-ping rounded-full bg-primaryBlue opacity-30';
userPosition.appendChild(userPositionCircle);
userPosition.appendChild(userPositionAnimation);

export const markerElement = document.createElement('div');
markerElement.className = 'relative z-30 w-[40px] h-[57px]';
const markerPin = document.createElement('img');
markerPin.src = MarkerPin;
markerElement.appendChild(markerPin);

export const clusterStyles = {
  width: '2rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: '#F5535E',
  color: '#fff',
  zIndex: 2,
};
