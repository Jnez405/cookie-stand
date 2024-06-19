document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Theme toggle button
  const themeToggleButton = document.getElementById('theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  const images = [
    'img/salmon.png',
    'img/chinook.jpg',
    'img/cutter.jpeg',
    'img/family.jpg',
    'img/frosted-cookie.jpg',
    'img/shirt.jpg',
    'img/fish.jpg',
  ];

  const heroContainer = document.querySelector('.hero-container');
  if (heroContainer) {
    images.forEach((imageSrc, index) => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = 'Hero image'; // Add alt text for better accessibility
      if (index === 0) img.classList.add('active');
      heroContainer.appendChild(img);
    });

    let currentImageIndex = 0;
    setInterval(() => {
      console.log('Changing image');
      const currentImage = heroContainer.querySelector('.active');
      if (currentImage) {
        currentImage.classList.remove('active');
      } else {
        console.error('No active image found');
      }

      currentImageIndex = (currentImageIndex + 1) % images.length;
      const nextImage = heroContainer.children[currentImageIndex];
      if (nextImage) {
        nextImage.classList.add('active');
      } else {
        console.error('Next image not found');
      }
    }, 3000); // Change image every 3 seconds
  }

  // Define locations
  const locations = [
    { name: 'Seattle', address: '2901 3rd Ave #300, Seattle, WA 98121', hours: '6am-7pm', contact: '123-456-7890', minCust: 23, maxCust: 65, avgCookies: 6.3 },
    { name: 'Tokyo', address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-8634', hours: '6am-7pm', contact: '222-222-2222', minCust: 3, maxCust: 24, avgCookies: 1.2 },
    { name: 'Dubai', address: '1 Sheikh Mohammed bin Rashid Blvd - Dubai', hours: '6am-7pm', contact: '333-333-3333', minCust: 11, maxCust: 38, avgCookies: 3.7 },
    { name: 'Paris', address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris', hours: '6am-7pm', contact: '444-444-4444', minCust: 20, maxCust: 38, avgCookies: 2.3 },
    { name: 'Lima', address: 'Ca. Gral. Borgoño cuadra 8, Miraflores 15074', hours: '6am-7pm', contact: '555-555-5555', minCust: 2, maxCust: 16, avgCookies: 4.6 }
  ];

  function renderSalesData() {
    const salesDataContainer = document.getElementById('sales-data');
    if (!salesDataContainer) {
      console.error('Sales data container not found');
      return;
    }

    const table = document.createElement('table');
    table.classList.add('sales-table');
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

    const tableBody = document.createElement('tbody');
    const hourlyTotals = new Array(14).fill(0);

    locations.forEach(location => {
      const row = document.createElement('tr');
      let dailyTotal = 0;

      row.innerHTML = `<td>${location.name}</td>`;

      for (let hour = 0; hour < 14; hour++) {
        const customers = Math.floor(Math.random() * (location.maxCust - location.minCust + 1)) + location.minCust;
        const cookies = Math.round(customers * location.avgCookies);
        dailyTotal += cookies;
        hourlyTotals[hour] += cookies;
        row.innerHTML += `<td>${cookies}</td>`;
      }

      row.innerHTML += `<td>${dailyTotal}</td>`;
      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);

    const tableFoot = document.createElement('tfoot');
    const footerRow = document.createElement('tr');
    footerRow.innerHTML = '<th>Totals</th>';
    hourlyTotals.forEach(total => {
      footerRow.innerHTML += `<td>${total}</td>`;
    });
    footerRow.innerHTML += `<td>${hourlyTotals.reduce((sum, total) => sum + total, 0)}</td>`;
    tableFoot.appendChild(footerRow);
    table.appendChild(tableFoot);

    salesDataContainer.appendChild(table);
  }

  function renderLocationInfo() {
    const locationsInfoContainer = document.getElementById('locations-info');
    if (!locationsInfoContainer) {
      console.error('Locations info container not found');
      return;
    }

    locations.forEach(location => {
      const locationSection = document.createElement('div');
      locationSection.classList.add('location');

      locationSection.innerHTML = `
        <h3>${location.name}</h3>
        <p><strong>Address:</strong> ${location.address}</p>
        <p><strong>Hours:</strong> ${location.hours}</p>
        <p><strong>Contact:</strong> ${location.contact}</p>
      `;

      locationsInfoContainer.appendChild(locationSection);
    });
  }

  if (document.getElementById('sales-data')) {
    renderSalesData();
  }

  if (document.getElementById('locations-info')) {
    renderLocationInfo();
  }
});

