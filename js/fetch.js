const API_KEY = "9cTjAjlRB53wyhAFk5VzXcBu5GiPU6fK";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

export default async function fetchEvents(page, keyword) {
  const urlParams = new URLSearchParams({
    page: page,
    keyword: keyword,
    apikey: API_KEY,
    size: 50,
  });
  try {
    const result = await fetch(`${BASE_URL}events/?${urlParams}`);
    return result.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
