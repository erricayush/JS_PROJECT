import { validateField } from "./validation.js";
import { clearErrors } from "./validation.js";
// --- State Management ---
let reviews = JSON.parse(localStorage.getItem('performance_reviews')) || [];
let isEditMode = false;



window.editReview = editReview;
window.confirmDelete = confirmDelete;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeAlert = closeAlert;
window.handleSearch = handleSearch;
window.calculateOverall = calculateOverall;
// --- Selectors ---
const tableBody = document.getElementById('reviewTableBody');
const form = document.getElementById('reviewForm');
const searchInput = document.getElementById('searchInput');

// --- Initialization ---
window.onload = () => {
    renderTable(reviews);
    updateSummary();
    setupBlurValidation();
};

// --- Core Functions ---
function renderTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        document.getElementById('noResults').classList.remove('hidden');
    } else {
        document.getElementById('noResults').classList.add('hidden');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b border-slate-100 hover:bg-slate-50 transition-colors';
            row.innerHTML = `
    <td class="px-6 py-4 text-xs font-mono text-slate-500 uppercase">${item.id}</td>
    <td class="px-6 py-4 text-sm font-medium text-slate-900">${item.employeeName}</td>
    <td class="px-6 py-4 text-sm text-slate-600">${item.email}</td>
    <td class="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">${item.phone}</td>
    <td class="px-6 py-4 text-sm text-slate-600">${item.department}</td>
    <td class="px-6 py-4 text-sm text-slate-600">${item.designation}</td>
    <td class="px-6 py-4 text-sm text-slate-600">${item.reviewPeriod}</td>
    <td class="px-6 py-4 text-sm text-slate-600">${item.reviewerName}</td>
    <td class="px-6 py-4 text-sm font-bold text-slate-900">${item.ratingOverall}</td>
    <td class="px-6 py-4">
        <span class="status-badge status-${item.reviewStatus.toLowerCase()}">${item.reviewStatus}</span>
    </td>
    <td class="px-6 py-4 text-sm font-medium">
        <button onclick="editReview('${item.id}')" class="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
        <button onclick="confirmDelete('${item.id}')" class="text-red-600 hover:text-red-800">Delete</button>
    </td>
    `;
            tableBody.appendChild(row);
        });
    }
}

function updateSummary() {
    const total = reviews.length;
    const approved = reviews.filter(r => r.reviewStatus === 'Approved').length;
    const pending = reviews.filter(r => r.reviewStatus !== 'Approved').length;

    let sumRatings = 0;
    reviews.forEach(r => sumRatings += parseFloat(r.ratingOverall) || 0);
    const avg = total > 0 ? (sumRatings / total).toFixed(1) : "0.0";

    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-approved').innerText = approved;
    document.getElementById('stat-pending').innerText = pending;
    document.getElementById('stat-avg').innerText = avg;
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = reviews.filter(r =>
        Object.values(r).some(val =>
            val.toString().toLowerCase().includes(query)
        )
    );
    renderTable(filtered);
}

// --- Form Logic ---
function calculateOverall() {
    const t = parseFloat(document.getElementById('ratingTechnical').value) || 0;
    const c = parseFloat(document.getElementById('ratingComm').value) || 0;
    const w = parseFloat(document.getElementById('ratingTeam').value) || 0;

    if (t > 0 || c > 0 || w > 0) {
        const avg = ((t + c + w) / 3).toFixed(1);
        document.getElementById('ratingOverall').value = avg;
    } else {
        document.getElementById('ratingOverall').value = '';
    }
}

