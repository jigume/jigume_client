export const getCurrentLocation = async (setPosition) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
};
