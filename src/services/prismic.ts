import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(req?: unknown): DefaultClient {
  const client = Prismic.client(
    process.env.PRISMIC_URL,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );
  return client;
}
