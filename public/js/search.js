const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

async function onSubmitHandler(event) {
    event.preventDefault();

    let queryUrl = '/api/ecoregions?search=';

    // getting information from the search bar
    // regex grabs any whitespace character
    const formattedInput = searchInput.value.replace(/\s/g, '-');
    queryUrl = queryUrl + formattedInput;

    const response = await fetch(queryUrl);

    if (response.ok) {
        console.log(response.json());
    }
};

searchForm.addEventListener('submit', onSubmitHandler);