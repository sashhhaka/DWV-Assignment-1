// Table sorting
let activeSorts = [];

// Render films table after filtering and sorting
const tableBody = document.querySelector("#films-table tbody");
function renderTable(data) {
  filteredData = [...data]; // Store filtered data for stats

  if(activeSorts.length > 0) {
    filteredData.sort((a, b) => {
      for (let sort of activeSorts) {
        let { column, order } = sort;
        let aVal = a[column], bVal = b[column];

        if(column === "release_year") {
          aVal = parseInt(aVal, 10);
          bVal = parseInt(bVal, 10);
        } else if(column === "box_office_revenue") {
          aVal = parseRevenue(aVal);
          bVal = parseRevenue(bVal);
        } else {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if(aVal < bVal) return -1 * order;
        if(aVal > bVal) return 1 * order;
      }
      return 0;
    });
  }

  tableBody.innerHTML = filteredData.map(film => `
    <tr>
      <td class="bold">${film.title}</td>
      <td>${film.release_year || "N/A"}</td>
      <td>${film.director}</td>
      <td>${formatRevenue(film.box_office_revenue)}</td>
      <td>${film.country}</td>
    </tr>
  `).join('');

  // Update stats after rendering
  updateStats(filteredData);
}

// Multi-column sorting functions
function updateSort(column) {
  let existing = activeSorts.find(s => s.column === column);

  if(!existing) {
    activeSorts.push({ column, order: 1 });
  } else if(existing.order === 1) {
    existing.order = -1;
  } else {
    activeSorts = activeSorts.filter(s => s.column !== column);
  }

  updateSortIndicators();
  applyFilters();
}

function updateSortIndicators() {
  document.querySelectorAll("thead th").forEach(th => {
    const column = th.getAttribute("data-sort");
    const sortIndicator = th.querySelector(".sort-indicator");
    const sortObj = activeSorts.find(s => s.column === column);

    sortIndicator.textContent = sortObj
      ? (sortObj.order === 1 ? "▲" : "▼")
      : "";
  });
}

document.querySelectorAll("thead th").forEach(th => {
  th.addEventListener("click", () => updateSort(th.getAttribute("data-sort")));
});