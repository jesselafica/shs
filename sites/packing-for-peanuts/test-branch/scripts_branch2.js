// Initialize variables
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
// Scenario array objects
const ldsScenarios  = [
// START SM SHIPPER
  {
    api     : 0,
    pold    : 18,
    ssr     : 0,
    poldSsr : 18,
    recirc  : 1,
    ldsSize: 150
  },
  {
    api     : 1,
    pold    : 18,
    ssr     : 0,
    poldSsr : 18,
    recirc  : 0,
    ldsSize: 150
  },
  {
    api     : 1,
    pold    : 1,
    ssr     : 2,
    poldSsr : 3,
    recirc  : 3,
    ldsSize: 150
  },
  {
    api     : 1,
    pold    : 13,
    ssr     : 0,
    poldSsr : 13,
    recirc  : 1,
    ldsSize: 150
  },
  {
    api     : 1,
    pold    : 12,
    ssr     : 2,
    poldSsr : 14,
    recirc  : 1,
    ldsSize: 150
  },
  {
    api     : 2,
    pold    : 13,
    ssr     : 0,
    poldSsr : 13,
    recirc  : 0,
    ldsSize: 150
  },
  {
    api     : 2,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 3,
    ldsSize: 150
  },
  {
    api     : 3,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 2,
    ldsSize: 150
  },
  {
    api     : 3,
    pold    : 7,
    ssr     : 0,
    poldSsr : 7,
    recirc  : 1,
    ldsSize: 150
  },
  {
    api     : 3,
    pold    : 10,
    ssr     : 0,
    poldSsr : 10,
    recirc  : 0,
    ldsSize: 150
  },
  {
    api    : 4,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 2,
    ldsSize: 150
  },
  {
    api    : 6,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 1,
    ldsSize: 150
  },
  {
    api    : 7,
    pold   : 0,
    ssr    : 0,
    poldSsr: 0,
    recirc : 0,
    ldsSize: 150
  },
// END SM SHIPPER
// START BROWN BOX
{
  api     : 2,
  pold    : 0,
  ssr     : 0,
  poldSsr : 0,
  recirc  : 2,
  ldsSize : 200
},
{
  api     : 1,
  pold    : 2,
  ssr     : 0,
  poldSsr : 2,
  recirc  : 2,
  ldsSize : 200
},
{
  api     : 0,
  pold    : 4,
  ssr     : 0,
  poldSsr : 4,
  recirc  : 2,
  ldsSize : 200
}
// END BROWN BOX
];
const poldScenarios = [
  {
    api     : 3,
    pold    : 0,
    ssr     : 0,
    poldSsr : 0,
    recirc  : 3
  },
  {
    api     : 0,
    pold    : 0,
    ssr     : 2,
    poldSsr : 1,
    recirc  : 5
  },
  {
    api     : 6,
    pold    : 0,
    ssr     : 2,
    poldSsr : 1,
    recirc  : 0
  },
  {
    api     : 2,
    pold    : 2,
    ssr     : 2,
    poldSsr : 3,
    recirc  : 3
  },
  {
    api     : 1,
    pold    : 4,
    ssr     : 2,
    poldSsr : 5,
    recirc  : 3
  },
  {
    api     : 0,
    pold    : 6,
    ssr     : 2,
    poldSsr : 7,
    recirc  : 3
  },
  {
    api     : 0,
    pold    : 15,
    ssr     : 2,
    poldSsr : 16,
    recirc  : 2
  },
  {
    api     : 0,
    pold    : 22,
    ssr     : 2,
    poldSsr : 23,
    recirc  : 0
  },
  {
    api     : 2,
    pold    : 14,
    ssr     : 2,
    poldSsr : 15,
    recirc  : 0
  },
  {
    api     : 1,
    pold    : 18,
    ssr     : 2,
    poldSsr : 19,
    recirc  : 0
  },
  {
    api     : 3,
    pold    : 12,
    ssr     : 2,
    poldSsr : 13,
    recirc  : 0
  },
  {
    api     : 4,
    pold    : 8,
    ssr     : 2,
    poldSsr : 9,
    recirc  : 0
  },
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

  const formValsObj = {
    index:  0,
    remain: 0
  };

  let shipperSize = "";
  let oneBox      = false;
  let remainIndObj  = {};

// create formValsObj from inputs
  formValsObj.api     = parseInt(apis.value);
  formValsObj.pold    = parseInt(polds.value);
  formValsObj.ssr     = parseInt(ssrs.value);
  formValsObj.recirc  = parseInt(recircs.value);
  formValsObj.ldsSize = parseInt(ldsSize.value);
  formValsObj.poldSsr = parseInt(formValsObj.pold + (formValsObj.ssr / 2));

// loop through ldsScenarios test if oneBox = true
  for (var i = 0; i < ldsScenarios.length; i++) {
    if (formValsObj.api        <= ldsScenarios[i].api
     && formValsObj.poldSsr    <= ldsScenarios[i].poldSsr
     && formValsObj.recirc     <= ldsScenarios[i].recirc
     && formValsObj.ldsSize    <= ldsScenarios[i].ldsSize)
    {
    console.log("Matched!", [i]);
    shipperSize = (formValsObj.ldsSize < 200) ? "19 x 12 x 7" : "14 x 14 x 14";
    message.innerHTML = "One box required:<br>" + shipperSize;
    return oneBox = true;
    break;
    }
};
  if (!oneBox) {
      message.innerHTML = "Please call the Warehouse for assistance."
      ldsScenarios.forEach((scenario, ind) =>{
        let indexRemain   = 0;
        let apiRemain     = calcRemain(api);
        let poldSsrRemain = calcRemain(poldSsr);
        let recircRemain  = calcRemain(recirc);
        if((!apiRemain &&
          !poldSsrRemain &&
          !recircRemain)
          ((remainIndObj === {}) || indexRemain < remainIndObj.remainder))
           {
            remainIndObj.remainder = indexRemain;
            remainIndObj.index     = ind;
            console.log("Match at index " + ind + "\n with remainder of " + indexRemain);
        }
        function calcRemain (key) {
          let remainder = parseInt(formValsObj.key - scenario.key);
          if(formValsObj.key > scenario.key){
            indexRemain += remainder;
            return true;
          } else { return false; }
        }

        // let negVal        = false;
        // let apiRemain     = 0;
        // let poldSsrRemain = 0;
        // let recircRemain  = 0;
        // need ternary to test whether NaN
          // apiRemain     = (formValsObj.api < scenario.api) ? formValsObj.api - scenario.api : negVal = true;
          // poldSsrRemain = (formValsObj.poldSsr < scenario.poldSsr) ? formValsObj.poldSsr - scenario.poldSsr : negVal = true;
          // recircRemain  = (formValsObj.recirc < scenario.recirc) ? formValsObj.recirc - scenario.recirc : negVal = true;
          //
          // let indexRemain   = apiRemain + poldSsrRemain + recircRemain;
          // // test for smallest remainder against remainIndObj
          // if ((!negVal) && ((indexRemain <= remainIndObj.remain) || (!remainIndObj.remain))) {
          //   remainIndObj.remain = indexRemain;
          //   remainIndObj.ind    = ind;
          //   console.log("Index : " + remainIndObj.ind +
          //            "\n Remainder : " + remainIndObj.remain)
          // }
          // track what is remaining to be packaged in POLD box!

          // console.log("Scenario at index " + ind + "\n" + apiMod + "\n" + poldSsrMod + "\n" + recircMod + "\n" );

        });
    }

  }
      // create scenarioRemainder{} {remainder : 0, index: =ind}
      // loop through scenario[]
      // += each remainder to a temporary variable (tempRemainder) (i.e. formValsObj.api - scenario.api, etc.)
      // if tempRemainder is < scenarioRemainder.tempRemainder
      // -->then scenarioRemainder.remainder = tempRemainder & add scenario index to scenarioRemainder.scenario
    // find scenario with smallest % (modulo) && >= all scenario.keys (not <)
    // subtract scenario.keys from formValsObj.keys
    // divide remaining formValsObj.keys values into poldScenario.keys until all formValsObj.keys <= poldScenario.keys
    // round up number of times remaining formValsObj divided into poldScenario to determine # of boxes required to ship


// tool check scenario object poldSsr count
function checkPoldSsr(scenArray){
  scenArray.forEach((scenario, ind) => {
    return((scenario.pold + (scenario.ssr / 2)) === scenario.poldSsr) ? console.log(ind + " correct") : console.log("Check scenario at index " + ind);
  });
};
