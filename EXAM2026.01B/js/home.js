const EMPLOYEES_KEY = 'employees';

const defaultEmployees = [
    {id: 1,hthao: "Hội thảo AI cho ứng dụng giáo dục",name: "PGS.TS Trần Minh Tuấn",email: "tuan.tm@university.vn",date: "2026-04-12",position: "Giảng đường A1, Hà nội",},
    {id: 2,hthao: "Chuyên đề an toàn thông tin Cloud",name: "ThS. Lê Hoàng Nam",email: "nam.lh@sec.demo.vn",date: "2026-04-18",position: "Hội trường B, Đà Nẵng",},
    {id: 3,hthao: "Workshop UX cho sản phẩm số",name: "Nguyễn Thu Hà",email: "ha.nguyen.ux@gmail.com",date: "2026-05-02",position: "Văn phòng TLU, TP.HCM",},
    {id: 4,hthao: "Diễn đàn phát triển Web hiện đại",name: "TS. Phạm Quốc Việt",email: "viet.pq@webacademy",date: "2026-05-15",position: "Trung tâm CNTT, Cần Thơ",},
    {id: 5,hthao: "Hội thảo dữ liệu lớn trong y tế",name: "BS.CKII Đỗ Lan Anh",email: "anh.dl@hospital-health.vn",date: "2026-06-01",position: "Bệnh viện đa khoa trung ương",}
];

function getEmployees() {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    if (!data) {
        saveEmployees(defaultEmployees);
        return [...defaultEmployees];
    }
    try {
        const list = JSON.parse(data);
        return Array.isArray(list) ? list : [];
    } catch (error) {
        console.error('Dữ liệu nhân sự không hợp lệ:', error);
        return [];
    }
}

function saveEmployees(list) {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
}

function renderTable(employees) {
    const tbody = document.getElementById('employeeTableBody');
    tbody.innerHTML = '';
    if (!employees.length) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" class="empty-row">Không có nhân sự nào</td>';
        tbody.appendChild(row);
        return;
    }

    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.hthao}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.date}</td>
            <td>${employee.position}</td>
            
        `;
        tbody.appendChild(row);
    });
    attachRowEvents();
}

function attachRowEvents() {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.dataset.id;
            window.location.href = `add.html?id=${encodeURIComponent(id)}`;
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.dataset.id;
            deleteEmployee(id);
        });
    });
}

function deleteEmployee(id) {
    const employees = getEmployees();
    const index = employees.findIndex(item => item.id === id);
    if (index === -1) return;
    if (!confirm('Bạn có chắc muốn xóa nhân sự này không?')) return;
    employees.splice(index, 1);
    saveEmployees(employees);
    renderTable(employees);
}

function filterEmployees(keyword) {
    const normalized = keyword.trim().toLowerCase();
    const employees = getEmployees();
    if (!normalized) {
        renderTable(employees);
        return;
    }
    const filtered = employees.filter(employee => {
        return (
            employee.name.toLowerCase().includes(normalized) ||
            employee.email.toLowerCase().includes(normalized) ||
            employee.phone.toLowerCase().includes(normalized) ||
            employee.position.toLowerCase().includes(normalized)
        );
    });
    renderTable(filtered);
}

function initPage() {
    const employees = getEmployees();
    renderTable(employees);

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => filterEmployees(searchInput.value));
    searchInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            filterEmployees(searchInput.value);
        }
    });
}

document.addEventListener('DOMContentLoaded', initPage);
