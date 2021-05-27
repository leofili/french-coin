const initCollat = () => {
  document.querySelectorAll(".contener").forEach((choice) => {
    choice.addEventListener("change", function(event) {
      event.preventDefault();
      let amount = document.querySelector(".loan_amount_cents input").value;
      let lvt = document.querySelector(".choice-toggle2.selected input").value;
      if (lvt === "25") {
        let apr = 100/10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
        document.querySelector(".loan_collateral_cents input").value = amount * 4;
      } else if (lvt === "33") {
        let apr = 695/10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
        document.querySelector(".loan_collateral_cents input").value = amount * 3;
      } else if (lvt === "50") {
        let apr = 895/10000;
        let month = document.querySelector(".choice-toggle.selected input").value;
        let interest = ((amount * apr) / (12 / month)).toFixed(2);
        document.querySelector(".interest").innerText = interest;
        document.querySelector(".loan_interest_cents input").value = interest * 100;
        document.querySelector(".loan_collateral_cents input").value = amount * 2;
      };
    });
  });
};

export { initCollat };