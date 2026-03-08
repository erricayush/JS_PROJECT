import { validateForm } from './validation.js';
import { resetErrors } from './validation.js';

const addWorksLog = document.querySelector(".add-works-log");
const formModal = document.querySelector(".form-modal");
const formClose = document.querySelectorAll('.form-close');
const formData = document.querySelector('.form-data');
const inputList = document.querySelector('.input-list');
const searchBtn = document.querySelector('.search-btn');

const emailContainer = document.getElementById('email-container');
const phoneContainer = document.getElementById('phone-container');
const addEmailBtn = document.getElementById('add-email-btn');
const addPhoneBtn = document.getElementById('add-phone-btn');

let inputData = [];
let editIndex = null;

if (localStorage.getItem('inputData') != null) {
    inputData = JSON.parse(localStorage.getItem('inputData'));
}

const createDynamicRow = (container, name, placeholder, value = "") => {
    const div = document.createElement('div');
    div.className = "flex gap-2 items-center mt-2 dynamic-row";
    div.innerHTML = `
        <input name="${name}" type="text" placeholder="${placeholder}" value="${value}" class="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400">
        <button type="button" class="remove-row text-red-500 hover:text-red-700 font-bold px-2">×</button>
    `;
    div.querySelector('.remove-row').onclick = () => div.remove();
    container.appendChild(div);
};

addEmailBtn.addEventListener('click', () => createDynamicRow(emailContainer, 'email', 'Enter email address'));
addPhoneBtn.addEventListener('click', () => createDynamicRow(phoneContainer, 'phone', 'Enter phone number'));

const resetFormState = () => {
    formData.reset();
    emailContainer.innerHTML = `<input name="email" type="email" placeholder="Enter email address" class="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400">`;
    phoneContainer.innerHTML = `<input name="phone" type="text" placeholder="Enter 10-digit phone number" class="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-400">`;
};

formData.addEventListener('submit', (e) => {
    e.preventDefault();

    // Ensure validation is passing. If it still fails, check validation.js
    if (!validateForm()) {
        return;
    }

    // 1. Manually collect all dynamic values BEFORE FormData clears them
    const emails = Array.from(emailContainer.querySelectorAll('input')).map(i => i.value.trim()).filter(v => v !== "");
    const phones = Array.from(phoneContainer.querySelectorAll('input')).map(i => i.value.trim()).filter(v => v !== "");

    // 2. Build the data object
    const data = new FormData(formData);
    const entry = Object.fromEntries(data.entries());

    // 3. CRITICAL FIX: Override the values with joined strings
    entry.email = emails.join(", ");
    entry.phone = phones.join(", ");

    if (editIndex !== null) {
        inputData[editIndex] = entry;
        swal('Data Updated', 'Successfully!', 'success');
        editIndex = null;
    } else {
        inputData.push(entry);
        swal('Data Inserted', 'Successfully!', 'success');
    }

    localStorage.setItem('inputData', JSON.stringify(inputData));
    resetFormState();
    closeModal();
    getInputData();
});

