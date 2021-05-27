const initToggle = () => {
  if (document.getElementById('fieldset1')) {
    document.querySelectorAll(".choice-toggle").forEach((choice) => {
      choice.addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector(".choice-toggle.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
        // update de Interets et APR
        let month = document.querySelector(".choice-toggle.selected input").value;
        let amount = document.querySelector(".loan_amount_cents input").value;
        if (document.querySelector(".choice-toggle2.selected input").value === "25") {
          let apr = 100/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
        } else if (document.querySelector(".choice-toggle2.selected input").value === "33") {
          let apr = 695/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
        } else if (document.querySelector(".choice-toggle2.selected input").value === "50") {
          let apr = 895/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
          let interest = ((amount * apr) / (12 / month)).toFixed(2);
          document.querySelector(".interest").innerText = interest;
        };
      });
    });
  };
  if (document.getElementById('fieldset2')) {
    document.querySelectorAll(".choice-toggle2").forEach((choice) => {
      choice.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(".choice-toggle2.selected input").removeAttribute("checked");
        document.querySelector(".choice-toggle2.selected").classList.remove("selected");
        choice.classList.toggle("selected");
        choice.querySelector("input").setAttribute("checked", "");
        // update du collateral selon emprunt
        // update de Interets et APR
        let lvt = document.querySelector(".choice-toggle2.selected input").value;
        let amount = document.querySelector(".loan_amount_cents input").value;

        let apr = 0;
        if (lvt === "25") {
          apr = 100/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);          
        } else if (lvt === "33") {
          apr = 695/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
        } else if (lvt === "50") {
          apr = 895/10000;
          document.querySelector(".apr").innerText = (apr * 100).toFixed(2);
        };
        if (document.querySelector(".choice-toggle.selected input").value === "6") {
          document.querySelector(".interest").innerText = ((amount * apr) / 2).toFixed(2);
          document.querySelector(".interest-rate").innerText = (((amount * apr) / 2).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "12") {
          document.querySelector(".interest").innerText = (amount * apr).toFixed(2);
          document.querySelector(".interest-rate").innerText = (((amount * apr)).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "24") {
          document.querySelector(".interest").innerText = ((amount * apr) / (12 / 24)).toFixed(2);
          document.querySelector(".interest-rate").innerText = (((amount * apr) / (12 / 24)).toFixed(2)) * 100
        } else if (document.querySelector(".choice-toggle.selected input").value === "36") {
          document.querySelector(".interest").innerText = ((amount * apr) / (12 / 36)).toFixed(2);
          document.querySelector(".interest-rate").innerText = (((amount * apr) / (12 / 36)).toFixed(2)) * 100
          
        };  
      });
    });
  };
  
};

export { initToggle };
