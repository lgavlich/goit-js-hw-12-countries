//import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const debounce = require('lodash.debounce');
const refs = {
  input: document.getElementById('countryType'),
  countriesList: document.getElementById('js-country-container'),
};

refs.input.addEventListener('input',renderCountry);

function renderCountry(e) {
    const name = e.target.value;
    if (name) {
        fetch(`https://restcountries.eu/rest/v2/name/${name}`)
            .then((response) => {
                return response.json();
            })
            .then((countries) => {
                const countriesHtml = countries
                    .map((country) => `<h6>${country.name}<h6>`)
                    .join('');
                refs.countriesList.insertAdjacentHTML('afterbegin', countriesHtml);
            })
            .catch(console.error);
    }
}

