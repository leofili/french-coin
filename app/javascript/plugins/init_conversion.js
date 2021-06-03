const initConversion = () => {
  if (document.getElementById("new_loan")) {
    const dropdowns = document.querySelectorAll(".dropboxnewloan1 input[type='radio']");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", (event) => {
        event.preventDefault();
        const dropdownType = event.currentTarget.id.split("_currency")[0];
        const inputResult = document.querySelector(`#${dropdownType}_cents`);
        let amount = inputResult.value;
        let currency = event.currentTarget.value;
        if (currency === "Euros") {
          inputResult.value = amount * 2273;
          if (inputResult === document.querySelector(`.loan_collateral_cents input`)) {
          //document.querySelector(`.collateral_span_new_loan .color-span-collat-loan`).innerText  = amount * 2273;
          }
        };

        if (currency === "Ethereums") {
          inputResult.value = amount / 2273;
          if (inputResult === document.querySelector(`.loan_collateral_cents input`)) {
            //document.querySelector(`.collateral_span_new_loan .color-span-collat-loan`).innerText = amount / 2273;
          }
        };
      });
    })
  };
  if (document.getElementById("edit-loan")) {
    const dropdowns = document.querySelectorAll(".dropboxnewloan1 input[type='radio']");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", (event) => {
        event.preventDefault();
        const dropdownType = event.currentTarget.id.split("_currency")[0];
        const inputResult = document.querySelector(`#${dropdownType}_cents`);

        let amount = inputResult.value;
        let currency = event.currentTarget.value;
        if (currency === "Euros") {
          inputResult.value = (amount * 2273).toFixed(2);
          if (inputResult === document.querySelector(`.loan_collateral_cents input`)) {
          document.querySelector(`.collateral_span_new_loan .color-span-collat-loan`).innerText  = amount * 2273;
          }
        };

        if (currency === "Ethereums") {
          inputResult.value = amount / 2273;
          if (inputResult === document.querySelector(`.loan_collateral_cents input`)) {
            document.querySelector(`.collateral_span_new_loan .color-span-collat-loan`).innerText = amount / 2273;
          }
        };
      });
    })
  };
};

export { initConversion }