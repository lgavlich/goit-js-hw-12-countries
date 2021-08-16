import { onError } from './main';
function fetchCountries(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
      return response.json();
    })
    .catch(onerror);
}
export default { fetchCountries };