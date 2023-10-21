import axios from 'axios';

/**
 *
 * @param {* function()} setPosition
 */
export const getCurrentLocation = async (setPosition) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
};

/**
 *
 * @param {object} position
 * @param {number} position.lat
 * @param {number} position.lng
 * @returns {[{lat:number; lng:number}]} marker
 */
export const tempRandMarker = (position) => {
  const radius = 500;

  // 10개의 좌표를 반환
  return [...Array(10)].map((_, idx) => {
    let x = Math.random() / radius;
    x *= Math.round(Math.random()) ? -1 : 1;
    let y = Math.random() / radius;
    y *= Math.round(Math.random()) ? -1 : 1;

    return {
      ...{
        lat: position.lat + y,
        lng: position.lng + x,
        imageUrl: 'https://via.placeholder.com/64',
      },
      name: idx,
    };
  });
};

/**
 *
 * @param {string} url OG data를 가져올 홈페이지 주소
 * @return {{
 * imageUrl: string, title: string
 * }} return
 */
export const getOgData = async (url) => {
  const response = await axios.get(url, {
    withCredentials: true,
    crossDomain: true,
    credentials: 'include',
  });
  const html = await response.text();

  const ogImageTag = document.querySelector("meta[property='og:image']");
  const ogTitleTag = document.querySelector("meta[property='og:title']");

  // `og:image` 태그의 `src` 속성을 사용하여 이미지 URL을 가져옵니다.
  const ogImageUrl = ogImageTag.getAttribute('content');

  // `og:title` 태그의 `content` 속성을 사용하여 타이틀을 가져옵니다.
  const ogTitle = ogTitleTag.getAttribute('content');

  console.log(ogImageUrl, ogTitle);
  return {
    imageUrl: ogImageUrl,
    title: ogTitle,
  };
};
