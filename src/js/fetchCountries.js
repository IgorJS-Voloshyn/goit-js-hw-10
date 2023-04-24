const BASE_URL = 'https://restcountries.com/v3.1';


export function fetchCountries(name) {
  const URL = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}


