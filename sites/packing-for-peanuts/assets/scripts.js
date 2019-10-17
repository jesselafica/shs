// Const Declarations
// Inputs
const apiInput  = document.getElementById('api'),
  poldInput     = document.getElementById('pold'),
  ssrInput      = document.getElementById('ssr'),
  recircInput   = document.getElementById('recirc'),
  timerInput    = document.getElementById('timer'),
  ldsSize       = document.getElementById('lds_size'),
  scvInput      = document.getElementById('scv'),
  ldsSizeGroup  = document.getElementsByClassName('lds-size')[0],
  juncBox       = document.getElementById('junc_box'),
  backflowBag   = document.getElementById('backflow_bag'),
  ldsRadio      = document.getElementById('lds_radio'),
  poldRadio     = document.getElementById('pold_radio'),
  accessRadio   = document.getElementById('accessories_radio'),
  ldsTypes      = document.getElementsByClassName('lds-type');
//Buttons
const resetBtn = document.getElementById('reset_button');
      resetBtn.addEventListener('click', resetForm, false);
const submitBtn = document.getElementById('submit_button');
      submitBtn.addEventListener('click', calcPack, false);

// Message
// const message      = document.getElementById('message');
const modal   = document.getElementById('modal'),
  modalBody   = document.getElementById('modal_body'),
  modalTitle  = document.getElementById('modal_title'),
  radioBtns   = document.getElementsByClassName('radio-btn');
