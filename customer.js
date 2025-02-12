document.addEventListener('DOMContentLoaded', function() {
    const customers = [
        { id: 1, name: 'John Doe', phone: '123-456-7890', quantity: 50 },
        { id: 2, name: 'Jane Smith', phone: '234-567-8901', quantity: 30 },
        // Add more customers as needed
    ];

    const itemsPerPage = 5;
    let currentPage = 1;

    function displayCustomers(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = customers.slice(start, end);

        const tbody = document.getElementById('customerTable');
        tbody.innerHTML = '';

        paginatedItems.forEach(customer => {
            const row = `<tr>
                            <td>${customer.id}</td>
                            <td>${customer.name}</td>
                            <td>${customer.phone}</td>
                            <td>${customer.quantity}</td>
                         </tr>`;
            tbody.innerHTML += row;
        });

        setupPagination(customers.length, page);
    }

    function setupPagination(totalItems, page) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const pageCount = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === page ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', function() {
                currentPage = i;
                displayCustomers(currentPage);
            });
            pagination.appendChild(li);
        }
    }

    document.getElementById('searchInput').addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        const filteredCustomers = customers.filter(customer => 
            customer.name.toLowerCase().includes(query) || 
            customer.phone.includes(query)
        );
        displayCustomers(1);
        setupPagination(filteredCustomers.length, 1);
    });

    displayCustomers(currentPage);
});