function openModal(mode, id = null) {
    isEditMode = (mode === 'edit');
    document.getElementById('modalTitle').innerText = isEditMode ? 'Edit Performance Review' : 'Add Performance Review';
    form.reset();
    clearErrors();

    if (isEditMode) {
        const item = reviews.find(r => r.id === id);
        if (item) {
            document.getElementById('reviewId').value = item.id;
            document.getElementById('employeeName').value = item.employeeName;
            document.getElementById('email').value = item.email;
            document.getElementById('phone').value = item.phone;
            document.getElementById('department').value = item.department;
            document.getElementById('designation').value = item.designation;
            document.getElementById('reviewPeriod').value = item.reviewPeriod;
            document.getElementById('reviewerName').value = item.reviewerName;
            document.getElementById('ratingTechnical').value = item.ratingTechnical;
            document.getElementById('ratingComm').value = item.ratingComm;
            document.getElementById('ratingTeam').value = item.ratingTeam;
            document.getElementById('ratingOverall').value = item.ratingOverall;
            document.getElementById('reviewStatus').value = item.reviewStatus;
        }
    }

    document.getElementById('formModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('formModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// --- Validation Logic ---
function setupBlurValidation() {
    const fields = ['employeeName', 'email', 'phone', 'department', 'designation', 'reviewPeriod', 'reviewerName', 'ratingTechnical', 'ratingComm', 'ratingTeam', 'reviewStatus'];
    fields.forEach(fieldId => {
        const el = document.getElementById(fieldId);
        el.addEventListener('blur', () => validateField(fieldId));
    });
}


// --- Form Submission ---
form.onsubmit = (e) => {
    e.preventDefault();

    const fields = ['employeeName', 'email', 'phone', 'department', 'designation', 'reviewPeriod', 'reviewerName', 'ratingTechnical', 'ratingComm', 'ratingTeam', 'reviewStatus'];
    let isValid = true;
    fields.forEach(f => {
        if (!validateField(f)) isValid = false;
    });

    if (!isValid) return;

    const formData = {
        employeeName: document.getElementById('employeeName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        department: document.getElementById('department').value.trim(),
        designation: document.getElementById('designation').value.trim(),
        reviewPeriod: document.getElementById('reviewPeriod').value.trim(),
        reviewerName: document.getElementById('reviewerName').value.trim(),
        ratingTechnical: document.getElementById('ratingTechnical').value,
        ratingComm: document.getElementById('ratingComm').value,
        ratingTeam: document.getElementById('ratingTeam').value,
        ratingOverall: document.getElementById('ratingOverall').value,
        reviewStatus: document.getElementById('reviewStatus').value
    };

    if (isEditMode) {
        const id = document.getElementById('reviewId').value;
        const index = reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            reviews[index] = { ...formData, id };
        }
    } else {
        formData.id = 'REV-MLGML' + Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
        reviews.push(formData);
    }

    localStorage.setItem('performance_reviews', JSON.stringify(reviews));
    renderTable(reviews);
    updateSummary();
    closeModal();
    searchInput.value = ''; // Reset search after action
};

// --- Edit / Delete Action ---
function editReview(id) {
    openModal('edit', id);
}

function confirmDelete(id) {
    const item = reviews.find(r => r.id === id);
    if (!item) return;

    if (item.reviewStatus === 'Approved') {
        showAlert('Delete Restricted', 'Approved reviews cannot be deleted. You may change the status via Edit if needed.', false);
    } else {
        showAlert('Delete Review', `Are you sure you want to delete performance review for "${item.employeeName}" (Status: ${item.reviewStatus})?`, true, () => {
            reviews = reviews.filter(r => r.id !== id);
            localStorage.setItem('performance_reviews', JSON.stringify(reviews));
            renderTable(reviews);
            updateSummary();
            closeAlert();
        });
    }
}

// --- Custom Alert Utility ---
function showAlert(title, body, showCancel, onConfirm = null) {
    document.getElementById('alertTitle').innerText = title;
    document.getElementById('alertBody').innerText = body;
    const cancelBtn = document.getElementById('alertCancelBtn');
    const confirmBtn = document.getElementById('alertConfirmBtn');

    cancelBtn.classList.toggle('hidden', !showCancel);
    confirmBtn.onclick = onConfirm || closeAlert;
    confirmBtn.innerText = showCancel ? 'Okay' : 'Okay';
    confirmBtn.className = showCancel ? 'px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700' : 'px-6 py-2 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200';

    document.getElementById('alertModal').classList.remove('hidden');
}

function closeAlert() {
    document.getElementById('alertModal').classList.add('hidden');
}

