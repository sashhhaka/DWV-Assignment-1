// Sample data if fetch fails
const sampleData = [
  {
    "title": "Avatar",
    "release_year": "2009",
    "director": "James Cameron",
    "box_office_revenue": "$2,847,246,203",
    "country": "United States"
  },
  {
    "title": "Avengers: Endgame",
    "release_year": "2019",
    "director": "Anthony Russo, Joe Russo",
    "box_office_revenue": "$2,797,501,328",
    "country": "United States"
  },
  {
    "title": "Titanic",
    "release_year": "1997",
    "director": "James Cameron",
    "box_office_revenue": "$2,187,463,944",
    "country": "United States"
  },
  {
    "title": "Star Wars: The Force Awakens",
    "release_year": "2015",
    "director": "J.J. Abrams",
    "box_office_revenue": "$2,068,223,624",
    "country": "United States"
  },
  {
    "title": "Avengers: Infinity War",
    "release_year": "2018",
    "director": "Anthony Russo, Joe Russo",
    "box_office_revenue": "$2,048,359,754",
    "country": "United States"
  }
];

let filmsData = [];
let filteredData = [];

// Populate director and country dropdowns from film data
const directorDatalist = document.getElementById("directors");
const countryDatalist = document.getElementById("countries");

function populateDatalists(data) {
  const directorSet = new Set();
  const countrySet = new Set();

  data.forEach(film => {
    film.director.split(',').forEach(d => directorSet.add(d.trim()));
    film.country.split(',').forEach(c => countrySet.add(c.trim()));
  });

  directorDatalist.innerHTML = Array.from(directorSet)
    .sort()
    .map(d => `<option value="${d}">`)
    .join('');

  countryDatalist.innerHTML = Array.from(countrySet)
    .sort()
    .map(c => `<option value="${c}">`)
    .join('');
}

// Format revenue for table display (full number with commas)
function formatRevenue(revenue) {
  const num = parseInt(revenue.replace(/\D/g, ''), 10);
  return "$" + num.toLocaleString();
}

// Parse revenue string to number
function parseRevenue(revenue) {
  return parseInt(revenue.replace(/\D/g, ''), 10);
}

// Format revenue for billions display
function formatRevenueBillions(revenue) {
  return "$" + (revenue / 1e9).toFixed(1) + "B";
}

// Update statistics summary
function updateStats(data) {
  const totalFilms = document.getElementById('total-films');
  const avgRevenue = document.getElementById('avg-revenue');
  const highestRevenue = document.getElementById('highest-revenue');
  const lowestRevenue = document.getElementById('lowest-revenue');
  const mostRecent = document.getElementById('most-recent');

  totalFilms.textContent = data.length;

  if (data.length > 0) {
    // Calculate average revenue
    const total = data.reduce((sum, film) => sum + parseRevenue(film.box_office_revenue), 0);
    const avg = total / data.length;
    avgRevenue.textContent = "$" + (avg / 1e9).toFixed(2) + "B";

    // Find highest revenue
    const highest = data.reduce((max, film) => {
      const rev = parseRevenue(film.box_office_revenue);
      return rev > max ? rev : max;
    }, 0);
    highestRevenue.textContent = "$" + (highest / 1e9).toFixed(2) + "B";

    // Find lowest revenue
    const lowest = data.reduce((min, film) => {
      const rev = parseRevenue(film.box_office_revenue);
      return (rev < min || min === 0) ? rev : min;
    }, 0);
    lowestRevenue.textContent = "$" + (lowest / 1e9).toFixed(2) + "B";

    // Find most recent film
    const latest = data.reduce((latest, film) => {
      return parseInt(film.release_year) > parseInt(latest) ? film.release_year : latest;
    }, "0");
    mostRecent.textContent = latest;
  } else {
    avgRevenue.textContent = "$0";
    highestRevenue.textContent = "$0";
    lowestRevenue.textContent = "$0";
    mostRecent.textContent = "N/A";
  }
}