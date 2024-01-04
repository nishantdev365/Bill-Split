const selectPer = document.getElementById("Select_percent");
const generateBill = document.getElementById("generate_bill");
const resetBtn = document.getElementById("reset_btn");
const billAmount = document.getElementById("Bill_amount");
const PeopleCount = document.getElementById("no_of_People");
const buttons = selectPer.querySelectorAll("button");
const customTip = document.getElementById("custom");
const totalAmount = document.getElementById("total");
const tipAmount = document.getElementById("tip_amount");
const eachPersonBill = document.getElementById("each_person_bill");

let selectedPercentage = 0;

let selectButtonByValue = (e) => {
  selectedPercentage = parseFloat(e.target.value) / 100;
  console.log(selectedPercentage);
};

buttons.forEach((button) => {
  button.addEventListener("click", selectButtonByValue);
});

let customTipNum = 0;

customTip.addEventListener("keyup", (e) => {
  customTipNum = parseFloat(e.target.value) / 100;
  console.log(customTipNum);
});

let calculateValue = () => {
  billAmount.addEventListener("input", () => {
    if (billAmount.value === "") {
      buttons.forEach((button) => {
        button.setAttribute("disabled", "true");
      });
      customTip.setAttribute("disabled", "true");
      PeopleCount.setAttribute("disabled", "true");
      generateBill.classList.add("disabled");
      resetBtn.classList.add("disabled");
    } else {
      buttons.forEach((button) => {
        button.removeAttribute("disabled");
      });
      customTip.removeAttribute("disabled");
      PeopleCount.removeAttribute("disabled");
      generateBill.classList.remove("disabled");
      resetBtn.classList.remove("disabled");
    }
  });
};

calculateValue();

generateBill.addEventListener("click", () => {
  const bill = parseFloat(billAmount.value);
  const people = parseInt(PeopleCount.value);

  if (bill && people && (selectedPercentage || customTipNum !== 0)) {
    let tip = 0;
    if (customTipNum !== 0) {
      tip = customTipNum * bill;
    } else {
      tip = selectedPercentage * bill;
    }
    const total = bill + tip;
    const perPerson = total / people;
    tipAmount.textContent = `₹${Math.ceil(tip)}`;
    totalAmount.textContent = `₹${Math.ceil(total)}`;
    eachPersonBill.textContent = `₹${Math.ceil(perPerson)}`;
  } else {
    eachPersonBill.textContent = "";
  }
});

resetBtn.addEventListener("click", () => {
  billAmount.value = "";
  customTip.value = "";
  PeopleCount.value = "";
  eachPersonBill.textContent = "";
  tipAmount.textContent = "";
  totalAmount.textContent = "";
  selectedPercentage = 0;
  buttons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });
  customTip.setAttribute("disabled", "true");
  PeopleCount.setAttribute("disabled", "true");
  generateBill.classList.add("disabled");
  resetBtn.classList.add("disabled");
});
