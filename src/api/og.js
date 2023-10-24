import { OpenGraphIO } from 'opengraph-io';

const options = {
  appId: import.meta.env.VITE_OG_KEY,
  service: 'site',
  useProxy: false,
  fullRender: false,
};

const ogClient = new OpenGraphIO(options);

/**
 *
 * @param {string} url
 * @returns {{
 *   description: string
 *   title: string
 *   image: {url: string, }
 *   type: string
 *   url: string
 * }}
 */
const getOpenGraph = async (url) => {
  if (url === '') return null;
  const response = await ogClient
    .getSiteInfo(url)
    .then((data) => data.openGraph)
    .catch((error) => {
      console.error(error);
    });
  return response;
};

export default getOpenGraph;
