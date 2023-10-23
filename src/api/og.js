import { OpenGraphIO } from 'opengraph-io';

const options = {
  appId: import.meta.env.VITE_OG_KEY,
  service: 'site',
  cacheOk: true,
  useProxy: false,
  maxCacheAge: 432000000,
  fullRender: false,
};

const ogClient = new OpenGraphIO(options);

const getOpenGraph = async (url) => {
  const response = await ogClient
    .getSiteInfo(url)
    .then((data) => {
      // Handle the Open Graph data
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
  return response;
};

export default getOpenGraph;
