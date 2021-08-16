import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import ApiCountries from "./fetchCountries.js";
import countryTmpl from '../templates/country.hbs';
import countriesTmpl from '../templates/countries.hbs';
    

const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('.input-control'),
  flagContainer: document.querySelector('.js-country-container'),
}

refs.input.addEventListener('input',debounce(onInputCountry, 500));

function onInputCountry(e) {
    cleanInput();
    let countryName = e.target.value;
    const countryNameTrim = countryName.trim();
    if (countryNameTrim) {
        ApiCountries.fetchCountries(countryNameTrim)
            .then(country => {
        if (country.length < 2) {
          cleanInput();
          renderCountry(country);
          refs.input.value = '';
        } else if (country.length > 1 && country.length <= 10) {
          cleanInput.input();
          renderCountries(country);
        } else if (country.length > 10) {
          cleanInput();
          manyMatchesFound();
        } else {
          onError();
        }
      })
    }
}

function renderCountry(country) {
    const countryMarkUp = countryTmpl(country);
    refs.flagContainer.insertAdjacentHTML('beforeend', countryMarkUp);
}

function renderCountries(countries) {
    const countriesMarkUp = countriesTmpl(countries);
    refs.flagContainer.insertAdjacentHTML('beforeend', countriesMarkUp);
}

function cleanInput() {
    refs.flagContainer.innerHTML = '';
}

function manyMatchesFound() {
    error({
        text: 'Too many matches found. Please, enter a more specific query!',
        delay: 2000,
    });
}

function onError() {
    error({
        text: 'Try Again!',
        delay: 2000,
    });
}

export default { onError };
            