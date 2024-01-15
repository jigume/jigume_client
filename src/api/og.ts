import { OpenGraph } from '@src/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { OpenGraphIO } from 'opengraph-io';

const options = {
  appId: import.meta.env.VITE_OG_KEY,
  service: 'site',
  useProxy: false,
  fullRender: false,
};

const ogClient = new OpenGraphIO(options);

const getOpenGraph = async (url: string): Promise<OpenGraph | undefined> => {
  if (url === '' || !url) return undefined;
  const response = await ogClient
    .getSiteInfo(url)
    .then((res: any) => res.openGraph);

  return response;
};

export default getOpenGraph;
