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
