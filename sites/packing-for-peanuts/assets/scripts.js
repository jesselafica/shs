// Const Declarations
// Inputs
const apiInput    = document.getElementById('api'),
poldInput   = document.getElementById('pold'),
ssrInput    = document.getElementById('ssr'),
recircInput = document.getElementById('recirc'),
ldsSize     = document.getElementById('lds_size'),
scvInput    = document.getElementById('scv'),
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
const modal = document.getElementById('modal'),
modalBody   = document.getElementById('modal_body'),
modalTitle  = document.getElementById('modal_title'),
radioBtns   = document.getElementsByClassName('radio-btn');
// add eventListeners to radioBtns for input disabling
for (var i = 0; i < radioBtns.length; i++) {
  radioBtns[i].addEventListener('click', disableRadios, false);
}

// B E G I N - C A L C - P A C K
function calcPack(e) {
  // Reinit vars and vals
  e.preventDefault();

  modalBody.innerHTML = "Please close this window and add items.";
  modalTitle.innerHTML = "Empty box?";
  let formValsObj = {};
  let shipmentArr = [];
  // const boxCount = shipmentArr.length;
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
  formValsObj.remainder = parseInt(formValsObj.api + formValsObj.poldSsr + formValsObj.recirc);
  // calculate shipper size
  shipperCalc();
  // if ldsRadio is checked and shipmentArr.length is 0
  if (isChecked(ldsRadio)) {
    firstPack(ldsScenarios);
    if (shipmentArr.length === 0) {
      secondPack(ldsScenarios);
    }
    shipmentArr[0].boxSize = (shipmentArr[0].ldsSize < 200) ? "19 x 12 x 7" : "14 x 14 x 14";
  }
  if (shipmentArr.length === 1) {
    shipmentArr[0] ={...formValsObj};
    calcWeight(shipmentArr[0]);
    modalTitle.innerHTML = 'Your Shipment Array:';
    modalBody.innerHTML = `${shipmentArr[0].boxSize} @ ${shipmentArr[0].weight}lbs LDS <br>`; 
  } else if (shipmentArr.length === 2) {
    // then if shipmentArr.length = 2
    // subtract formValsObj into shipmentArr[1] (poldScenario)
    if (shipmentArr[1].api >= formValsObj.api) {
      shipmentArr[1].api = Object.assign(formValsObj.api);
      formValsObj.api = 0;
    } else {
      formValsObj.api -= shipmentArr[1].api;
    }
    if (shipmentArr[1].recirc >= formValsObj.recirc) {
      shipmentArr[1].recirc = Object.assign(formValsObj.recirc);
      formValsObj.recirc = 0;
    } else {
      formValsObj.recirc -= shipmentArr[1].recirc;
    }
    if (shipmentArr[1].poldSsr >= formValsObj.poldSsr) {
      shipmentArr[1].poldSsr = Object.assign(formValsObj.poldSsr);
      formValsObj.poldSsr = 0;
    } else {
      formValsObj.poldSsr -= shipmentArr[1].poldSsr;
    }
    // calculate shipmentArr[1].weight
    calcWeight(shipmentArr[1]);
    // calculate shipmentArr[1].estCost
    // then subtract formValsObj into shipmentArr[0] (ldsScenario)
    shipmentArr[0] = {...formValsObj};
    // make shipmentArr.ldsSize always = formValsObj.ldsSize
    shipmentArr[0].poldSsr = Object.assign(formValsObj.poldSsr);
    // calculate shipmentArr[0].weight
    calcWeight(shipmentArr[0]);
    // calculate shipmentArr[0].estCost
    modalTitle.innerHTML = 'Your Shipment Array:';
    modalBody.innerHTML = `${shipmentArr[0].boxSize} @ ${shipmentArr[0].weight}lbs LDS <br> ${shipmentArr[1].boxSize} @ ${shipmentArr[1].weight}lbs Accessories<br>`;
  }

// if juncBox or backflowBag then push respective packaging and weight to shipmentArr
  if(isChecked(juncBox)){
    shipmentArr.push(juncBoxObj);
    modalBody.innerHTML += `${juncBoxObj.boxSize} @ ${juncBoxObj.weight}lbs Junction Box <br>`; 
  }
// C A L C - P A C K - F U N C T I O N S
  // firstPack
  function firstPack(scenarioArray) {
    for (let i = 0; i < scenarioArray.length && shipmentArr.length < 1; i++) {
      if ((isChecked(ldsRadio) && formValsObj.ldsSize  <= scenarioArray[i].ldsSize)
      || (isChecked(poldRadio) && formValsObj.poldSsr <= scenarioArray[i].poldSsr - 2)
      || (isChecked(accessRadio))) {
        if (formValsObj.api       <= scenarioArray[i].api
          && formValsObj.poldSsr  <= scenarioArray[i].poldSsr
          && formValsObj.recirc   <= scenarioArray[i].recirc)
          { 
            shipmentArr.push(formValsObj);
            // console.log("Packed!");
            // console.log(shipmentArr);
            break;
          }
        }
      }
    } // End firstPack
    // F I X - B E L O W
    // CONDITIONAL SHOULD MATCH firstPack + poldScenarios
    function secondPack(scenarioArray){
      for(let i = 0; i < poldScenarios.length && shipmentArr.length < 2; i++){
        for(let c = 0; c < scenarioArray.length && shipmentArr.length < 2; c++){
          if ((isChecked(ldsRadio) && formValsObj.ldsSize  <= scenarioArray[i].ldsSize)
          || (isChecked(poldRadio) && formValsObj.poldSsr <= scenarioArray[i].poldSsr + poldScenarios[c] - 2)
          || (isChecked(accessRadio))) {
            if (formValsObj.api      <= poldScenarios[i].api + scenarioArray[c].api
              && formValsObj.poldSsr  <= poldScenarios[i].poldSsr + scenarioArray[c].poldSsr
              && formValsObj.recirc   <= poldScenarios[i].recirc + scenarioArray[c].recirc) {
                shipmentArr.push(scenarioArray[c], poldScenarios[i]);
                // console.log("Packed!");
                // console.log(shipmentArr);
                break;
              }
            }
          }
        }
      }
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
      // shipmentArr[n].weight calculator
      function calcWeight(shipmentObj){
        shipmentObj.weight = 0;
        // + weight based on ldsSize
        switch (shipmentObj.ldsSize) {
          case 75:
            (scvInput.checked) ? shipmentObj.weight += 9.05 + 0.5 : shipmentObj.weight += 9.05;
            shipmentObj.boxSize = '19 x 12 x 7';
            break;
          case 100:
            (scvInput.checked) ? shipmentObj.weight += 9.95 + 0.75 : shipmentObj.weight += 9.95;
            shipmentObj.boxSize = '19 x 12 x 7';
            break;
          case 125:
            (scvInput.checked) ? shipmentObj.weight += 10.6 + 1.2 : shipmentObj.weight += 10.6;
            shipmentObj.boxSize = '19 x 12 x 7';
            break;
          case 150:
            (scvInput.checked) ? shipmentObj.weight += 12.2 + 1.6 : shipmentObj.weight += 12.2;
            shipmentObj.boxSize = '19 x 12 x 7';
            break;
          case 200:
            (scvInput.checked) ? shipmentObj.weight += 17.4 + 2.35: shipmentObj.weight += 17.4;
            shipmentObj.boxSize = '14 x 14 x 14'
            break;
          default:
            shipmentObj.weight += 0.75;
            shipmentObj.boxSize = '13 x 10 x 5';
        }
        // begin accessories calculation
        shipmentObj.weight += shipmentObj.api *  0.6;
        shipmentObj.weight += shipmentObj.pold * 0.2;
        shipmentObj.weight += shipmentObj.recirc * 0.8;
        shipmentObj.weight = Math.round(shipmentObj.weight);
      }
    } // E N D - C A L C - P A C K


    // Disables/enables ldsSize select and juncBox inputs based on type_radios
    function disableRadios(){
      // set delay to allow .active to be added to clicked el before code is run
      setTimeout(function(){
        if (isChecked(accessRadio)) {
          $(ldsSizeGroup).hide("blind");
          $(juncBox).show("blind");
          $(backflowBag).show("blind");
        } else if(isChecked(poldRadio)){
          $(ldsSizeGroup).hide("blind");
          ldsSizeGroup.classList.remove('active');
          $(juncBox).hide("blind");
          juncBox.classList.remove('active');
          $(backflowBag).hide("blind");
          backflowBag.classList.remove('active');
        } else if(isChecked(ldsRadio)){
          $(ldsSizeGroup).show("blind");
          $(juncBox).show("blind");
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
    function isChecked (el) {return el.classList.contains('active');}
    // el.contains instead of .hasClass

    // tool check scenario object poldSsr count
    function checkPoldSsr(scenArray){
      scenArray.forEach((scenario, ind) => {
        return((scenario.pold + (scenario.ssr / 2)) === scenario.poldSsr) ? console.log(ind + ' correct') : console.log('Check scenario at index ' + ind);
      });
    };
    // L D S - S C E N A R I O S - A R R A Y 
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
        poldSsr : 2,
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
        poldSsr : 13,
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
    // P O L D - S C E N A R I O S - A R R A Y
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
// J U N C - B O X - O B J E C T
const juncBoxObj = {
  boxSize: "14 x 14 x 14",
  weight: 5.45
};
// B A C K F L O W - B A G - O B J E C T
const backflowBagObj = {
  boxSize: "19 x 12 x 7",
  weight: 2
};