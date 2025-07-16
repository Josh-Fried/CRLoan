
// The entire script tag is unchanged
function updateCompletionCounter() {
    const form = document.getElementById('loan-application-form');
    const allFields = form.querySelectorAll('input, select');
    const counterElement = document.getElementById('completion-counter');
    const progressBar = document.querySelector('.progress-bar-fill');
    let totalRequired = 0;
    let completedCount = 0;
    allFields.forEach(field => {
        const isVisible = !field.closest('.hidden');
        if (field.required && isVisible) {
            totalRequired++;
            if (field.value) { completedCount++; }
        }
    });
    counterElement.textContent = `Required Fields Complete: ${completedCount} / ${totalRequired}`;
    const percentage = totalRequired > 0 ? (completedCount / totalRequired) * 100 : 0;
    progressBar.style.width = percentage + '%';
}
function verifyEmail() {
    const emailInput = document.getElementById('guarantor-email');
    if (emailInput.value && emailInput.checkValidity()) {
        alert('A verification link has been sent to ' + emailInput.value);
        emailInput.nextElementSibling.classList.add('hidden');
        emailInput.classList.remove('error');
    } else {
        emailInput.nextElementSibling.classList.remove('hidden');
        emailInput.classList.add('error');
    }
}
function setFieldsRequired(containerId, isRequired) {
    const container = document.getElementById(containerId);
    container.querySelectorAll('input, select').forEach(input => { input.required = isRequired; });
}
function toggleContactField() {
    const contactMethodSelect = document.getElementById('contact-method');
    const phoneFieldContainer = document.getElementById('phone-number-field');
    const phoneInput = document.getElementById('phone-number');
    const selectedValue = contactMethodSelect.value;
    if (selectedValue === 'Call' || selectedValue === 'Text' || selectedValue === 'WhatsApp') {
        phoneFieldContainer.classList.remove('hidden');
        phoneInput.required = true;
    } else {
        phoneFieldContainer.classList.add('hidden');
        phoneInput.required = false;
    }
}
function updateDynamicFields() {
    const interestSelect = document.getElementById('interest');
    const purchaseFields = document.getElementById('purchase-fields');
    const refinanceFields = document.getElementById('refinance-fields');
    const propertyDetailsFields = document.getElementById('property-details-fields');
    const selectedValue = interestSelect.value;
    purchaseFields.classList.add('hidden');
    refinanceFields.classList.add('hidden');
    propertyDetailsFields.classList.add('hidden');
    setFieldsRequired('purchase-fields', false);
    setFieldsRequired('refinance-fields', false);
    setFieldsRequired('property-details-fields', false);
    if (selectedValue === 'purchase') {
        purchaseFields.classList.remove('hidden');
        propertyDetailsFields.classList.remove('hidden');
        setFieldsRequired('purchase-fields', true);
        setFieldsRequired('property-details-fields', true);
    } else if (selectedValue === 'refinance' || selectedValue === 'cash-outRefinance') {
        refinanceFields.classList.remove('hidden');
        propertyDetailsFields.classList.remove('hidden');
        setFieldsRequired('refinance-fields', true);
        setFieldsRequired('property-details-fields', true);
    }
}
document.getElementById('loan-application-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('input.error, select.error').forEach(el => el.classList.remove('error'));
    this.querySelectorAll('[required]').forEach(function(input) {
        const isVisible = !input.closest('.hidden');
        if (isVisible && (!input.value || (input.type === 'email' && !input.checkValidity()))) {
                isValid = false;
                input.classList.add('error');
                const errorMsg = input.closest('.form-group').querySelector('.error-message');
                if(errorMsg) errorMsg.classList.remove('hidden');
        }
    });
    if (isValid) {
        alert('Form is valid! Submitting to the next page...');
    } else {
            alert('Please fill out all required fields.');
    }
});
const loanForm = document.getElementById('loan-application-form');
loanForm.addEventListener('input', updateCompletionCounter);
loanForm.addEventListener('change', updateCompletionCounter);
updateCompletionCounter();