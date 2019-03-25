// Initialize variables
let oneBox = false;

// Inputs
const apis    = document.querySelector("#api");
const polds   = document.querySelector("#pold");
const ssrs    = document.querySelector("#ssr");
const recircs = document.querySelector("#recirc");

//Buttons
const submitBtn = document.querySelector("#submit_button");
      submitBtn.addEventListener('click', calcPack);
const resetBtn = document.querySelector("#reset_button");

// Message
const message = document.querySelector("#message");

// Declare functions

function calcPack() {
  // reinit vars and vals
  oneBox = false;

  apis.value;
  polds.value;
  ssrs.value;
  recircs.value;

  // convert SSRs and add them to POLDs

  // add ternary for conditional >max of each type to end function and return second shipper
  // before continuing with conditionals for 13 single shipper scenarios

  // Scen1	    API  0	    POLD  18    SSR  0     RECIRC 	1

  // Scen2	    API  1	    POLD  18    SSR  0     RECIRC 	0

  // Scen3	    API  1	    POLD  1	    SSR  2	   RECIRC  3

  // Scen4	    API  1	    POLD  13    SSR  0     RECIRC 	1

  // Scen5	    API  1	    POLD  12    SSR  2     RECIRC 	1

  // Scen6	    API  2	    POLD  13    SSR  0     RECIRC 	0

  // Scen7	    API  2	    POLD  0	    SSR  0	   RECIRC   3

  // Scen8	    API  3	    POLD  0	    SSR  0	   RECIRC   2

  // Scen9	    API  3	    POLD  7	    SSR  0	   RECIRC   1

  // Scen10     API  3      POLD 	10	  SSR 0	     RECIRC   0

  // Scen11     API  4      POLD 	0     SSR 	0    RECIRC 	2

  // Scen12     API  6      POLD 	0     SSR 	0    RECIRC 	1

  // Scen13     API  7      POLD 	0     SSR 	0    RECIRC 	0


};

// Add event listenters to buttons
submitBtn.addEventListener('click', calcPack);
