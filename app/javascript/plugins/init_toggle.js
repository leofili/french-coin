const initToggle = () => {
  if (document.getElementById('fieldset1')) {
    document.querySelectorAll(".choice-toggle").forEach((choice) => {
      choice.addEventListener("click", function() {
        document.querySelector(".choice-toggle.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
        let month = document.querySelector(".choice-toggle.selected input").value;
        let amount = document.querySelector(".loan_amount_cents input").value;
        if (document.querySelector(".choice-toggle2.selected input").value === "25") {
          let apr = 100/10000;
          document.querySelector(".apr").innerText = apr * 100;
          document.querySelector(".interest").innerText = (amount * apr) / (12 / month);
        };
        if (document.querySelector(".choice-toggle2.selected input").value === "33") {
          let apr = 695;
          document.querySelector(".apr").innerText = apr / 100;
          document.querySelector(".interest").innerText = (amount * apr / 10000) / (12 / month);
        };
        if (document.querySelector(".choice-toggle2.selected input").value === "50") {
          let apr = 895/10000;
          document.querySelector(".apr").innerText = apr * 100;
          document.querySelector(".interest").innerText = (amount * apr) / (12 / month);
        };
      });
    });
  };
  if (document.getElementById('fieldset2')) {
    document.querySelectorAll(".choice-toggle2").forEach((choice) => {
      choice.addEventListener("click", function() {
        document.querySelector(".choice-toggle2.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle2.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
      });
    });
  };
  
};

export { initToggle }
