document.addEventListener('DOMContentLoaded', () => {
    // Order Form Handling
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(orderForm);
            const order = {
                id: Date.now(),
                name: formData.get('name'),
                address: formData.get('address'),
                payment: formData.get('payment'),
                product: formData.get('product'),
                quantity: formData.get('quantity'),
                instructions: formData.get('instructions')
            };

            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            alert('Order placed successfully!');
            orderForm.reset();
        });
    }

    // Order Processing Handling
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let filledOrders = JSON.parse(localStorage.getItem('filledOrders')) || [];

    const pendingOrdersContainer = document.getElementById('pending-orders');
    const filledOrdersContainer = document.getElementById('filled-orders');

    function renderOrders() {
        if (pendingOrdersContainer) {
            pendingOrdersContainer.innerHTML = '';
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.name}</td>
                    <td>${order.address}</td>
                    <td>${order.product}</td>
                    <td>${order.quantity}</td>
                    <td>${order.instructions}</td>
                    <td><button class="button" onclick="fillOrder(${order.id})">Fill Order</button></td>
                `;
                pendingOrdersContainer.appendChild(row);
            });
        }

        if (filledOrdersContainer) {
            filledOrdersContainer.innerHTML = '';
            filledOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.name}</td>
                    <td>${order.address}</td>
                    <td>${order.product}</td>
                    <td>${order.quantity}</td>
                    <td>${order.instructions}</td>
                `;
                filledOrdersContainer.appendChild(row);
            });
        }
    }

    window.fillOrder = function (orderId) {
        const orderIndex = orders.findIndex(order => order.id === orderId);
        const order = orders.splice(orderIndex, 1)[0];
        filledOrders.push(order);

        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('filledOrders', JSON.stringify(filledOrders));

        renderOrders();
    };

    renderOrders();
});
