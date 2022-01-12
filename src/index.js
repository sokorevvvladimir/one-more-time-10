import './css/styles.css';
import fetchCountries from './js/fetchCountries'
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css'

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

const clearList = () => {
    refs.list.innerHTML = "";
    refs.countryInfo.innerHTML = ""
};

const oneCountry = (countries) => {
    clearList();

    
    const markup = countries.map(country => {
        
        const languages = country.languages[0] 
        
       return `
    <div>
      <img src="${country.flags.svg}"/>
      <p>${country.name}</p>
      <p>Capital:${country.capital}</p>
      <p>Population:${country.population}</p>
      <p>Languages:${languages.name}</p>
    </div>
    `}).join("");

    refs.countryInfo.innerHTML = markup;
    

};

const moreThanTen = () => {
    clearList();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

const fromTwoToTen = countries => {
    clearList();
    const markup = countries.map(country => 
    `
    <div>
      <img src="${country.flags.svg}"/>
      <p>${country.name}</p>
    </div>
    `
    )
    refs.list.innerHTML = markup;
}

const renderCountries = countries => {
    if (countries.length >= 10) {
        moreThanTen()
        return
    };
    if (countries.length < 10 && countries.length >= 2) {
        fromTwoToTen(countries)
        return
    };
oneCountry(countries)
}

const invalidName = error => {
    clearList();
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

const onInputHandler = e => {
    if (e.target.value.trim() !== "") {
         console.log(fetchCountries(e.target.value))
        fetchCountries(e.target.value).then(renderCountries).catch(invalidName)

    };
}
refs.input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

