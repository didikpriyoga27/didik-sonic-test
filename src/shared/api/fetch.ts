import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';

export type APIPromise<T> = AxiosPromise<T> & {
  cancel?: () => any;
};

export type FetchConfig = AxiosRequestConfig & {
  isShowError?: boolean;
};

function fetch<T>(params: FetchConfig, headers = {}) {
  const instance = axios.create();
  // Create a new CancelToken source for this request
  const source = axios.CancelToken.source();

  const promise: APIPromise<T> = instance({
    timeout: 20000,
    ...params,
    headers: Object.assign({}, headers, params.headers),
    cancelToken: source.token,
  });

  // Cancel the request if React Query calls the `promise.cancel` method
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };

  return promise;
}

export default fetch;
