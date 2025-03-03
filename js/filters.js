// Get input elements and clear buttons
const filterTitle = document.getElementById("filter-title");
const filterDirector = document.getElementById("filter-director");
const filterCountry = document.getElementById("filter-country");
const clearTitle = document.getElementById("clear-title");
const clearDirector = document.getElementById("clear-director");
const clearCountry = document.getElementById("clear-country");

// Add event listeners for clear buttons
clearTitle.addEventListener("click", () => {
  filterTitle.value = "";
  applyFilters();
});

clearDirector.addEventListener("click", () => {
  filterDirector.value = "";
  applyFilters();
});

clearCountry.addEventListener("click", () => {
  filterCountry.value = "";
  applyFilters();
});

// Apply all filters based on text and slider values
function applyFilters() {
  const titleFilter = filterTitle.value.toLowerCase();
  const directorFilter = filterDirector.value.trim().toLowerCase();
  const countryFilter = filterCountry.value.trim().toLowerCase();

  let filtered = filmsData.filter(film => {
    // Title filter
    if(!film.title.toLowerCase().includes(titleFilter)) return false;

    // Year filter
    if(parseInt(film.release_year, 10) < yearMin ||
       parseInt(film.release_year, 10) > yearMax) return false;

    // Revenue filter
    const filmRevenue = parseRevenue(film.box_office_revenue);
    if(filmRevenue < revenueMin || filmRevenue > revenueMax) return false;

    // Director filter
    if(directorFilter) {
      const directors = film.director.split(',').map(d => d.trim().toLowerCase());
      if(!directors.some(d => d.includes(directorFilter))) return false;
    }

    // Country filter
    if(countryFilter) {
      const countries = film.country.split(',').map(c => c.trim().toLowerCase());
      if(!countries.some(c => c.includes(countryFilter))) return false;
    }

    return true;
  });

  renderTable(filtered);
}

// Add event listeners for text filters
[filterTitle, filterDirector, filterCountry].forEach(el => {
  el.addEventListener("input", applyFilters);
});