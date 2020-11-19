import { ApolloClient } from '@apollo/client';

import { cache } from './cache';

const GITHUB_TOKEN = '0b53f4beb5585531e9752e7f51c4e61ca265bc69';

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache,
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});
