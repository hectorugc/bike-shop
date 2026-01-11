
const businessAccountCheckbox = document.getElementById('businessAccount');
const companyInfoSection = document.getElementById('companyInfo');

businessAccountCheckbox.addEventListener('change', function () {
    if (this.checked) {
        companyInfoSection.style.display = 'block';
    } else {
        companyInfoSection.style.display = 'none';
    }
});



const reasonOfContact = document.getElementById('contactReason');
const productNameField = document.getElementById('productNameField');


reasonOfContact.addEventListener('change', function () {
    if (this.value === 'product') {
        productNameField.style.display = 'block';
    } else {
        productNameField.style.display = 'none';
    }
});


const orderNumberField = document.getElementById('orderNumberField');
console.log(orderNumberField);
reasonOfContact.addEventListener('change', function () {
    if (this.value === 'order') {
        orderNumberField.style.display = 'block';
    } else {
        orderNumberField.style.display = 'none';
    }
});