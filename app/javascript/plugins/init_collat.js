// calcul lors du changement d'input
const initCollat = () => {
  document.querySelectorAll(".input_amount_loan").forEach((choice) => {
    choice.addEventListener("change", function (event) {
      event.preventDefault();
      let checkboxes = document.querySelectorAll(".dropboxnewloan1 input[type='radio']")
      let selectedInput = Array.from(checkboxes).find(cb => cb.checked)
      let selectedValue = selectedInput.value;
      let amount = document.querySelector(".loan_amount_cents input").value;
      if (selectedValue === "Ethereums") {
        amount = document.querySelector(".loan_amount_cents input").value * 2223.83;
      };

      checkboxes = document.querySelectorAll(".dropboxnewloan2 input[type='radio']");
      selectedInput = Array.from(checkboxes).find(cb => cb.checked)
      let currency2 = selectedInput.value;
      if (currency2 === "Ethereums") {
        document.querySelector(".devise-new-loan").innerText = "/ETH"
      } else {
        document.querySelector(".devise-new-loan").innerText = "/EUR"
      };
      const lvt = document.querySelector("#fieldset2 input[checked]").value

      if (lvt === "25") {
        if (currency2 === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4) / 2223.83;
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 4) / 2223.83;
        } else if (currency2 === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4);
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 4);
        };
        let apr = 100 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((((amount * (apr / 12)) / (1 - Math.pow((1 + (apr / 12)), -month))) * month) - amount).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      } else if (lvt === "33") {
        if (currency2 === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = ((amount * 3) / 2223.83);
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 3) / 2223.83;
        } else if (currency2 === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 3);
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 3);
        };
        let apr = 695 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((((amount * (apr / 12)) / (1 - Math.pow((1 + (apr / 12)), -month))) * month) - amount).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      } else if (lvt === "50") {
        if (currency2 === "Ethereums") {
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 2) / 2223.83;
          document.querySelector(".loan_collateral_cents input").value = (amount * 2) / 2223.83;
        } else if (currency2 === "Euros") {
          document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 2);
          document.querySelector(".loan_collateral_cents input").value = (amount * 2);
        };
        let apr = 895 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((((amount * (apr / 12)) / (1 - Math.pow((1 + (apr / 12)), -month))) * month) - amount).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      };
    });
  });
};

export { initCollat };