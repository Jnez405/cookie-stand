// Helper function to generate a random number of customers
function getRandomCustomers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Constructor function for each location
function Location(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.hourlySales = [];
  this.totalSales = 0;
}

// Method to calculate hourly sales
Location.prototype.calculateSales = function() {
  for (let i = 6; i <= 19; i++) {
      const customers = getRandomCustomers(this.minCust, this.maxCust);
      const cookies = Math.round(customers * this.avgCookies);
      this.hourlySales.push(cookies);
      this.totalSales += cookies;
  }
};

// Method to render sales data to the page
Location.prototype.renderSales = function(tableBody) {
  const row = document.createElement('tr');
  const locationCell = document.createElement('td');
  locationCell.textContent = this.name;
  row.appendChild(locationCell);

  this.hourlySales.forEach(sales => {
    const salesCell = document.createElement('td');
    salesCell.textContent = sales;
    row.appendChild(salesCell);
  });

  const totalCell = document.createElement('td');
  totalCell.textContent = this.totalSales;
  row.appendChild(totalCell);

  tableBody.appendChild(row);
};

// Create location objects
const seattle = new Location('Seattle', 23, 65, 6.3);
const tokyo = new Location('Tokyo', 3, 24, 1.2);
const dubai = new Location('Dubai', 11, 38, 3.7);
const paris = new Location('Paris', 20, 38, 2.3);
const lima = new Location('Lima', 2, 16, 4.6);

// Calculate and render sales data for each location
const locations = [seattle, tokyo, dubai, paris, lima];

// Render header row
const table = document.createElement('table');
table.classList.add('sales-table'); // Add a class to the table
const tableHead = document.createElement('thead');
const headerRow = document.createElement('tr');
headerRow.innerHTML = '<th>Location</th>';
for (let i = 6; i <= 19; i++) {
  const cell = document.createElement('th');
  cell.textContent = `${i}:00am`;
  headerRow.appendChild(cell);
}
headerRow.innerHTML += '<th>Daily Location Total</th>';
tableHead.appendChild(headerRow);
table.appendChild(tableHead);

// Render sales data for each location
const tableBody = document.createElement('tbody');
locations.forEach(location => {
  location.calculateSales();
  location.renderSales(tableBody);
});
table.appendChild(tableBody);

// Render footer row
const tableFoot = document.createElement('tfoot');
const footerRow = document.createElement('tr');
footerRow.innerHTML = '<th>Totals</th>';
const totalsArray = new Array(14).fill(0); // 14 columns: 6am to 7pm
locations.forEach(location => {
  location.hourlySales.forEach((sales, i) => {
    totalsArray[i] += sales;
  });
});
totalsArray.forEach(total => {
  const cell = document.createElement('td');
  cell.textContent = total;
  footerRow.appendChild(cell);
});
const grandTotal = totalsArray.reduce((acc, cur) => acc + cur, 0);
footerRow.innerHTML += `<td>${grandTotal}</td>`;
tableFoot.appendChild(footerRow);
table.appendChild(tableFoot);

// Append table to the DOM
const salesDataContainer = document.getElementById('sales-data');
salesDataContainer.appendChild(table);
