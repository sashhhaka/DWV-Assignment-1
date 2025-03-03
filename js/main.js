// Initialize the Year slider
initCustomSlider("yearRangeSlider", 1990, 2025, (minVal, maxVal) => {
  yearMin = minVal;
  yearMax = maxVal;
  applyFilters();
}, false);

// Initialize the Revenue slider
initCustomSlider("revenueRangeSlider", 0, 3000000000, (minVal, maxVal) => {
  revenueMin = minVal;
  revenueMax = maxVal;
  applyFilters();
}, true);

// Load films data and initialize table and dropdowns
fetch("temp/films.json")
  .then(response => response.json())
  .then(data => {
    filmsData = data;
    populateDatalists(filmsData);
    renderTable(filmsData);
  })
  .catch(error => {
    console.error("Error loading films data:", error);
    // Use sample data as fallback
    filmsData = sampleData;
    populateDatalists(filmsData);
    renderTable(filmsData);
  });