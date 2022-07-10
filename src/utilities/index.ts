export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=');

      if (key) {
        acc[key] = decodeURIComponent(value);
      }

      return acc;
    }, {} as Record<string, string>);

export const convertQueryStringToPositiveNumber = (
  queryString: string | string[] | undefined
): number | null => {
  if (!queryString) return null;

  const num = typeof queryString === 'string' ? Number(queryString) : Number(queryString[0]);

  if (isNaN(num) || num <= 0) return null;

  return num;
};
