// Initialize variables
let oneBox = false;

// Inputs
const apis    = document.getElementById("api");
const polds   = document.getElementById("pold");
const ssrs    = document.getElementById("ssr");
const recircs = document.getElementById("recirc");
const ldsSize = document.getElementById("lds_size");
//Buttons
// const submitBtn = document.getElementById("submit_button");
//       submitBtn.addEventListener('click', calcPack, false);
const resetBtn  = document.getElementById("reset_button");
const form      = document.getElementById("pack_form");
form.addEventListener('submit', calcPack, false);

// Message
const message = document.getElementById("message");

// before continuing with conditionals for 13 single shipper scenarios

const shipperScenarios = [
  {
    api     : 0,
    pold    : 18,
    ssr     : 0,
    poldSsr : 18,
    recirc  : 1
  },
  {
    api     : 1,
    pold    : 18,
    ssr     : 0,
    poldSsr : 18,
    recirc  : 0
  },
  {
    api     : 1,
    pold    : 1,
    ssr     : 2,
    poldSsr : 3,
    recirc  : 3
  },
  {
    api     : 1,
    pold    : 13,
    ssr     : 0,
    poldSsr : 13,
    recirc  : 1
  },
  {
    api     : 1,
    pold    : 12,
    ssr     : 2,
    poldSsr : 14,
    recirc  : 1
  },
  {
    api     : 2,
    pold    : 13,
    ssr     : 0,
    poldSsr : 13,
    recirc  : 0
  },
  {
    api     : 2,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 3
  },
  {
    api     : 3,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 2
  },
  {
    api     : 3,
    pold    : 7,
    ssr     : 0,
    poldSsr : 7,
    recirc  : 1
  },
  {
    api     : 3,
    pold    : 10,
    ssr     : 0,
    poldSsr : 10,
    recirc  : 0
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

const poldScnarios = [
  {
    api     : 3,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 3
  }
  {
    api     : 0,
    pold    : 0,
    ssr     : 2,
    poldSsr : 1,
    recirc  : 5
  }
  {
    api     : 6,
    pold    : 0,
    ssr     : 2,
    poldSsr : 1,
    recirc  : 0
  }
  {
    api     : 2,
    pold    : 2,
    ssr     : 2,
    poldSsr : 3,
    recirc  : 3
  }
  {
    api     : 1,
    pold    : 4,
    ssr     : 2,
    poldSsr : 5,
    recirc  : 3
  }
  {
    api     : 0,
    pold    : 6,
    ssr     : 2,
    poldSsr : 7,
    recirc  : 3
  }
  {
    api     : 0,
    pold    : 15,
    ssr     : 2,
    poldSsr : 16,
    recirc  : 2
  }
  {
    api     : 0,
    pold    : 22,
    ssr     : 2,
    poldSsr : 23,
    recirc  : 0
  }
  {
    api     : 2,
    pold    : 14,
    ssr     : 2,
    poldSsr : 15,
    recirc  : 0
  }
  {
    api     : 1,
    pold    : 18,
    ssr     : 2,
    poldSsr : 19,
    recirc  : 0
  }
  {
    api     : 3,
    pold    : 12,
    ssr     : 2,
    poldSsr : 13,
    recirc  : 0
  }
  {
    api     : 4,
    pold    : 8,
    ssr     : 2,
    poldSsr : 9,
    recirc  : 0
  }
  {
    api     : 5,
    pold    : 4,
    ssr     : 2,
    poldSsr : 5,
    recirc  : 0
  }
];


// Declare functions
function calcPack(e) {
  // reinit vars and vals
  e.preventDefault();
  const formValsObj = {};
  oneBox = false;

  formValsObj.api     = parseInt(apis.value);
  formValsObj.pold    = parseInt(polds.value);
  formValsObj.ssr     = parseInt(ssrs.value);
  formValsObj.recirc  = parseInt(recircs.value);
  formValsObj.ldsSize = parseInt(ldsSize.value);

  // add polds and ssrs together in new key
  formValsObj.poldSsr = formValsObj.pold + (formValsObj.ssr / 2);



  shipperScenarios.forEach((scenario, ind) => {
    if (formValsObj.api        <= scenario.api
     && formValsObj.poldSsr    <= scenario.poldSsr
     && formValsObj.recirc     <= scenario.recirc ) {
       console.log("Matched!", ind);
       let shipperSize = (formValsObj.ldsSize < 200) ? "19 x 12 x 7" : "14 x 14 x 14";
       message.innerHTML = "One box required:<br>" + shipperSize;
       return oneBox = true;
    }
  });
  if (!oneBox){
    message.innerHTML = "Please call the Warehouse for assistance."
  }
    shipperScenarios.forEach((scenario, ind) =>{
      // create scenarioRemainder{} {remainder : 0, index: =ind}
      // loop through scenario[]
      // += each remainder to a temporary variable (tempRemainder) (i.e. formValsObj.api - scenario.api, etc.)
      // if tempRemainder is < scenarioRemainder.tempRemainder
      // -->then scenarioRemainder.remainder = tempRemainder & add scenario index to scenarioRemainder.scenario
    });
    // find scenario with smallest % (modulo) && >= all scenario.keys (not <)
    // subtract scenario.keys from formValsObj.keys
    // divide remaining formValsObj.keys values into poldScenario.keys until all formValsObj.keys <= poldScenario.keys
    // round up number of times remaining formValsObj divided into poldScenario to determine # of boxes required to ship

}

// tool check scenario object poldSsr count
// function checkpoldSsr(){
//   shipperScenarios.forEach((scenario, ind) => {
//     return((scenario.pold + scenario.ssr) === scenario.poldSsr) ? console.log(ind + " correct") : console.log(ind + "ERROR " + scenario.value);
//   });
// };
