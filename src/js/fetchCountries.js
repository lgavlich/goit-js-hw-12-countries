import { onError } from './main';
function fetchCountries(nameCountry) {
  return fetch(`https://restcountries.eu/rest/v2/name/${nameCountry}`)
    .then(response => {
      return response.json();
    })
    .catch(onerror);
}
export default { fetchCountries };