import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';


const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
 
 function onSearch(evt) {
    evt.preventDefault();
    const onSearchCountry = evt.target.value.trim();

    if (onSearchCountry === '') {
        resetEl();
        return;
    }

    fetchCountries(onSearchCountry)
    .then(data => {
        if (data.length > 10) {
        resetEl();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

       if (data.length > 1 || data.length < 10) {
          const countryListMarkup = data.map(country => MarkupCountryList(country));
          countryListEl.innerHTML = countryListMarkup.join("");
          countryCardEl.innerHTML = '';
      }

        if (data.length === 1) {
        const countryMarkup = data.map(country => MarkupCountry(country));
              countryCardEl.innerHTML = countryMarkup.join("");
                countryListEl.innerHTML = ''; 
      }
    })
        .catch(error => {
      console.log(error);
      resetEl();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });

  
 }

function resetEl() {
  countryListEl.innerHTML = '';
  countryCardEl.innerHTML = '';
};


function MarkupCountryList({ flags, name }) {
    return `<li class='list__item--set'>
     <img width="60px" height="40px" src="${flags.svg}">
</img>
    <h2>${name.official}</h2>
</li>`  
};

function MarkupCountry({ flags, name, capital, population, languages }) {
    return `<div class='list__item'>
        <h2><img src="${flags.svg}" alt="${name.official}" width='80'>
        ${name.official}</h2>
        <p class="item__text">
          <span>Capital: ${capital}</span>
        </p>
        <p class="item__text">
          <span>Population: ${population}</span>
        </p>
        <p class="item__text">
          <span>Languages: ${Object.values(languages)}</span>
        </p>
      </div>`
};