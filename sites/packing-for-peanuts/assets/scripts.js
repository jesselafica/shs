// Initialize variables
// Inputs
const apiInput    = document.getElementById("api");
const poldInput   = document.getElementById("pold");
const ssrInput    = document.getElementById("ssr");
const recircInput = document.getElementById("recirc");
const ldsSize     = document.getElementById("lds_size");
//Buttons
const resetBtn  = document.getElementById("reset_button");
const form      = document.getElementById("pack_form");
form.addEventListener('submit', calcPack, false);

// Message
// const message      = document.getElementById("message");
const modal      = document.getElementById("modal");
const modalBody  = document.getElementById("modal_body");
const modalTitle = document.getElementById("modal_title");

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

  const formValsObj = {};

  let poldOnly    = false;
  let shipperSize = "";
  let oneBox      = false;
  let twoBox      = false;

  // create formValsObj from inputs
  formValsObj.api     = parseInt(apiInput.value);
  formValsObj.pold    = parseInt(poldInput.value);
  formValsObj.ssr     = parseInt(ssrInput.value);
  formValsObj.recirc  = parseInt(recircInput.value);
  formValsObj.ldsSize = parseInt(ldsSize.value);
  formValsObj.poldSsr = parseInt(formValsObj.pold + (formValsObj.ssr / 2));

  // check if lds or poldOnly
  poldOnly = (formValsObj.ldsSize === 9000) ? true : false;

  if (poldOnly) {
    shipperSize = "13 x 10 x 5";
    // for loop --> check if <= poldScenarios.key
    for (var i = 0; i < poldScenarios.length && oneBox === false; i++) {
      if(formValsObj.api      <= poldScenarios[i].api
      && formValsObj.poldSsr  <= poldScenarios[i].poldSsr - 2
      && formValsObj.recirc   <= poldScenarios[i].recirc){
        oneBox = true;
        break;
      }
    }
    if (!oneBox) {
      // loop through pold scenarios test if twoBox = true
          for(var i = 0; i < poldScenarios.length && twoBox === false; i++){
            for(var c = 0; c < poldScenarios.length && twoBox === false; c++){
              if(formValsObj.api      <= poldScenarios[i].api + poldScenarios[c].api
              && formValsObj.poldSsr  <= (poldScenarios[i].poldSsr - 2) + poldScenarios[c].poldSsr
              && formValsObj.recirc   <= poldScenarios[i].recirc + poldScenarios[c].recirc){
                twoBox = true;
                break;
              }
            }
          }
    }
    // && <= (poldScenarios.poldSsr - 2)
    // set oneBox value
  } else if (!poldOnly){
    shipperSize = (formValsObj.ldsSize < 200) ? "19 x 12 x 7" : "14 x 14 x 14";
    oneBox = ldsBoxFunc();
  }

  // loop through ldsScenarios test if oneBox = true
  if (oneBox) {
    modalTitle.innerHTML = "One box required:";
    modalBody.innerHTML  = shipperSize;
  } else if (!oneBox) {
// loop through pold scenarios test if twoBox = true
    for(var i = 0; i < poldScenarios.length && twoBox === false; i++){
      for(var c = 0; c < ldsScenarios.length && twoBox === false; c++){
        if(formValsObj.api      <= poldScenarios[i].api + ldsScenarios[c].api
        && formValsObj.poldSsr  <= poldScenarios[i].poldSsr + ldsScenarios[c].poldSsr
        && formValsObj.recirc   <= poldScenarios[i].recirc + ldsScenarios[c].recirc
        && formValsObj.ldsSize  <= ldsScenarios[c].ldsSize){
          twoBox = true;
          break;
        }
      }
    }
    if (twoBox) {
      modalTitle.innerHTML = "Two boxes required:";
      modalBody.innerHTML  = shipperSize + "<br>" + "13 x 10 x 5";
    } else if (!twoBox){
      modalTitle.innerHTML = "Uh oh...";
      modalBody.innerHTML  = "Please call the Warehouse for assistance.";
    }

  }

  // Create ldsBoxFunc to use for loop through formValsObj <= ldsScenarios
  function ldsBoxFunc() {
    for (var i = 0; i < ldsScenarios.length; i++) {
      if (formValsObj.api       <= ldsScenarios[i].api
        && formValsObj.poldSsr  <= ldsScenarios[i].poldSsr
        && formValsObj.recirc   <= ldsScenarios[i].recirc
        && formValsObj.ldsSize  <= ldsScenarios[i].ldsSize)
        {
          return oneBox = true;
          break;
        }
      }
    } // End ldsBoxFunc

} // End calcPack

  // tool check scenario object poldSsr count
  function checkPoldSsr(scenArray){
    scenArray.forEach((scenario, ind) => {
      return((scenario.pold + (scenario.ssr / 2)) === scenario.poldSsr) ? console.log(ind + " correct") : console.log("Check scenario at index " + ind);
    });
  };
