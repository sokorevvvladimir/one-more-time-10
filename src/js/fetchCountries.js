const BASE_URL = 'https://restcountries.com/v2/name/';
const queryParams = {
    fullText: true,
    fields: 'name.official,capital,population,flags.svg,languages',
}

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}${name.trim()}?${queryParams}`)
        .then(response => {
            if (!response.ok) {
               throw new Error(response.status) 
            };
            return response.json()
        });
};