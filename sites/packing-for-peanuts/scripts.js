// Initialize variables
let oneBox = false;

// Inputs
const apis    = document.querySelector("#api");
const polds   = document.querySelector("#pold");
const ssrs    = document.querySelector("#ssr");
const recircs = document.querySelector("#recirc");

//Buttons
const submitBtn = document.querySelector("#submit_button");
      submitBtn.addEventListener('click', calcPack);
const resetBtn = document.querySelector("#reset_button");

// Message
const message = document.querySelector("#message");

// Declare functions

function calcPack() {
  // reinit vars and vals
  oneBox = false;

  apis.value;
  polds.value;
  ssrs.value;
  recircs.value;

  // convert SSRs and add them to POLDs

  // add ternary for conditional >max of each type to end function and return second shipper
  // before continuing with conditionals for 13 single shipper scenarios

  const oScenario1 = {
    api    : 0,
    pold   : 18,
    ssr    : 0,
    recirc : 1
  };
  const oScenario2 = {
    api    : 1,
    pold   : 18,
    ssr    : 0,
    recirc : 0
  };
  const oScenario3 = {
    api    : 1,
    pold   : 1,
    ssr    : 2,
    recirc : 3
  };
  const oScenario4 = {
    api    : 1,
    pold   : 13,
    ssr    : 0,
    recirc : 1
  };
  const oScenario5 = {
    api    : 1,
    pold   : 12,
    ssr    : 2,
    recirc : 1
  };
  const oScenario6 = {
    api    : 2,
    pold   : 13,
    ssr    : 0,
    recirc : 0
  };
  const oScenario7 = {
    api    : 2,
    pold   : 0,
    ssr    : 0,
    recirc : 3
  };
  const oScenario8 = {
    api    : 3,
    pold   : 0,
    ssr    : 0,
    recirc : 2
  };
  const oScenario9 = {
    api    : 3,
    pold   : 7,
    ssr    : 0,
    recirc : 1
  };
  const oScenario10 = {
    api    : 3,
    pold   : 10,
    ssr    : 0,
    recirc : 0
  };
  const oScenario11 = {
    api    : 4,
    pold   : 0,
    ssr    : 0,
    recirc : 2
  };
  const oScenario12 = {
    api    : 6,
    pold   : 0,
    ssr    : 0,
    recirc : 1
  };
  const oScenario13 = {
    api    : 7,
    pold   : 0,
    ssr    : 0,
    recirc : 0
  };

// Add event listenters to buttons
submitBtn.addEventListener('click', calcPack);
