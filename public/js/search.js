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
        }
    }
};

function displayErrorText(text) {
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
        const ecoNameP = document.createElement('p');
        ecoNameP.classList = 'font-semibold mb-0';
        
        const ecoNameA = document.createElement('a');
        ecoNameA.classList = "hover:text-lime-600";
        ecoNameA.setAttribute('href', `/ecoregions/${element.id}`);
        ecoNameA.textContent = element.ecoregion_name;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = `${element.realm.realm_name} - ${element.biome.biome_name}`;

        // append contents of listItem
        ecoNameP.appendChild(ecoNameA);

        listItem.appendChild(ecoNameP);
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
        const orderNameP = document.createElement('p');
        orderNameP.classList = 'font-semibold mb-0';

        const orderNameA = document.createElement('a');
        orderNameA.classList = 'hover:text-lime-600';
        orderNameA.setAttribute('href', `/orders/${element.id}`);
        orderNameA.textContent = element.order_name;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = element.class.class_name;

        // append
        orderNameP.appendChild(orderNameA);

        listItem.appendChild(orderNameP);
        listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

function formatFamilySearch(familiesArray) {
    familiesArray.forEach(element => {
        const listItem = document.createElement('div');
        listItem.classList = 'basis-1/3 search-result';

        // create elements inside listItem
        const familyNameP = document.createElement('p');
        familyNameP.classList = 'font-semibold mb-0';

        const familyNameA = document.createElement('a');
        familyNameA.classList = 'hover:text-lime-600';
        familyNameA.setAttribute('href', `/families/${element.id}`);
        familyNameA.textContent = element.family_name;

        const extraInfo = document.createElement('p');
        extraInfo.classList = 'font-thin text-sm';
        extraInfo.textContent = element.order.order_name;

        // append
        familyNameP.appendChild(familyNameA);

        listItem.appendChild(familyNameP);
        listItem.appendChild(extraInfo);

        searchResultsDiv.appendChild(listItem);
    })
};

searchForm.addEventListener('submit', onSubmitHandler);