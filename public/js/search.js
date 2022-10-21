const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');

// on form submit, make query to database
// i'm thinking we'll generate a regex, and on the backend it'll try to match names?

// first, let's focus on making sure the render function actually works
// which... im not totally sure how to do this either

// possibilities:
// - i wonder what happens if we send a fetch request to the route that renders this in the first place? we could alter that function to look for a regex and make the search
// - could also declare a new route with a query parameter, which might be nice because then the search could be returned to

// ok option one doesn't work because a get request can't include a body
// i figured something like that would happen as i was writing it
// so i'm gonna declare a new route on the backend that can take the search term as a query parameter

function onSubmitHandler(event) {
    event.preventDefault();

    let queryUrl = '/ecoregions?search=';

    // getting information from the search bar
    // regex grabs any whitespace character
    const formattedInput = searchInput.value.replace(/\s/g, '-');
    queryUrl = queryUrl + formattedInput;

    fetch(queryUrl);
};

searchForm.addEventListener('submit', onSubmitHandler);