// --- Table and Stats Logic ---
function calculateTimeDifference(startTime, endTime) {
    if (!startTime || !endTime) return "0h 0m";
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startDate = new Date(2000, 0, 1, startHours, startMinutes);
    let endDate = new Date(2000, 0, 1, endHours, endMinutes);
    if (endDate < startDate) endDate.setDate(endDate.getDate() + 1);
    const diffMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

const updateDashboard = () => {
    document.getElementById('stat-total-1').innerText = inputData.length;
    document.getElementById('stat-total-2').innerText = inputData.length;
    const leaves = inputData.filter(item => item.workStatus === "Leave").length;
    document.getElementById('stat-leave').innerText = leaves;
    let totalMins = 0;
    inputData.forEach(item => {
        const diffStr = calculateTimeDifference(item.loginTime, item.logoutTime);
        const parts = diffStr.match(/\d+/g);
        if (parts) totalMins += (parseInt(parts[0]) * 60) + parseInt(parts[1]);
    });
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    document.getElementById('stat-hours').innerText = `${h}h ${m}m`;
}

const getInputData = () => {
    inputList.innerHTML = "";
    inputData.forEach((data, index) => {
        inputList.innerHTML += `
        <tr class="border-b hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-xs font-bold text-gray-700">${index + 1}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.name}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.email}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.phone}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.department}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.date}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.loginTime}</td>
            <td class="px-6 py-4 text-xs text-gray-600">${data.logoutTime}</td>
            <td class="px-6 py-4 text-xs font-semibold text-blue-600">${calculateTimeDifference(data.loginTime, data.logoutTime)}</td>
            <td class="px-6 py-4 text-xs text-center">
                <span class="bg-green-100 text-green-700 rounded-full px-3 py-1 font-bold">${data.workStatus}</span>
            </td>
            <td class="px-6 py-4 flex gap-2">
                <button onclick="editLog(${index})" class="bg-green-600 text-white p-1.5 rounded-md cursor-pointer hover:bg-green-700 transition">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick="deleteLog(${index})" class="bg-red-400 text-white p-1.5 rounded-md cursor-pointer hover:bg-red-500 transition">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`;
    });
    updateDashboard();
}

window.editLog = (index) => {
    editIndex = index;
    openModal();
    resetFormState();

    const data = inputData[index];

    // Re-create the rows from the comma string
    const emails = data.email.split(", ");
    const phones = data.phone.split(", ");

    emails.forEach((val, i) => {
        if (i === 0) {
            emailContainer.querySelector('input').value = val;
        } else {
            createDynamicRow(emailContainer, 'email', 'Enter email address', val);
        }
    });

    phones.forEach((val, i) => {
        if (i === 0) {
            phoneContainer.querySelector('input').value = val;
        } else {
            createDynamicRow(phoneContainer, 'phone', 'Enter phone number', val);
        }
    });

    // Handle other standard fields
    const inputs = formData.querySelectorAll('input:not([name="email"]):not([name="phone"]), select');
    inputs.forEach(input => {
        if (data[input.name]) {
            input.value = data[input.name];
        }
    });

    document.querySelector('.form-modal h1').innerText = "Update Work Log";
    document.getElementById('submit-btn-text').innerText = "Update Work Log";
}

// Global exposure for onclick in HTML
window.editLog = window.editLog;


// --- General UI Actions ---
const confirmDelete = () => {
    return new Promise((resolve) => {
        swal({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this work log?",
            icon: "warning",
            buttons: { cancel: "Cancel", confirm: "Okay" },
            dangerMode: true,
        }).then((willDelete) => resolve(willDelete));
    });
};

window.deleteLog = async (index) => {
    const isConfirmed = await confirmDelete();
    if (isConfirmed) {
        inputData.splice(index, 1);
        localStorage.setItem('inputData', JSON.stringify(inputData));
        getInputData();
        swal("Poof! Your log has been deleted!", { icon: "success" });
    }
};

const search = () => {
    let val = searchBtn.value.toLowerCase();
    let rows = inputList.querySelectorAll('tr');
    rows.forEach((row) => {
        let rowText = row.innerText.toLowerCase();
        row.style.display = rowText.includes(val) ? "" : "none";
    });
}

searchBtn.addEventListener('input', search);
formClose.forEach(btn => btn.addEventListener('click', closeModal));

addWorksLog.addEventListener('click', (e) => {
    editIndex = null;
    openModal();
});

function closeModal() {
    formModal.classList.add('hidden');
}

function openModal() {
    formModal.classList.remove('hidden');
    resetErrors();
    if (editIndex === null) {
        resetFormState();
        document.querySelector('.form-modal h1').innerText = "Add Work Log";
        document.getElementById('submit-btn-text').innerText = "Save Work log";
    }
}

getInputData();