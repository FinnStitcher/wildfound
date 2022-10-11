async function getRealms() {
    const response = await fetch('/api/realms');

    if (response.ok) {
        const data = response.json();
    }
};

async function getOneRealm(realmId) {
    const response = await fetch('/api/realms/' + realmId);
    // returns array of biomes w/ ecoregions

    if (response.ok) {
        const biomes = await response.json();

        const mainEl = document.getElementById('search-results');

        biomes.forEach(element => {
            const header2El = document.createElement('h2');
            header2El.textContent = element.biome_name;
            mainEl.appendChild(header2El);

            element.ecoregions.forEach(element => {
                const paragraphEl = document.createElement('p');
                paragraphEl.textContent = element.ecoregion_name;
                mainEl.appendChild(paragraphEl);
            })
        })
    }
};

getOneRealm('na');