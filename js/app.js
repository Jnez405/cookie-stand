'use strict';

// **** Global Variables ****

const storesArray = [];
const storeSection = document.getElementById('sales');
const detailsSection = document.getElementById('details');


// **** Hours Array ****
const Hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// **** Grabbing form for event submission ****

let myForm = document.getElementById('cookieStandForm');

// **** Helper Functions ***

// **** Form submission event listner and handler

function handleSubmit(event) {
  event.preventDefault();
  // *** TODO grab values from form
  let locationName = event.target.locationName.value;
  let minCustomers = parseInt(event.target.minCustomers.value);
  let maxCustomers = parseInt(event.target.maxCustomers.value);
  let avgCookiesPerCustomer = parseFloat(event.target.avgCookiesPerCustomer.value);

  let newStore = new Stores(locationName, minCustomers, maxCustomers, avgCookiesPerCustomer, []);


//   // **** TODO create new store with those values

  storesArray.push(newStore);
  newStore.simulateHourlySales();
  newStore.renderTableRow();
  newStore.renderTableFooter();
  myForm.reset();
}
if(myForm){
  myForm.addEventListener('submit', handleSubmit);
}
// **** Constructor Function ****

function Stores(name, minCustomers, maxCustomers, avgCookiesPerCustomer, salesData, hours, address, contactInfo) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.salesData = salesData;
  this.hours = Hours;
  this.address = address;
  this.contactInfo = contactInfo;
};

// **** Prototype Methods ****

Stores.prototype.generateRandomCustomers = function () {
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
};

Stores.prototype.simulateHourlySales = function () {
  for (let hour = 0; hour < this.hours.length; hour++) {
    const customers = this.generateRandomCustomers();
    const cookiesSold = Math.round(customers * this.avgCookiesPerCustomer);
    this.salesData.push(`${this.hours[hour]}: ${cookiesSold} cookies`);
  }
};

Stores.prototype.calculateTotalCookies = function () {
  return this.salesData.reduce((acc, sales) => {
    const cookies = parseInt(sales.split(': ')[1]);
    return acc + cookies;
  }, 0);
};

Stores.prototype.render = function () {
  this.renderTableHeader();
  this.renderTableRow();
  this.renderTableFooter();
  this.simulateHourlySales();
};

Stores.prototype.renderTableHeader = function () {
  let headerRow = document.createElement('tr');
  storeSection.appendChild(headerRow);

  let headerCell = document.createElement('th');
  headerRow.appendChild(headerCell);

  for (let i = 0; i < this.hours.length; i++) {
    let headerCell = document.createElement('th');
    headerCell.textContent = this.hours[i];
    headerRow.appendChild(headerCell);
  }

  let totalHeaderCell = document.createElement('th');
  totalHeaderCell.textContent = 'Daily Location Total';
  headerRow.appendChild(totalHeaderCell);
};

Stores.prototype.renderTableRow = function () {
  let row = document.createElement('tr');
  storeSection.appendChild(row);

  let nameCell = document.createElement('td');
  nameCell.textContent = this.name;
  row.appendChild(nameCell);

  for (let i = 0; i < this.hours.length; i++) {
    let dataCell = document.createElement('td');
    dataCell.textContent = this.getSalesDataForHour(this.hours[i]);
    row.appendChild(dataCell);
  }

  let totalCell = document.createElement('td');
  totalCell.textContent = this.calculateTotalCookies();
  row.appendChild(totalCell);
};

Stores.prototype.renderTableFooter = function () {
  let existingTotalRows = document.querySelectorAll('#sales tr.total-row');
  for (let row of existingTotalRows) {
    row.parentNode.removeChild(row);
  }
  // Add the new "Total" row
  let footerRow = document.createElement('tr');
  footerRow.className = 'total-row';
  storeSection.appendChild(footerRow);
  
  let footerCell = document.createElement('td');
  footerCell.textContent = 'Total';
  footerRow.appendChild(footerCell);
  for (let hour of this.hours) {
    let footerCell = document.createElement('td');
    footerCell.textContent = this.calculateHourlyTotal(hour);
    footerRow.appendChild(footerCell);
  }
  let grandTotalCell = document.createElement('td');
  grandTotalCell.textContent = this.calculateGrandTotal();
  footerRow.appendChild(grandTotalCell);
};

Stores.prototype.getSalesDataForHour = function (hour) {
  for (let salesEntry of this.salesData) {
    if (salesEntry.startsWith(hour)) {
      return salesEntry.split(': ')[1].trim();
    }
  }
  return '';
};

Stores.prototype.calculateHourlyTotal = function (hour) {
  let total = 0;
  for (let store of storesArray) {
    total += store.getSalesDataForHour(hour) !== '' ? parseInt(store.getSalesDataForHour(hour)) : 0;
  }
  return total;
};

Stores.prototype.calculateGrandTotal = function () {
  let grandTotal = 0;
  for (let store of storesArray) {
    grandTotal += store.calculateTotalCookies();
  }
  return grandTotal;
};

Stores.prototype.renderDetails = function () {

  let storeContainer = document.createElement('div');
  detailsSection.appendChild(storeContainer);

  let heading = document.createElement('h2');
  heading.textContent = this.name;
  storeContainer.appendChild(heading);

  let addressPara = document.createElement('p');
  addressPara.textContent = `Address: ${this.address}`;
  storeContainer.appendChild(addressPara);

  let hoursPara = document.createElement('p');
  hoursPara.textContent = `Hours Open: ${this.hours[0]} to ${this.hours[this.hours.length - 1]}`;
  storeContainer.appendChild(hoursPara);

  let contactPara = document.createElement('p');
  contactPara.textContent = `Contact Information: ${this.contactInfo}`;
  storeContainer.appendChild(contactPara);

};

// **** Executable (executes on page load) Code ****

document.addEventListener('DOMContentLoaded', function () {

  let seattle = new Stores('Seattle', 23, 65, 6.3, [], Hours, '123 Main St, Seattle, WA', 'Phone: (555) 123-4567');
  let tokyo = new Stores('Tokyo', 3, 24, 1.2, [], Hours, '456 Tokyo Ave, Tokyo, Japan', 'Phone: +81 90-1234-5678');
  let dubai = new Stores('Dubai', 11, 38, 3.7, [], Hours, '789 Desert Rd, Dubai, UAE', 'Phone: +971 50 123 4567');
  let paris = new Stores('Paris', 20, 38, 2.3, [], Hours, '987 French St, Paris, France', 'Phone: +33 1 23 45 67 89');
  let lima = new Stores('Lima', 2, 16, 4.6, [], Hours, '654 Coastal Blvd, Lima, Peru', 'Phone: +51 1 2345678');

  storesArray.push(seattle, tokyo, dubai, paris, lima);

  for (let store of storesArray) {
    store.simulateHourlySales();
  }  
  
  if (storeSection){
    let table = document.createElement('table');
    storeSection.appendChild(table);

    seattle.renderTableHeader(table);

    for (let store of storesArray) {
      store.renderTableRow(table);
    }

    seattle.renderTableFooter(table);
  }
  
  if (detailsSection) {
    for (let store of storesArray) {
      store.renderDetails();
    }
  }
});