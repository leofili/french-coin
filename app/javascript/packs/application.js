// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require("particles.js")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import { initToggle } from "../plugins/init_toggle";
import { initTabsClick } from "../plugins/init_tabs_click";
import { initCollat } from "../plugins/init_collat";
import { initConversion } from "../plugins/init_conversion";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  initToggle();
  initCollat();
  initConversion();
  initTabsClick();

    particlesJS("particles-js", {
      "particles": {
      "number": {
      "value": 80,
      "density": {
      "enable": true,
        "value_area": 700
      }
    },
    "color": {
      "value": "#001E96"
    },
    "shape": {
      "type": "circle",
      "stroke": {
      "width": 0,
        "color": "#F4F4F4"
      },
      "polygon": {
      "nb_sides": 5
      },
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
      "enable": false,
      "speed": 0.1,
      "opacity_min": 0.1,
      "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
      "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#001E96",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
      "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
      "detect_on": "canvas",
    "events": {
      "onhover": {
      "enable": true,
        "mode": "grab"
      },
      "onclick": {
      "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
      "distance": 140,
        "line_linked": {
      "opacity": 1
        }
      },
      "bubble": {
      "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
      "distance": 200,
        "duration": 0.4
      },
      "push": {
      "particles_nb": 4
      },
      "remove": {
      "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});



});

import "controllers"
