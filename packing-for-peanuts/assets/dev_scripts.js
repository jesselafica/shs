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
function Box(){
  this.api;
}
  // BOX COUNT 0 LOOP START
  let box0 = {};
  let loopScen;
  let creatingBox = true;
  for (let i = 0; i < ldsScenarios.length; i++) {
    let apiSum = 0, poldSsrSum = 0, recircSum = 0;
    if (formValsObj.ldsSize <= ldsScenarios[i].ldsSize) {
      if (formValsObj.api >= ldsScenarios[i]) {apiSum = formValsObj.api - ldsScenarios[i].api;}
      if (formValsObj.poldSsr >= ldsScenarios[i]) {poldSsrSum = formValsObj.poldSsr - ldsScenarios[i].poldSsr;}
      if (formValsObj.recirc >= ldsScenarios[i]) {recircSum = formValsObj.recirc - ldsScenarios[i].recirc;}
      (formValsObj.api <= 0 ? formValsObj.remainder += 0 : formValsObj.remainder += apiSum);
      (formValsObj.poldSsr <= 0 ? formValsObj.remainder += 0 : formValsObj.remainder += poldSsrSum);
      (formValsObj.recirc <= 0 ? formValsObj.remainder += 0 : formValsObj.remainder += recircSum);
      if (formValsObj.remainder < scenObj.remainder || scenObj.remainder === null) {
        // formValsObj.remainder = parseInt(formValsObj.remainder);
        loopScen = ldsScenarios[i];
      }

  //     if (formValsObj.remainder <= 0) {
  //       scenObj.boxed = true;
  //       scenObj.boxCount = 1;
  //       console.log('shipped!');
  //     }
    }
  }  // END LOOP
  // create a new box obj to subract formValsObj into
  while (creatingBox) {
    for (var i = 0; i < shipmentArr.length; i++) {
      if (!shipmentArr.box[i]) {
          shipmentArr.box[i];
          creatingBox = false;
          break;
      }
    }
  }
  // shipmentArr.push(scenObj.box1)
  // console.log(shipmentArr);
  // shipmentArr.forEach(function (arrItem){
  //   arrItem.api - 2;
  // });
  // box up remainder

// oneBox = ldsFunc();
if (isChecked(poldRadio)) {
  // P O L D - O N L Y - T E S T
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
          if(formValsObj.api     <= poldScenarios[i].api + poldScenarios[c].api
            && formValsObj.poldSsr <= (poldScenarios[i].poldSsr - 2) + poldScenarios[c].poldSsr
            && formValsObj.recirc  <= poldScenarios[i].recirc + poldScenarios[c].recirc){
              twoBox = true;
              break;
            }
          }
        }
      }
    } else if (isChecked(accessRadio)) {
      // A C C E S S O R I E S - O N L Y - T E S T
      // for loop --> check if <= poldScenarios.key
      for (var i = 0; i < poldScenarios.length && oneBox === false; i++) {
        if(formValsObj.api      <= poldScenarios[i].api
          && formValsObj.poldSsr  <= poldScenarios[i].poldSsr
          && formValsObj.recirc   <= poldScenarios[i].recirc){
            oneBox = true;
            break;
          }
        }
        if (!oneBox) {
          // loop through pold scenarios test if twoBox = true
          for(var i = 0; i < poldScenarios.length && twoBox === false; i++){
            for(var c = 0; c < poldScenarios.length && twoBox === false; c++){
              if(formValsObj.api     <= poldScenarios[i].api + poldScenarios[c].api
                && formValsObj.poldSsr <= (poldScenarios[i].poldSsr) + poldScenarios[c].poldSsr
                && formValsObj.recirc  <= poldScenarios[i].recirc + poldScenarios[c].recirc){
                  twoBox = true;
                  break;
                }
              }
            }
          }

        } else if (isChecked(ldsRadio)){
          // L D S - O N L Y - T E S T


        }
        if (oneBox) {
          if (isChecked(juncBox) && isChecked(backflowBag)) {
            modalTitle.innerHTML = 'Two boxes required:';
            modalBody.innerHTML  = shipperSize + '<br>16 x 12 x 8 (Junction Box + Backflow Bag)';
          } else if (isChecked(juncBox) || isChecked(backflowBag)) {
            modalTitle.innerHTML = 'Two boxes required:';
            modalBody.innerHTML  = (isChecked(juncBox)) ? shipperSize + '<br>16 x 12 x 8 (Junction Box)' : shipperSize + '<br>19 x 12 x 7 (Backflow Preventer Bag)';
          } else {
            modalTitle.innerHTML = 'One box required:';
            modalBody.innerHTML  = shipperSize;
          }
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
              if (isChecked(juncBox) && isChecked(backflowBag)) {
                modalTitle.innerHTML = 'Three boxes required:';
                modalBody.innerHTML  = shipperSize + '<br>13 x 10 x 5 (Accessories)<br>16 x 12 x 8 (Junction Box + Backflow Bag)';
              } else if (isChecked(juncBox) || isChecked(backflowBag)) {
                modalTitle.innerHTML = 'Three boxes required:';
                modalBody.innerHTML  = (isChecked(juncBox)) ? shipperSize + '<br>13 x 10 x 5 (Accessories)<br>16 x 12 x 8 (Junction Box)' : shipperSize + '<br>13 x 10 x 5 (Accessories)<br>19 x 12 x 7 (Backflow Preventer Bag)';
              } else {
                modalTitle.innerHTML = 'Two boxes required:';
                modalBody.innerHTML  = shipperSize + '<br>13 x 10 x 5 (Accessories)';
              }
            } else if (!twoBox){
              modalTitle.innerHTML = 'Call 760-884-3734';
              modalBody.innerHTML  = "We'd like to help with this one.";
            }

          }

          // Create ldsBoxFunc to use for loop through formValsObj <= ldsScenarios
          function ldsFunc() {
            for (var i = 0; i < ldsScenarios.length; i++) {
              if (formValsObj.api       <= ldsScenarios[i].api
                && formValsObj.poldSsr  <= ldsScenarios[i].poldSsr
                && formValsObj.recirc   <= ldsScenarios[i].recirc
                && formValsObj.ldsSize  <= ldsScenarios[i].ldsSize)
                {

                  break;
                }
              }
            } // End ldsFunc
          // Create poldFunc to use for loop through formValsObj <= poldScenarios
          function poldFunc() {
            for (var i = 0; i < poldScenarios.length; i++) {
              if (formValsObj.api       <= poldScenarios[i].api
                && formValsObj.poldSsr  <= poldScenarios[i].poldSsr - 2
                && formValsObj.recirc   <= poldScenarios[i].recirc)
                {
                  return oneBox = true;
                  break;
                }
              }
            } // End poldFunc
          // Create accessFunc to use for loop through formValsObj <= poldScenarios
          function accessFunc() {
            for (var i = 0; i < poldScenarios.length; i++) {
              if (formValsObj.api       <= poldScenarios[i].api
                && formValsObj.poldSsr  <= poldScenarios[i].poldSsr
                && formValsObj.recirc   <= poldScenarios[i].recirc)
                {
                  return oneBox = true;
                  break;
                }
              }
            } // End ldsFunc





