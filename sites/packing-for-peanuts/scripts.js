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
    poldSsr: 18,
    recirc : 1
  },
  {
    api    : 1,
    pold   : 18,
    ssr    : 0,
    poldSsr: 18,
    recirc : 0
  },
  {
    api    : 1,
    pold   : 1,
    ssr    : 2,
    poldSsr: 3,
    recirc : 3
  },
  {
    api    : 1,
    pold   : 13,
    ssr    : 0,
    poldSsr: 13,
    recirc : 1
  },
  {
    api    : 1,
    pold   : 12,
    ssr    : 2,
    poldSsr: 14,
    recirc : 1
  },
  {
    api    : 2,
    pold   : 13,
    ssr    : 0,
    poldSsr: 13,
    recirc : 0
  },
  {
    api    : 2,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 3
  },
  {
    api    : 3,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 2
  },
  {
    api    : 3,
    pold   : 7,
    ssr    : 0,
    poldSsr: 7,
    recirc : 1
  },
  {
    api    : 3,
    pold   : 10,
    ssr    : 0,
    poldSsr: 10,
    recirc : 0
  },
  {
    api    : 4,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 2
  },
  {
    api    : 6,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 1
  },
  {
    api    : 7,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 0
  }
];


function checkpoldSsr(){
  scenarios.forEach((scenario, ind) => {
    return((scenario.pold + scenario.ssr) === scenario.poldSsr) ? console.log(ind + " correct") : console.log(ind + "ERROR " + scenario.value);
  });
};
// Declare functions
function calcPack(e) {
  // reinit vars and vals
  e.preventDefault();
  const formValsObj = {};
  oneBox = false;

  formValsObj.api    = parseInt(apis.value);
  formValsObj.pold   = parseInt(polds.value);
  formValsObj.ssr    = parseInt(ssrs.value);
  formValsObj.recirc = parseInt(recircs.value);

  // add polds and ssrs together in new key
  formValsObj.poldSsr = formValsObj.pold + (formValsObj.ssr / 2);

  // Add Ssrs to pold key instead of creating key value pair
  // formValsObj.pold += (formValsObj.ssr / 2);


  scenarios.forEach((scenario, ind) => {
    if (formValsObj.api        <= scenario.api
     && formValsObj.poldSsr    <= scenario.poldSsr
     && formValsObj.recirc     <= scenario.recirc ) {
       console.log("Matched!", ind);
       message.innerHTML = "One small shipper required!";
       return oneBox = true;
    }
  });
  if (!oneBox){
    message.innerHTML = "Please call the Warehouse for assistance."
  }
    scenarios.forEach((scenario, ind) =>{

    });
    // find scenario with smallest % (modulo) && >= all scenario.keys (not <)
    // subtract scenario.keys from formValsObj.keys
    // divide remaining formValsObj.keys values into poldScenario.keys until all formValsObj.keys <= poldScenario.keys
    // round up number of times remaining formValsObj divided into poldScenario to determine # of boxes required to ship



  console.log(formValsObj);

  // convert SSRs and add them to POLDs

  // add ternary for conditional >max of each type to end function and return second shipper
}
