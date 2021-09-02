import axios, {AxiosResponse, Method} from 'axios';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {BookRaw, factoryRawToBook, isBookBase, isBookBaseArray} from '../types/Book';

// local utility type
type SetState<T> = Dispatch<SetStateAction<T>>

/*
 * Abstracts away both needs for api calls,
 * on rendering and on events / conditions
 *
 * useBookApi, hook
 * bookApi, normal function
 *
 */

/*
 * Useful for http data as a dependency in rendering
 *
 * @param method [Method], http method
 * @param path [string], relative path to baseUrl
 * @return, Response Data
*/
export function useBookApi<T>(method: Method, path: string): [T | undefined, SetState<T | undefined>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    bookApi(
      method,
      path,
      (data_: T) => setData(data_)
    )
  }, [method, path])

  return [data, setData];
}

/*
 * Useful for calls on events or in conditions
 *
 * @param method [Method], http method
 * @param path [string], relative path to baseUrl
 * @param data [function], callback, gets `response.data` as an argument
 * @param data [object], body data
*/
export function bookApi<T>(method: Method, path: string, callback: (data: T) => void, data = {}): void {
  const baseUrl = 'https://api3.angular-buch.com/secure'

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    headers: {Authorization: 'Bearer 1234567890'},
    data
  })
    .then((response: AxiosResponse<T>) => callback(response.data))
}

/*
* Axios Interceptor
* Factory BookRaw to Book
*/
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      if (isBookBaseArray(response.data)) {
        response.data = response.data.map((book) => factoryRawToBook(book as BookRaw))
      } else if (isBookBase(response.data)) {
        response.data = factoryRawToBook(response.data as BookRaw)
      }
    }
    return response;
  },
  error => Promise.reject(error)
);
