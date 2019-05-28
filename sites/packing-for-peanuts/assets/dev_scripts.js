const ldsTypes = document.getElementsByClassName('lds-type');

function calcPack(e) {
// prevent default submit function
  e.preventDefault();
  // ===================================================
  // I N I T I A L I Z E - V A R I A B L E S
  // ===================================================
  const formValsObj = {};
  let oneBox        = false;
  let twoBox        = false;
  // create formValsObj from inputs
  formValsObj.api     = parseInt(apiInput.value);
  formValsObj.pold    = parseInt(poldInput.value);
  formValsObj.ssr     = parseInt(ssrInput.value);
  formValsObj.recirc  = parseInt(recircInput.value);
  formValsObj.ldsSize = parseInt(ldsSize.value);
  formValsObj.poldSsr = parseInt(formValsObj.pold + (formValsObj.ssr / 2));
  // determine shipper size based on lds type radio button
  let shipperSize   = '';
  let boxCount = 0;
  let scenArrInd = {remainder : 50, boxed : false};
  if (isChecked(ldsRadio)) {
    // first conditional for ldsScenarios
    for (let i = 0; i < ldsScenarios.length; i++) {
      let apiSum = 0;
      let poldSsrSum = 0;
      let recircSum = 0;
      let formValsRem = 0;
      if (formValsObj.ldsSize <= ldsScenarios[i].ldsSize) {
        if (formValsObj.api > 0) {apiSum = formValsObj.api - ldsScenarios[i].api;}
        if (formValsObj.poldSsr > 0) {poldSsrSum = formValsObj.poldSsr - ldsScenarios[i].poldSsr;}
        if (formValsObj.recirc > 0) {recircSum = formValsObj.recirc - ldsScenarios[i].recirc;}
        formValsRem = apiSum + poldSsrSum + recircSum;
        if (formValsRem < scenArrInd.remainder) {
          scenArrInd.remainder = formValsObj;
          scenArrInd.ind = [i];
          scenArrInd.boxed = true;
        }
      }
    }
    if (scenArrInd.boxed) {
      console.log(scenArrInd);
      console.log('shipped!');
    }
    }
    // second conditional for poldScenarios
    // continue with this loop until it passes

  }

// if (boxCount < 3) {
  // print required packaging
  // append junc box / backflow bag
// } else {
  // failed
  // call for assistance
// }


  const shipperCalc = () => {
    for (let i = 0; i < ldsTypes.length; i++) {
      let radioClasses = ldsTypes[i].classList;
      for (let c = 0; c < radioClasses.length; c++) {
        if (radioClasses[c] === 'active') {
          shipperSize = (ldsTypes[i].getAttribute('id') === 'lds_radio') ? '19 x 12 x 7' : '13 x 10 x 5';
          console.log(shipperSize);
          break;
        }
      }
    }
  function ldsLoop(){

  }
  }
  // ===================================================
  //
  // ===================================================
// use vanilla js for isChecked (copy for loop used for shipperSize)
// check which ldsTypes radio is active
// call unique function for that type
// setup counter for number of packages required
// if greater than 2 then return error message
// else proceed with appending juncBox/backflowBag packages

// for ldsRadio
// use nested conditional to loop through lds scenarios before going on to the pold scenarios

// loop through scenarios
// if the formValsObj.value is 0 then do not subtract the scenario.value from interval
// add up remainder
// if remainder < variable remainder then set the scenArrInd to the counter - 1 and update the variable remainder to the new value
}
