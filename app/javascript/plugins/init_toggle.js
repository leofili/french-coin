const initToggle = () => {
  if (document.getElementById('fieldset1')) {
    document.querySelectorAll(".choice-toggle").forEach((choice) => {
      choice.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".choice-toggle.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
        // update Interets et APR
        let month = document.querySelector(".choice-toggle.selected input").value;

        let checkboxes = document.querySelectorAll(".dropboxnewloan1 input[type='radio']")
        let selectedInput = Array.from(checkboxes).find(cb => cb.checked)
        const selectedValue = selectedInput.value;
        let amount = document.querySelector(".loan_amount_cents input").value;
        if (selectedValue === "Ethereums") {
          amount = document.querySelector(".loan_amount_cents input").value * 2217.86;
        };

        if (document.querySelector(".choice-toggle2.selected input").value === "25") {
          let apr = 100 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
          document.querySelector(".loan_interest_cents input").value = interest * 100;
        } else if (document.querySelector(".choice-toggle2.selected input").value === "33") {
          let apr = 695 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
          document.querySelector(".loan_interest_cents input").value = interest * 100;
        } else if (document.querySelector(".choice-toggle2.selected input").value === "50") {
          let apr = 895 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
          document.querySelector(".loan_interest_cents input").value = interest * 100
        };
      });
    });
  };
  if (document.getElementById('fieldset2')) {
    document.querySelectorAll(".choice-toggle2").forEach((choice) => {
      choice.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".choice-toggle2.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle2.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
        // update du collateral selon emprunt
        // update de Interets et APR
        let lvt = document.querySelector(".choice-toggle2.selected input").value;
        let checkboxes = document.querySelectorAll(".dropboxnewloan1 input[type='radio']")
        let selectedInput = Array.from(checkboxes).find(cb => cb.checked)
        const selectedValue = selectedInput.value;
        let amount = document.querySelector(".loan_amount_cents input").value;
        if (selectedValue === "Ethereums") {
          amount = document.querySelector(".loan_amount_cents input").value * 2217.86;
        };

        const selectElmt2 = document.querySelectorAll(".dropboxnewloan2 input[type='radio']")
        selectedInput = Array.from(selectElmt2).find(cb => cb.checked)
        const currency2 = selectedInput.value;
        let apr = 0;
        let begin = document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText;

        begin = parseFloat(begin);
        const odometer = document.querySelector('.collateral_span_new_loan .odometer');
        const od = new Odometer({
          el: odometer,
          value: begin,
        });
        od.update(document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText);

        if (lvt === "25") {
          apr = 100 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);

          if (currency2 === "Ethereums") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 4) / 2217.86;
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 4) / 2217.86;
          } else if (currency2 === "Euros") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 4);
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 4);
          };

          document.querySelector(".loan_interest_rate input").value = (apr * 100).toFixed(2);
        } else if (lvt === "33") {
          apr = 695 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          if (currency2 === "Ethereums") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 3) / 2217.86;
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 3) / 2217.86;
          } else if (currency2 === "Euros") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 3);
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 3);
          };

          document.querySelector(".loan_interest_rate input").value = (apr * 100).toFixed(2);
        } else if (lvt === "50") {
          apr = 895 / 10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          if (currency2 === "Ethereums") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 2) / 2217.86;
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 2) / 2217.86;
          } else if (currency2 === "Euros") {
            document.querySelector(".loan_collateral_cents input").value = (amount * 2);
            document.querySelector(".collateral_span_new_loan .color-span-collat-loan").innerText = (amount * 2);
          };

          document.querySelector(".loan_interest_rate input").value = (apr * 100).toFixed(2);
        };

        if (document.querySelector(".choice-toggle.selected input").value === "6") {
          document.querySelector(".interest").innerText = ((amount * apr) / 2).toFixed(2);
          document.querySelector(".loan_interest_cents input").value = (((amount * apr) / 2).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "12") {
          document.querySelector(".interest").innerText = (amount * apr).toFixed(2);
          document.querySelector(".loan_interest_cents input").value = (((amount * apr)).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "24") {
          document.querySelector(".interest").innerText = ((amount * apr) / (12 / 24)).toFixed(2);
          document.querySelector(".loan_interest_cents input").value = (((amount * apr) / (12 / 24)).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "36") {
          document.querySelector(".interest").innerText = ((amount * apr) / (12 / 36)).toFixed(2);
          document.querySelector(".loan_interest_cents input").value = (((amount * apr) / (12 / 36)).toFixed(2)) * 100
        };
      });
    });
  };
};

export { initToggle };
