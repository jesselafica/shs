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
for (let i = 0; i < ldsTypes.length; i++) {
  let radioClasses = ldsTypes[i].classList;
  for (let c = 0; c < radioClasses.length; c++) {
    if (radioClasses[c] === 'active') {
      shipperSize = (ldsTypes[i].getAttribute('value') === 'lds') ? '19 x 12 x 7' : '13 x 10 x 5';
      break;
    }
  }
}
  // ===================================================
  //
  // ===================================================

}
