export default function extractQueryParams(url = window.location.href) {

    // Get the current URL from the browser's window.location
  // const url = window.location.href;

  const queryParams = {};

  // Check if the URL is undefined, null, or does not contain a '?'
  if (!url || !url.includes('?')) return queryParams;

  // Split the URL at the first '?' to isolate the query string
  const [baseUrl, queryString] = url.split('?');

  // Return an empty object if there's no query string after '?'
  if (!queryString) return queryParams;

  // Normalize the query string by replacing additional '?' with '&'
  const normalizedQuery = queryString.replace(/\?/g, '&');

  // Split the normalized query string into key-value pairs
  const pairs = normalizedQuery.split('&');

  // Iterate through each key-value pair
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) {
      // Decode and assign key-value pairs to queryParams
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });

  return queryParams;
}
