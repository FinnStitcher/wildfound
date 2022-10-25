const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

const searchResultsDiv = document.getElementById('search-results');

async function onSubmitHandler(event) {
    event.preventDefault();

    let queryUrl = '/api/ecoregions?search=';

    // getting information from the search bar
    // regex grabs any whitespace character
    const formattedInput = searchInput.value.replace(/\s/g, '-');
    queryUrl = queryUrl + formattedInput;

    const response = await fetch(queryUrl);

    if (response.ok) {
        const responseData = await response.json();

        responseData.forEach(element => {
            // create list item
            const listItem = document.createElement('div');
            listItem.classList = 'basis-1/2 py-1 px-2 hover:bg-green-200/50';

            // create elements inside listItem
            const ecoNameP = document.createElement('p');
            ecoNameP.classList = 'font-semibold mb-0 hover:text-lime-600';
            
            const ecoNameA = document.createElement('a');
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
    }
};

searchForm.addEventListener('submit', onSubmitHandler);