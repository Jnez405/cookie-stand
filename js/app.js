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
Location.prototype.renderSales = function() {
  const container = document.getElementById('sales-data');
  const ul = document.createElement('ul');
  ul.innerHTML = `<h2>${this.name}</h2>`;
  this.hourlySales.forEach((sales, i) => {
      const li = document.createElement('li');
      li.textContent = `${6 + i}am: ${sales} cookies`;
      ul.appendChild(li);
  });
  const totalLi = document.createElement('li');
  totalLi.textContent = `Total: ${this.totalSales} cookies`;
  ul.appendChild(totalLi);
  container.appendChild(ul);
};

// Create location objects
const seattle = new Location('Seattle', 23, 65, 6.3);
const tokyo = new Location('Tokyo', 3, 24, 1.2);
const dubai = new Location('Dubai', 11, 38, 3.7);
const paris = new Location('Paris', 20, 38, 2.3);
const lima = new Location('Lima', 2, 16, 4.6);

// Calculate and render sales data for each location
const locations = [seattle, tokyo, dubai, paris, lima];
locations.forEach(location => {
  location.calculateSales();
  location.renderSales();
});
