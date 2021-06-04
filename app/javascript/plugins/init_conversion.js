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
          inputResult.value = amount * 2223.83;
        } else if (currency === "Ethereums") {
          inputResult.value = amount / 2223.83;
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
          inputResult.value = (amount * 2223.83).toFixed(2);
        } else if (currency === "Ethereums") {
          inputResult.value = amount / 2223.83;
        };
      });
    })
    dropdowns = document.querySelectorAll(".dropboxnewloan2 input[type='radio']");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", (event) => {
        event.preventDefault();
        selectedInput = Array.from(checkboxes).find(cb => cb.checked)
        let currency = selectedInput.value;
        if (currency === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4);
          document.querySelector(".devise-new-loan").innerText = "/EUR"
        } else if (currency === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4) / 2223.83;
          document.querySelector(".devise-new-loan").innerText = "/ETH"
        };
      });
    })
  };
};

export { initConversion }