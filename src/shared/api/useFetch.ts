import {AxiosResponse} from 'axios';
import {useCallback} from 'react';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

import fetch, {FetchConfig} from './fetch';

type FetchFn<A> = (args?: A) => Promise<FetchConfig> | FetchConfig;

const waitForInteraction = () => {
  return new Promise(resolve => {
    requestAnimationFrame(() => resolve(true));
  });
};

export default function useFetch<A, R>(fetchFn: FetchFn<A>) {
  const handleFetch = useCallback(
    async (args?: A) => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      function polyfillFetchConfig(baseConfig: FetchConfig): FetchConfig {
        return {
          baseURL: Config.BASE_URL,
          isShowError: baseConfig.method === 'GET' ? false : true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          ...baseConfig,
        };
      }

      const _fetchConfig = await fetchFn(args);
      const fetchConfig = polyfillFetchConfig(_fetchConfig);
      await waitForInteraction();
      return fetch<R>(fetchConfig).catch<AxiosResponse<R>>(err => {
        if (err.response) {
          if (fetchConfig.isShowError) {
            Alert.alert('Error', JSON.stringify(err.response));
          }
          throw err;
        }
        throw err;
      });
    },
    [fetchFn],
  );
  return handleFetch;
}
