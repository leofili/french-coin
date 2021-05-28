const initConversion = () => {
  if (document.getElementById("new_loan")) {
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", (event) => {
        event.preventDefault();
        const dropdownType = event.currentTarget.id.split("_currency")[0];
        const inputResult = document.querySelector(`#${dropdownType}_cents`);

        let amount = inputResult.value;
        let currency = event.currentTarget.value;
        if (currency === "Euros") {
          inputResult.value = amount * 2800;
        };

        if (currency === "Ethereums") {
          inputResult.value = amount / 2800;
        }; 
      }); 
    })
  };
};

export {initConversion}