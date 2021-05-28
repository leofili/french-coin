const initCollat = () => {
  document.querySelectorAll(".input_amount_loan").forEach((choice) => {
    choice.addEventListener("change", function (event) {
      event.preventDefault();
      const selectElmt = document.querySelector(".dropboxnewloan1 select");
      let currency = selectElmt.options[selectElmt.selectedIndex].value;
      let amount = document.querySelector(".loan_amount_cents input").value;
      if (currency === "Ethereums") {
        amount = document.querySelector(".loan_amount_cents input").value * 2273;
      };
      const selectElmt2 = document.querySelector(".dropboxnewloan2 select");
      let currency2 = selectElmt2.options[selectElmt2.selectedIndex].value;
      let lvt = document.querySelector(".choice-toggle2.selected input").value;
      if (lvt === "25") {
        if (currency2 === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4) / 2273;
        } else if (currency2 === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 4);
        };
        let apr = 100 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      } else if (lvt === "33") {
        if (currency2 === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 3) / 2273;
        } else if (currency2 === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 3);
        };
        let apr = 695 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      } else if (lvt === "50") {
        if (currency2 === "Ethereums") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 2) / 2273;
        } else if (currency2 === "Euros") {
          document.querySelector(".loan_collateral_cents input").value = (amount * 2);
        };
        let apr = 895 / 10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
      };
    });
  });
};

export { initCollat };