export function validateField(fieldId) {
            const val = document.getElementById(fieldId).value.trim();
            const errEl = document.getElementById(`err-${fieldId}`);
            const inputEl = document.getElementById(fieldId);
            let message = '';

            switch(fieldId) {
                case 'employeeName':
                case 'reviewerName':
                    if (!val) message = 'Name is required';
                    else if (val.length < 3) message = 'Minimum 3 characters required';
                    break;
                case 'email':
                    if (!val) message = 'Email is required';
                    else {
                        const emails = val.split(',').map(e => e.trim());
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emails.some(e => !emailRegex.test(e))) message = 'Invalid email format';
                    }
                    break;
                case 'phone':
                    if (!val) message = 'Phone number is required';
                    else {
                        const phones = val.split(',').map(p => p.trim());
                        const phoneRegex = /^(\+91[\s-]?)?[6789]\d{9}$/;
                        if (phones.some(p => !phoneRegex.test(p))) message = 'Indian format required (e.g. +91 9876543210)';
                    }
                    break;
                case 'department':
                case 'designation':
                    if (!val) message = 'Field is required';
                    break;
                case 'reviewPeriod':
                    if (!val) message = 'Period is required';
                    else if (!/^[A-Za-z]{3}\s\d{4}$/.test(val)) message = 'Format: MMM YYYY (e.g., Jan 2026)';
                    break;
                case 'ratingTechnical':
                case 'ratingComm':
                case 'ratingTeam':
                    const n = parseFloat(val);
                    if (isNaN(n)) message = 'Rating required';
                    else if (n < 1 || n > 5) message = 'Range: 1 to 5';
                    break;
                case 'reviewStatus':
                    if (!val) message = 'Select a status';
                    break;
            }

            if (message) {
                errEl.innerText = message;
                inputEl.classList.add('input-error');
                return false;
            } else {
                errEl.innerText = '';
                inputEl.classList.remove('input-error');
                return true;
            }
        }

     export function clearErrors() {
            const errs = document.querySelectorAll('.error-message');
            const inputs = document.querySelectorAll('input, select');
            errs.forEach(e => e.innerText = '');
            inputs.forEach(i => i.classList.remove('input-error'));
        }
