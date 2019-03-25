// Initialize variables
// Inputs
const apiInput    = document.querySelector("#api");
const poldInput   = document.querySelector("#pold");
const ssrInput    = document.querySelector("#ssr");
const recircInput = document.querySelector("#recirc");

//Buttons
const submitBtn   = document.querySelector("#submit_button");
const resetBtn    = document.querySelector("#reset_button");

// Message
const message     = document.querySelector("#message");

// Add functions

function calcAccessories() {
  console.log(apiInput.value);
  console.log(poldInput.value);
  console.log(ssrInput.value);
  console.log(recircInput.value);
};

// Add event listenters to buttons
submitBtn.addEventListener('click', calcAccessories);
