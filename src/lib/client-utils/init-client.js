import { initClient, defaultExchanges } from '@urql/svelte';
import { devtoolsExchange } from '@urql/devtools';
import { getToken } from '$lib/client-utils/get-token.js';

export function initializeClient() {
  initClient({
    url: 'http://localhost:3000/graphql',
    fetchOptions: () => {
      const token = getToken()
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
    exchanges: [devtoolsExchange, ...defaultExchanges],
  });
}