// add eventListeners to radioBtns for input disabling
for (var i = 0; i < radioBtns.length; i++) {
  radioBtns[i].addEventListener('click', disableRadios, false);
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// B E G I N - C A L C - P A C K
function calcPack(e) {
  // Reinit vars and vals
  e.preventDefault();

  modalBody.innerHTML = "Please close this window and add items.";
  modalTitle.innerHTML = "Empty box?";
  let formValsObj = {};
  let shipmentArr = [];
  // create formValsObj from inputs
  formValsObj.api     = parseInt(apiInput.value);
  formValsObj.pold    = parseInt(poldInput.value);
  formValsObj.ssr     = parseInt(ssrInput.value);
  formValsObj.recirc  = parseInt(recircInput.value) + parseInt(timerInput.value);
  console.log(formValsObj.recirc);
  
  if (poldRadio.checked || accessRadio.checked) {
    formValsObj.ldsSize = 0;
  } else {
    formValsObj.ldsSize = parseInt(ldsSize.value);
  }
  formValsObj.poldSsr = parseInt(formValsObj.pold + (formValsObj.ssr / 2));
  formValsObj.remainder = parseInt(formValsObj.api + formValsObj.poldSsr + formValsObj.recirc);
  // calculate shipper size
  shipperCalc();
  // *************************************************
  let checkedRadio = checkRadios();
  // S W I T C H - R A D I O - C H E C K E D  
  switch (checkedRadio) {
    case 'smShipper':
      firstPack(smShipper);
      if (shipmentArr.length === 0) {
        secondPack(smShipper);
      }
      break;
    case 'mdShipper':
      firstPack(mdShipper);
      if (shipmentArr.length === 0) {
        secondPack(mdShipper);
      }
      break;
    case 'poldRadio':
      firstPack(poldScenarios);
      if (shipmentArr.length === 0) {
        secondPack(poldScenarios);
      }
      break;
    case 'accessRadio':
      firstPack(poldScenarios);
      if (shipmentArr.length === 0) {
        secondPack(poldScenarios);
      }
      break;
    default:
      console.log('ERROR AT CHECKED RADIO SWITCH');
      break;
  }
  // *************************************************

  if (shipmentArr.length === 1) {
    shipmentArr[0] = { ...formValsObj };
    calcWeight(shipmentArr[0]);
    modalTitle.innerHTML = 'Your Shipment Array:';
    modalBody.innerHTML = `${shipmentArr[0].boxSize} @ ${shipmentArr[0].weight}lbs ${shipmentArr[0].type}<br>`;
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
    shipmentArr[0] = { ...formValsObj };
    // make shipmentArr.ldsSize always = formValsObj.ldsSize
    shipmentArr[0].poldSsr = Object.assign(formValsObj.poldSsr);
    // calculate shipmentArr[0].weight
    calcWeight(shipmentArr[0]);
    // calculate shipmentArr[0].estCost
    modalTitle.innerHTML = 'Your Shipment Array:';
    modalBody.innerHTML = `${shipmentArr[0].boxSize} @ ${shipmentArr[0].weight}lbs ${shipmentArr[0].type} <br> ${shipmentArr[1].boxSize} @ ${shipmentArr[1].weight}lbs Accessories<br>`;
  }
  // if juncBox or backflowBag then push respective packaging and weight to shipmentArr
  if (accessRadio.checked || ldsRadio.checked && shipmentArr.length > 0) {
    if (juncBox.checked && backflowBag.checked) {
      shipmentArr.push(jbBfbObj);
      modalBody.innerHTML += `${jbBfbObj.boxSize} @ ${jbBfbObj.weight}lbs Junc Box + Backflow Bag<br>`;
    } else {
      if (juncBox.checked) {
        shipmentArr.push(juncBoxObj);
        modalBody.innerHTML += `${juncBoxObj.boxSize} @ ${juncBoxObj.weight}lbs Junction Box <br>`;
      }
      if (backflowBag.checked) {
        shipmentArr.push(backflowBagObj);
        modalBody.innerHTML += `${backflowBagObj.boxSize} @ ${backflowBagObj.weight}lbs Backflow Bag <br>`;
      }
    }
  }
  if (shipmentArr.length === 0) {
    modalTitle.innerHTML = `Access-ive... don't ya think?`;
    modalBody.innerHTML = `We'd like to help with this one. Give us a call!`;
  }
  // C A L C - P A C K - F U N C T I O N S
  // *************************************************
  // firstPack
  function firstPack(scenarioArray) {
    for (let i = 0; i < scenarioArray.length && shipmentArr.length < 1; i++) {
      if ((ldsRadio.checked && formValsObj.ldsSize <= scenarioArray[i].ldsSize)
        || (poldRadio.checked && formValsObj.poldSsr <= scenarioArray[i].poldSsr - 2)
        || (accessRadio.checked)) {
        if (formValsObj.api <= scenarioArray[i].api
          && formValsObj.poldSsr <= scenarioArray[i].poldSsr
          && formValsObj.recirc <= scenarioArray[i].recirc) {
          shipmentArr.push(formValsObj);
          break;
        }
      }
    }
  } // End firstPack
  // F I X - B E L O W
  // CONDITIONAL SHOULD MATCH firstPack + poldScenarios
  function secondPack(scenarioArray) {
    for (let i = 0; i < scenarioArray.length && shipmentArr.length < 2; i++) {
      for (let c = 0; c < poldScenarios.length && shipmentArr.length < 2; c++) {
        if ((ldsRadio.checked && formValsObj.ldsSize <= scenarioArray[i].ldsSize)
          || (poldRadio.checked && formValsObj.poldSsr <= (scenarioArray[i].poldSsr + poldScenarios[c].poldSsr) - 2)
          || (accessRadio.checked)) {
          if (formValsObj.api <= poldScenarios[c].api + scenarioArray[i].api
            && formValsObj.poldSsr <= poldScenarios[c].poldSsr + scenarioArray[i].poldSsr
            && formValsObj.recirc <= poldScenarios[c].recirc + scenarioArray[i].recirc) {
            shipmentArr.push(scenarioArray[i], poldScenarios[c]);
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
        }
      }
    }
  }
  function checkRadios() {
    if (ldsRadio.checked) {
      return (formValsObj.ldsSize > 150) ? 'mdShipper' : 'smShipper'; 
    } else if (accessRadio.checked) {
      return 'accessRadio';
    } else if (poldRadio.checked) {
      return 'poldRadio';
    }
  }
  // shipmentArr[n].weight calculator
  function calcWeight(shipmentObj) {
    shipmentObj.weight = 0;
    // + weight based on ldsSize
    switch (shipmentObj.ldsSize) {
      case 75:
        (scvInput.checked) ? shipmentObj.weight += 9.05 + 0.5 : shipmentObj.weight += 9.05;
        shipmentObj.boxSize = '19 x 12 x 7';
        shipmentObj.type = 'LDS';
        break;
      case 100:
        (scvInput.checked) ? shipmentObj.weight += 9.95 + 0.75 : shipmentObj.weight += 9.95;
        shipmentObj.boxSize = '19 x 12 x 7';
        shipmentObj.type = 'LDS';
        break;
      case 125:
        (scvInput.checked) ? shipmentObj.weight += 10.6 + 1.2 : shipmentObj.weight += 10.6;
        shipmentObj.boxSize = '19 x 12 x 7';
        shipmentObj.type = 'LDS';
        break;
      case 150:
        (scvInput.checked) ? shipmentObj.weight += 12.2 + 1.6 : shipmentObj.weight += 12.2;
        shipmentObj.boxSize = '19 x 12 x 7';
        shipmentObj.type = 'LDS';
        break;
      case 200:
        (scvInput.checked) ? shipmentObj.weight += 17.4 + 2.35 : shipmentObj.weight += 17.4;
        shipmentObj.boxSize = '14 x 14 x 14';
        shipmentObj.type = 'LDS';
        break;
      default:
        if (accessRadio.checked) {
          shipmentObj.weight += 0.75;
          shipmentObj.type = 'Accessories';
        } else if (poldRadio.checked) {
          shipmentObj.weight += 1.5;
          shipmentObj.type = 'POLD Only System';
        }
        shipmentObj.boxSize = '13 x 10 x 5';
    }
    // begin accessories calculation
    shipmentObj.weight += shipmentObj.api * 0.6;
    shipmentObj.weight += shipmentObj.pold * 0.2;
    shipmentObj.weight += shipmentObj.recirc * 0.8;
    shipmentObj.weight = Math.round(shipmentObj.weight);
  }
} // E N D - C A L C - P A C K
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Disables/enables ldsSize select and juncBox inputs based on type_radios
function disableRadios() {
  // set delay to allow .active to be added to clicked el before code is run
  setTimeout(function () {
    if (accessRadio.checked) {
      $(ldsSizeGroup).hide("blind");
      $(juncBox).show("blind");
      $(backflowBag).show("blind");
      $(scvInput).show("blind");
    } else if (poldRadio.checked) {
      $(ldsSizeGroup).hide("blind");
      ldsSizeGroup.classList.remove("active");
      $(juncBox).hide("blind");
      juncBox.classList.remove("active");
      $(backflowBag).hide("blind");
      backflowBag.classList.remove("active");
      $(scvInput).hide("blind");
      $(scvInput).checked = false;
    } else if (ldsRadio.checked) {
      $(ldsSizeGroup).show("blind");
      $(juncBox).show("blind");
      $(backflowBag).show("blind");
      $(scvInput).show("blind");
    }
  }, 1);
}

// Reset form
function resetForm() {
  // remove active class from all inputs
  for (let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].classList.remove('active');
  }
  // make ldsRadio active
  ldsRadio.classList.add('active');
  disableRadios();
}

// tool check scenario object poldSsr count
function checkPoldSsr(scenArray) {
  scenArray.forEach((scenario, ind) => {
    return ((scenario.pold + (scenario.ssr / 2)) === scenario.poldSsr) ? console.log(ind + ' correct') : console.log('Check scenario at index ' + ind);
  });
};
// S M - S H I P P E R - S C E N A R I O S
const smShipper = [
  // START SM SHIPPER
  {
    api: 0,
    pold: 4,
    ssr: 2,
    poldSsr: 5,
    recirc: 1,
    ldsSize: 150
  },
  {
    api: 1,
    pold: 3,
    ssr: 0,
    poldSsr: 3,
    recirc: 1,
    ldsSize: 150
  },
  {
    api: 1,
    pold: 2,
    ssr: 2,
    poldSsr: 3,
    recirc: 1,
    ldsSize: 150
  },
  {
    api: 1,
    pold: 5,
    ssr: 0,
    poldSsr: 5,
    recirc: 1,
    ldsSize: 150
  },
  {
    api: 2,
    pold: 0,
    ssr: 0,
    poldSsr: 0,
    recirc: 1,
    ldsSize: 150
  },
  {
    api: 1,
    pold: 14,
    ssr: 2,
    poldSsr: 15,
    recirc: 0,
    ldsSize: 150
  },
  {
    api: 0,
    pold: 18,
    ssr: 2,
    poldSsr: 19,
    recirc: 0,
    ldsSize: 150
  },
  {
    api: 3,
    pold: 3,
    ssr: 2,
    poldSsr: 4,
    recirc: 0,
    ldsSize: 150
  },
  {
    api: 4,
    pold: 0,
    ssr: 0,
    poldSsr: 0,
    recirc: 0,
    ldsSize: 150
  }
];
  // M D - S H I P P E R - S C E N A R I O S
  const mdShipper = [
  {
    api: 2,
    pold: 0,
    ssr: 0,
    poldSsr: 0,
    recirc: 0,
    ldsSize: 200
  },
  {
    api: 1,
    pold: 2,
    ssr: 0,
    poldSsr: 2,
    recirc: 0,
    ldsSize: 200
  },
  {
    api: 0,
    pold: 4,
    ssr: 0,
    poldSsr: 4,
    recirc: 0,
    ldsSize: 200
  }
];
// P O L D - S C E N A R I O S
const poldScenarios = [
  {
    api: 3,
    pold: 0,
    ssr: 0,
    poldSsr: 0,
    recirc: 3
  },
  {
    api: 0,
    pold: 0,
    ssr: 2,
    poldSsr: 1,
    recirc: 5
  },
  {
    api: 6,
    pold: 0,
    ssr: 2,
    poldSsr: 1,
    recirc: 0
  },
  {
    api: 2,
    pold: 2,
    ssr: 2,
    poldSsr: 3,
    recirc: 3
  },
  {
    api: 1,
    pold: 4,
    ssr: 2,
    poldSsr: 5,
    recirc: 3
  },
  {
    api: 0,
    pold: 6,
    ssr: 2,
    poldSsr: 7,
    recirc: 3
  },
  {
    api: 0,
    pold: 15,
    ssr: 2,
    poldSsr: 16,
    recirc: 2
  },
  {
    api: 0,
    pold: 22,
    ssr: 2,
    poldSsr: 23,
    recirc: 0
  },
  {
    api: 2,
    pold: 14,
    ssr: 2,
    poldSsr: 15,
    recirc: 0
  },
  {
    api: 1,
    pold: 18,
    ssr: 2,
    poldSsr: 19,
    recirc: 0
  },
  {
    api: 3,
    pold: 12,
    ssr: 2,
    poldSsr: 13,
    recirc: 0
  },
  {
    api: 4,
    pold: 8,
    ssr: 2,
    poldSsr: 9,
    recirc: 0
  },
  {
    api: 5,
    pold: 4,
    ssr: 2,
    poldSsr: 5,
    recirc: 0
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
// J U N C - B O X + B A C K F L O W - B A G
const jbBfbObj = {
  boxSize: "14 x 14 x 14",
  weight: 7
}