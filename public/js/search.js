const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

const searchResultsDiv = document.getElementById('search-results');

// identify what page we're on, and thus, where we should be making the api call
const urlArray = document.location.toString().split('/');
const endpoint = urlArray[urlArray.length - 1];

async function onSubmitHandler(event) {
    event.preventDefault();
    
    // first make sure there's actually a search term
    if (searchInput.value === '') {
        displayErrorText('Please enter something in the search bar and try again.');
        return;
    }

    // now make sure it's valid as a regex
    if (!!searchInput.value.match(/\W/)) {
        displayErrorText('This input is invalid.');
        return;
    }

    let queryUrl = `/api/${endpoint}?search=`;

    // getting information from the search bar
    // regex grabs any whitespace character
    const formattedInput = searchInput.value.replace(/\s/g, '-');
    queryUrl = queryUrl + formattedInput;

    const response = await fetch(queryUrl);

    if (response.ok) {
        const responseData = await response.json();

        // empty div
        searchResultsDiv.innerHTML = '';

        // check if anything was returned
        if (responseData.length === 0) {
            displayErrorText('No results. Try another search term.');
            return;
        }
        
        if (endpoint === 'ecoregions') {
            formatEcoregionSearch(responseData);
        } else if (endpoint === 'orders') {
            formatOrderSearch(responseData);
        } else if (endpoint === 'families') {
            formatFamilySearch(responseData);
        } else if (endpoint === 'genera') {
            formatGenusSearch(responseData);
        } else if (endpoint === 'species') {
            formatSpeciesSearch(responseData);
        }
    }
};

function displayErrorText(text) {
    searchResultsDiv.innerHTML = '';
    
    const errorText = document.createElement('p');
    errorText.textContent = text;

    searchResultsDiv.appendChild(errorText);
};

function formatEcoregionSearch(ecosArray) {
    ecosArray.forEach(element => {
        // create list item
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/2 search-result';

        // create elements inside listItem
        const ecoName = document.createElement('p');
        ecoName.classList = 'font-semibold mb-0';
        ecoName.innerHTML = `<a href="/ecoregions/${element.id}" class="hover:text-lime-600">${element.ecoregion_name}</a>`;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = `${element.realm.realm_name} - ${element.biome.biome_name}`;

        // append contents of listItem
        listItem.appendChild(ecoName);
        listItem.appendChild(extraInfo);

        // append to searchResultsDiv
        searchResultsDiv.appendChild(listItem);
    });
};

function formatOrderSearch(ordersArray) {
    ordersArray.forEach(element => {
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/3 search-result';

        // create elements inside listItem
        const orderName = document.createElement('p');
        orderName.classList = 'font-semibold mb-0';
        orderName.innerHTML = `<a href="/orders/${element.id}" class="hover:text-lime-600">${element.order_name}</a>`;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = element.class.class_name;

        // append
        listItem.appendChild(orderName);
        listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

function formatFamilySearch(familiesArray) {
    familiesArray.forEach(element => {
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/3 search-result';

        // create elements inside listItem
        const familyName = document.createElement('p');
        familyName.classList = 'font-semibold mb-0';
        familyName.innerHTML = `<a href="/families/${element.id}" class="hover:text-lime-600">${element.family_name}</a>`;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = element.order.order_name;

        // append
        listItem.appendChild(familyName);
        listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

function formatGenusSearch(genusArray) {
    genusArray.forEach(element => {
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/3 search-result';

        const genusName = document.createElement('p');
        genusName.classList = 'font-semibold mb-0';
        genusName.innerHTML = `<a href="/genera/${element.id}" class="hover:text-lime-600">${element.genus_name}</a>`;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = element.family.family_name;

        // append
        listItem.appendChild(genusName);
        listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

function formatSpeciesSearch(speciesArray) {
    speciesArray.forEach(element => {
        // figure out what object structure we're working with, based on whether the common_name property is a string or object
        const commonNameFirst = typeof element.common_name === 'string';

        // creating variables
        let common_name, species_name, genus_name, species_id = null;

        // set values
        if (commonNameFirst) {
            common_name = element.common_name;
            species_name = element.species.species_name;
            genus_name = element.species.genus.genus_name;
            species_id = element.species.id;
        } else {
            // if common_name exists, put it here
            common_name = element.common_name?.common_name;
            species_name = element.species_name;
            genus_name = element.genus.genus_name;
            species_id = element.id;
        };

        // actually make the elements
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/3 search-result';

        const scientificName = document.createElement('p');
        scientificName.classList = 'font-semibold mb-0';
        scientificName.innerHTML = `<a href="/species/${species_id}" class="italic hover:text-lime-600">${genus_name} ${species_name}</a>`;
        listItem.appendChild(scientificName);

        if (common_name) {
            const commonName = document.createElement('p');
            commonName.classList = 'mb-0';
            commonName.textContent = common_name;
            listItem.appendChild(commonName);
        }

        // const extraInfo = document.createElement('p');
        // extraInfo.classList = 'font-thin text-sm';
        // extraInfo.textContent = element.family.family_name;
        //listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

searchForm.addEventListener('submit', onSubmitHandler);