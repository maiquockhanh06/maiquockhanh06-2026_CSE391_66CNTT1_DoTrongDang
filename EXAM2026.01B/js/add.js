const EMPLOYEES_KEY = 'employees';


const form = document.querySelector('.add-form');
const pageTitle = document.getElementById('page-title');
const params = new URLSearchParams(window.location.search);
const employeeId = params.get('id');

const hthaoInput = form ? form.querySelector('input[type="text"]') : null;
const nameInput = form ? form.querySelector('input[type="text"]') : null;
const emailInput = form ? form.querySelector('input[type="email"]') : null;
const phoneInput = form ? form.querySelector('input[type="tel"]') : null;
const positionInput = form ? form.querySelector('input[type="text"]') : null;
const genderInputs = form ? form.querySelectorAll('input[name="gioi_tinh"]') : [];
const cancelButton = form ? form.querySelector('button[type="button"]') : null;
const dateInput = form ? form.querySelector('input[type="text"]') : null;


function getEmployees() {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    if (!data) return [];
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

function findEmployee(id) {
    return getEmployees().find(employee => employee.id === id);
}

function setGenderValue(value) {
    genderInputs.forEach(input => {
        input.checked = input.value === value;
    });
}

function getGenderValue() {
    const selected = Array.from(genderInputs).find(input => input.checked);
    if (!selected) return '';
    return selected.value === 'nam' ? 'Nam' : 'Nữ';
}

function fillForm(employee) {
    if (!hthaoInput || !nameInput || !emailInput || !dateInput || !positionInput) return;
    hthaoInput.value = employee.hthao || '';
    nameInput.value = employee.name || '';
    emailInput.value = employee.email || '';
    phoneInput.value = employee.phone || '';
    dateInput.value = employee.date || '';
    positionInput.value = employee.position || '';
}

function getFormData() {
    return {
        hthao: hthaoInput ? hthaoInput.value.trim() : '',
        name: nameInput ? nameInput.value.trim() : '',
        email: emailInput ? emailInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        date: dateInput ? dateInput.value.trim() : '',
        position: positionInput ? positionInput.value.trim() : '',
    };
}
function validateForm(data) {
    const errors = {};

    // Validate tên
    if (!data.name) {
        errors.name = 'Tên không được để trống';
    } else if (data.name.length < 2) {
        errors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        errors.email = 'Email không được để trống';
    } else if (!emailRegex.test(data.email)) {
        errors.email = 'Email không đúng định dạng';
    }

    // Validate số điện thoại (Việt Nam)
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!data.phone) {
        errors.phone = 'SĐT không được để trống';
    } else if (!phoneRegex.test(data.phone)) {
        errors.phone = 'SĐT không hợp lệ (10 số hoặc +84)';
    }

    return errors;
}
function showErrors(errors) {
    // reset lỗi cũ
    document.querySelectorAll('.error').forEach(e => e.textContent = '');

    if (errors.name && nameInput) {
        nameInput.nextElementSibling.textContent = errors.name;
    }
    if (errors.email && emailInput) {
        emailInput.nextElementSibling.textContent = errors.email;
    }
    if (errors.phone && phoneInput) {
        phoneInput.nextElementSibling.textContent = errors.phone;
    }
}

function initForm() {
    if (!form) return;
    if (!employeeId) return;
    const employee = findEmployee(employeeId);
    if (!employee) return;
    pageTitle.textContent = 'Sửa nhân sự';
    fillForm(employee);
}

if (form) {
    form.addEventListener('submit', event => {
    event.preventDefault();

    const newEmployee = getFormData();
    const errors = validateForm(newEmployee);

    if (Object.keys(errors).length > 0) {
        showErrors(errors);
        return;
    }

        const employees = getEmployees();
        if (employeeId) {
            const index = employees.findIndex(item => item.id === employeeId);
            if (index !== -1) {
                employees[index] = { ...employees[index], ...newEmployee };
            } else {
                employees.push({ id: Date.now().toString(), ...newEmployee });
            }
        } else {
            employees.push({ id: Date.now().toString(), ...newEmployee });
        }

        saveEmployees(employees);
        window.location.href = 'home.html';
    });
}

if (cancelButton) {
    cancelButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
}

window.addEventListener('DOMContentLoaded', initForm);
