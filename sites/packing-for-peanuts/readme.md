#TO DO:
###FIX the !oneBox logic
--> key names being passed into function is broken
--> loop through each poldScenarios and (formValsObj - poldScenarios[i]) before
looping through ldsScenarios again (formvalsObj <= ldsScenarios[i])
turn the calc pack initial loop into a function that can be invoked here
!oneBox and during the initial oneBox


Add accessory/POLD only for size
Add input for LDC
--> if >75' then POLD box required

PHASE 1
Create initial application that will only look at the input values and see if they exceed the 13 possible scenarios
PHASE 2
Add support for additional packaging i.e. POLD boxes
PHASE 3
Add support for the rest of the potential packaging i.e. electrical junction boxes, LDS outdoor bags, etc.
PHASE 4
Setup database (using PHP & mySQL?) that will accept comments or requests for changes. App will store failed attempts to package. --->if error is detected email the object using https://formspree.io/

ADDITIONAL PACKAGES
  ADD SCENARIOS:
    1. POLD      13x10x5
    2. LDS       14x14x14
    3. API/PANEL 10x8x3

Find shipper scenario that object most closely relates to i.e. !<scenario.key values
  --> subtract scenario.key values from shipper.key values
  --> take remainder and divide into POLD only boxes
  Round up and count number of POLD only boxes + shipper

Text output for match
--> 14x14x14 if >150
Add logic for 075 up to 150, 200 and up ignore i.e. option inputs





ADD LDS SIZE INPUT FIELDS

>=2" systems
POLD Only

C O S M E T I C
/////////////////////////////////////////////////////////////
  Remove reset Button
  print out what was added on submit
  clear inputs i.e. reset form on submit
  Add input for PAM-1 Relays
  --> PAM-1(1) = POLD(2)
  Add limit to inputs i.e. max=""
/////////////////////////////////////////////////////////////
