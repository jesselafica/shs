// Initialize variables
let oneBox = false;

// Inputs
const apis    = document.getElementById("api");
const polds   = document.getElementById("pold");
const ssrs    = document.getElementById("ssr");
const recircs = document.getElementById("recirc");

//Buttons
// const submitBtn = document.getElementById("submit_button");
//       submitBtn.addEventListener('click', calcPack, false);
const resetBtn  = document.getElementById("reset_button");
const form      = document.getElementById("pack_form");
form.addEventListener('submit', calcPack, false);

// Message
const message = document.getElementById("message");

// before continuing with conditionals for 13 single shipper scenarios

const scenarios = [
  {
    api    : 0,
    pold   : 18,
    ssr    : 0,
    recirc : 1
  },
  {
    api    : 1,
    pold   : 18,
    ssr    : 0,
    recirc : 0
  },
  {
    api    : 1,
    pold   : 1,
    ssr    : 2,
    recirc : 3
  },
  {
    api    : 1,
    pold   : 13,
    ssr    : 0,
    recirc : 1
  },
  {
    api    : 1,
    pold   : 12,
    ssr    : 2,
    recirc : 1
  },
  {
    api    : 2,
    pold   : 13,
    ssr    : 0,
    recirc : 0
  },
  {
    api    : 2,
    pold   : 0,
    ssr    : 0,
    recirc : 3
  },
  {
    api    : 3,
    pold   : 0,
    ssr    : 0,
    recirc : 2
  },
  {
    api    : 3,
    pold   : 7,
    ssr    : 0,
    recirc : 1
  },
  {
    api    : 3,
    pold   : 10,
    ssr    : 0,
    recirc : 0
  },
  {
    api    : 4,
    pold   : 0,
    ssr    : 0,
    recirc : 2
  },
  {
    api    : 6,
    pold   : 0,
    ssr    : 0,
    recirc : 1
  },
  {
    api    : 7,
    pold   : 0,
    ssr    : 0,
    recirc : 0
  }
];


// Declare functions
function calcPack(e) {
  // reinit vars and vals
  e.preventDefault();
  const formValsObj = {};
  oneBox = false;

  formValsObj.apis = parseInt(apis.value);
  formValsObj.polds = parseInt(polds.value);
  formValsObj.ssrs = parseInt(ssrs.value);
  formValsObj.recircs = parseInt(recircs.value);

  console.log(formValsObj);

  // convert SSRs and add them to POLDs

  // add ternary for conditional >max of each type to end function and return second shipper
}
