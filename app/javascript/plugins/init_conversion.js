const initConversion = () => {
  document.querySelectorAll(".contener").forEach((choice) => {
    choice.addEventListener("change", function(event) {
      event.preventDefault();
      
    });
  });
};

export {initConversion}