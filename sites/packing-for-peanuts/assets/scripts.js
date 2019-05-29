// Const Declarations
// Inputs
const apiInput    = document.getElementById('api'),
      poldInput   = document.getElementById('pold'),
      ssrInput    = document.getElementById('ssr'),
      recircInput = document.getElementById('recirc'),
      ldsSize     = document.getElementById('lds_size'),
      ldsSizeGroup= document.getElementsByClassName('lds-size')[0],
      juncBox     = document.getElementById('junc_box'),
      backflowBag = document.getElementById('backflow_bag'),
      ldsRadio    = document.getElementById('lds_radio'),
      poldRadio   = document.getElementById('pold_radio'),
      accessRadio = document.getElementById('accessories_radio'),
      ldsTypes    = document.getElementsByClassName('lds-type');
//Buttons
const resetBtn  = document.getElementById('reset_button');
resetBtn.addEventListener('click', resetForm, false);
const form      = document.getElementById('pack_form');
form.addEventListener('submit', calcPack, false);

// Message
// const message      = document.getElementById('message');
const modal      = document.getElementById('modal');
const modalBody  = document.getElementById('modal_body');
const modalTitle = document.getElementById('modal_title');
const radioBtns = document.getElementsByClassName('radio-btn');
// add eventListeners to radioBtns for input disabling
for (var i = 0; i < radioBtns.length; i++) {
  radioBtns[i].addEventListener('click', disableRadios, false);
}

// Declare functions
function calcPack(e) {
  // Reinit vars and vals
  e.preventDefault();

  const formValsObj = {};
  let boxCount = 0;
  // let oneBox        = false;
  // let twoBox        = false;
  let shipperSize   = '';

  // create formValsObj from inputs
  formValsObj.api     = parseInt(apiInput.value);
  formValsObj.pold    = parseInt(poldInput.value);
  formValsObj.ssr     = parseInt(ssrInput.value);
  formValsObj.recirc  = parseInt(recircInput.value);
  formValsObj.ldsSize = parseInt(ldsSize.value);
  formValsObj.poldSsr = parseInt(formValsObj.pold + (formValsObj.ssr / 2));
  // calculate shipper size
  shipperCalc();

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
            // loop through ldsScenarios test if oneBox = true
            let boxCount = 0;
              let scenArrInd = {remainder : null, boxed : false};
              // first conditional for ldsScenarios
              for (let i = 0; i < ldsScenarios.length; i++) {
                let formValsRem = 0, apiSum = 0, poldSsrSum = 0, recircSum = 0;
                if (formValsObj.ldsSize <= ldsScenarios[i].ldsSize) {
                  if (formValsObj.api > 0) {apiSum = formValsObj.api - ldsScenarios[i].api;}
                  if (formValsObj.poldSsr > 0) {poldSsrSum = formValsObj.poldSsr - ldsScenarios[i].poldSsr;}
                  if (formValsObj.recirc > 0) {recircSum = formValsObj.recirc - ldsScenarios[i].recirc;}
                  (formValsObj.api <= 0 ? formValsRem += 0 : formValsRem += apiSum);
                  (formValsObj.poldSsr <= 0 ? formValsRem += 0 : formValsRem += poldSsrSum);
                  (formValsObj.recirc <= 0 ? formValsRem += 0 : formValsRem += recircSum);
                  if (formValsRem < scenArrInd.remainder || scenArrInd.remainder === null) {
                    scenArrInd.remainder = parseInt(formValsRem);
                    scenArrInd.box1 = ldsScenarios[i];
                    console.log(scenArrInd);
                  }
                  if (formValsRem <= 0) {
                    scenArrInd.boxed = true;
                    boxCount = 1;
                    console.log('shipped!');
                  }
                }
              }
              // box up remainder 

            // oneBox = ldsFunc();
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
                    return oneBox = true;
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

              // shipperSize calculator
              function shipperCalc() {
                for (let i = 0; i < ldsTypes.length; i++) {
                  let radioClasses = ldsTypes[i].classList;
                  for (let c = 0; c < radioClasses.length; c++) {
                    if (radioClasses[c] === 'active') {
                      if (ldsTypes[i].getAttribute('id') === 'lds_radio') {
                        return shipperSize = (formValsObj.ldsSize < 200) ? '19 x 12 x 7' : '14 x 14 x 14';
                      } else {
                        return shipperSize = '13 x 10 x 5';
                      }
                      console.log(shipperSize);
                      break;
                    }
                  }
                }
              }
            } // End calcPack


            // Disables/enables ldsSize select and juncBox inputs based on type_radios
            function disableRadios(){
              // set delay to allow .active to be added to clicked el before code is run
              setTimeout(function(){
                if (isChecked(accessRadio)) {
                  $(ldsSizeGroup).hide("blind");
                  // ldsSizeGroup.classList.add('d-none');
                  $(juncBox).show("blind");
                  // juncBox.classList.remove('d-none');
                  $(backflowBag).show("blind");
                  // backflowBag.classList.remove('d-none');
                } else if(isChecked(poldRadio)){
                  $(ldsSizeGroup).hide("blind");
                  // ldsSizeGroup.classList.add('d-none');
                  ldsSizeGroup.classList.remove('active');
                  $(juncBox).hide("blind");
                  // juncBox.classList.add('d-none');
                  juncBox.classList.remove('active');
                  $(backflowBag).hide("blind");
                  // backflowBag.classList.add('d-none');
                  backflowBag.classList.remove('active');
                } else if(isChecked(ldsRadio)){
                  // ldsSizeGroup.classList.remove('d-none');
                  $(ldsSizeGroup).show("blind");
                  // juncBox.classList.remove('d-none');
                  $(juncBox).show("blind");
                  // backflowBag.classList.remove('d-none');
                  $(backflowBag).show("blind");
                }
              }, 1);
            }

            // Reset form
            function resetForm(){
              // remove active class from all inputs
              for(let i = 0; i < radioBtns.length; i++){
                radioBtns[i].classList.remove('active');
              }
              // make ldsRadio active
              ldsRadio.classList.add('active');
              disableRadios();
            }

            // test hasClass return boolean
            function isChecked (el) {return $(el).hasClass('active');}

            // tool check scenario object poldSsr count
            // function checkPoldSsr(scenArray){
            //   scenArray.forEach((scenario, ind) => {
            //     return((scenario.pold + (scenario.ssr / 2)) === scenario.poldSsr) ? console.log(ind + ' correct') : console.log('Check scenario at index ' + ind);
            //   });
            // };
            // Scenario array objects
            const ldsScenarios  = [
              // START SM SHIPPER
              {
                api     : 0,
                pold    : 18,
                ssr     : 0,
                poldSsr : 18,
                recirc  : 0,
                ldsSize: 150
              },
              {
                api     : 1,
                pold    : 14,
                ssr     : 0,
                poldSsr : 14,
                recirc  : 1,
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
                recirc  : 2,
                ldsSize: 150
              },
              {
                api     : 3,
                pold    : 5,
                ssr     : 0,
                poldSsr : 5,
                recirc  : 1,
                ldsSize: 150
              },
              {
                api    : 4,
                pold   : 0,
                ssr    : 0,
                poldSsr: 0,
                recirc : 1,
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
