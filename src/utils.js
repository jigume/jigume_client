const getCurrentLocation = async (setPosition, setImplicit) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    setImplicit({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });
};

export default getCurrentLocation;
