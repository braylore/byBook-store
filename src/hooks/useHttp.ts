/* eslint-disable no-useless-catch */
export const useHttp = () => {
  const request = async (
    url: string,
    method = 'GET',
    body: null | string = null,
    headers = { 'Content-Type': 'application/json' }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Произошла ошибка по адресу ${url}, статус: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};