// ===========================================================================================
// J U N E - 3 - 2 0 1 9
// ===========================================================================================
            // loop through ldsScenarios until formValsObj.remainder = 0
            ldsScenarios.forEach((scenario, ind) => {
              let apiSub = 0, poldSsrSub = 0, recircSub = 0;
              let scenRemainder = apiSub + poldSsrSub + recircSub;
              let scenObj = {};
              scenObj.api = parseInt(scenario.api);
              scenObj.poldSsr = parseInt(scenario.poldSsr);
              scenObj.recirc = parseInt(scenario.recirc);
              scenObj.ldsSize = parseInt(scenario.ldsSize);
              if (shipmentArr.length === 0 && formValsObj.ldsSize <= scenObj.ldsSize) {
                for (var key in scenObj) {
                    if (scenObj.hasOwnProperty(key)) {
                        scenObj[key] = (formValsObj[key] <= scenObj[key]) ? formValsObj[key] : scenObj[key];
                      }
                    }
                scenObj.remainder = 0;
                scenObj.remainder += formValsObj.api - scenObj.api;
                scenObj.remainder += formValsObj.poldSsr - scenObj.poldSsr;
                scenObj.remainder += formValsObj.recirc - scenObj.recirc;
                // scenObj.remainder += (formValsObj.api > scenObj.api) ? formValsObj.api - scenObj.api : 0;
                // scenObj.remainder += (formValsObj.poldSsr > scenObj.poldSsr) ? formValsObj.poldSsr - scenObj.poldSsr : 0;
                // scenObj.remainder += (formValsObj.recirc > scenObj.recirc) ? formValsObj.recirc - scenObj.recirc : 0;
                shipmentArr.push(scenObj);
                console.log(shipmentArr);
                console.log(formValsObj);
              } else if (formValsObj.ldsSize <= scenario.ldsSize){
                // keep saving ldsScenarios[i] with lowest remainder with shipmentArr.push() & shipmentArr.pop()
                for (var key in scenObj) {
                  if (scenObj.hasOwnProperty(key)) {
                    scenObj[key] = (formValsObj[key] <= scenObj[key]) ? formValsObj[key] : scenObj[key];
                  }
                }
                scenObj.remainder = 0;
                scenObj.remainder += formValsObj.api - scenObj.api;
                scenObj.remainder += formValsObj.poldSsr - scenObj.poldSsr;
                scenObj.remainder += formValsObj.recirc - scenObj.recirc;
                if (scenObj.remainder < shipmentArr[0].remainder) {
                  shipmentArr.pop();
                  shipmentArr.push(scenObj);
                  console.log(shipmentArr);
                }
              }

            });
            // for (let i = 0; i < ldsScenarios.length; i++) {
            //   ldsScenarios[i]
            // }
            // then shipmentArr[0].key = (formValsObj.key <= shipmentArr[0].key) ? formValsObj.key : shipmentArr[0].key;
            // then formValsObj.key = (formValsObj.key >= shipmentArr[0].key) ? formValsObj.key - shipmentArr[0].key : formValsObj.key;
            // if it succeeds i.e. formValsObj.remainder <= 0;
            // calculate single package weight based on accessories and ldsSize
            // if it fails
            // loop through poldScenarios with lowest remainder with shipmentArr.push() & shipmentArr.pop()
            // repeating all steps until formValsObj.remainder = 0
            // if shipmentArr.length > 2
            // return error message to user
