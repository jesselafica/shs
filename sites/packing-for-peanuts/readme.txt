PACKING FOR PEANUTS
1. Visit and add bootstrap for layout ideas
2. Create form inputs with device names
3. Create each of the  scenarios in scripts.js
4. Create conversion logic for SSRs to POLDs
5. ADD TERNARY for > max of each to return the need for a POLD box.
ACCESSORIES
API
POLD
SSR
4hr Timer / Recirc Pump Switch

*add ability to save failed packaging request as an object for later

Important Notes:
2 SSRs = 1 POLD
// Add Ssrs to pold key instead of creating key value pair
// formValsObj.pold += (formValsObj.ssr / 2);


PHASE 1
  Create initial application that will only look at the input values and see if they exceed the 13 possible scenarios
PHASE 2
  Add support for additional packaging i.e. POLD boxes
PHASE 3
  Add support for the rest of the potential packaging i.e. electrical junction boxes, LDS outdoor bags, etc.
PHASE 4
  Setup database (using PHP & mySQL?) that will accept comments or requests for changes. App will store failed attempts to package. --->if error is detected email the object using https://formspree.io/


13 scenarios"Will they all fit?
(LDS Small Shipper)"
            API	    POLD	  SSR's	  Recirc4hr
Scen1	      0	      18      0      	1
---------------------------------------------
Scen2	      1	      18      0      	0
---------------------------------------------
Scen3	      1	      1	      2	      3
---------------------------------------------
Scen4	      1	      13      0      	1
---------------------------------------------
Scen5	      1	      12      2      	1
---------------------------------------------
Scen6	      2	      13      0      	0
---------------------------------------------
Scen7	      2	      0	      0	      3
---------------------------------------------
Scen8	      3	      0	      0	      2
---------------------------------------------
Scen9	      3	      7	      0	      1
---------------------------------------------
Scen10      3      	10	    0	      0
---------------------------------------------
Scen11      4      	0      	0      	2
---------------------------------------------
Scen12      6      	0      	0      	1
---------------------------------------------
Scen13      7      	0      	0      	0


         API  POLD     SSR   Pump Switch/4 hr
Scen1  	  3	    0	      N	      3
---------------------------------------------
Scen2  	  0	    0	      Y	      5
---------------------------------------------
Scen3  	  6	    0	      Y	      0
---------------------------------------------
Scen4  	  2	    2	      Y	      3
---------------------------------------------
Scen5  	  1	    4	      Y	      3
---------------------------------------------
Scen6  	  0	    6	      Y	      3
---------------------------------------------
Scen7  	  0	    15	    Y	      2
---------------------------------------------
Scen8  	  0	    22	    Y	      0
---------------------------------------------
Scen9  	  2	    14	    Y	      0
---------------------------------------------
Scen10  	1	    18	    Y	      0
---------------------------------------------
Scen11  	3	    12	    Y	      0
---------------------------------------------
Scen12  	4	    8	      Y	      0
---------------------------------------------
Scen13  	5	    4	      Y	      0




Use the <kbd> to indicate input that is typically entered via keyboard.
