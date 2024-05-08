const employeeData = {};
const form = document.querySelector("#form");
const fullnameInput = document.querySelector("#fullname-input");
const emailInput = document.querySelector("#email-input");
const companyInput = document.querySelector("#company-input");
const positionInput = document.querySelector("#position-input");

fullnameInput.addEventListener("input", (e) => {
  employeeData[e.target.name] = e.target.value;
});
emailInput.addEventListener("input", (e) => {
  employeeData[e.target.name] = e.target.value;
});
companyInput.addEventListener("input", (e) => {
  employeeData[e.target.name] = e.target.value;
});
positionInput.addEventListener("input", (e) => {
  employeeData[e.target.name] = e.target.value;
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await window.employee.saveEmployeeData(employeeData);
  Toastify({
    text: data.message,
    duration: 2000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "gray",
      color: "black",
    },
  }).showToast();
  fullnameInput.value = "";
  emailInput.value = "";
  companyInput.value = "";
  positionInput.value = "";
});
