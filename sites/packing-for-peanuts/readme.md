# TO DO:
1. Use getters & setters with objs (accessors)
2. Rest & Spread
3. JS Classes
###What's next?
1. Logic for new backflow bag and junction box inputs
2. Add input for POLD's w/ LDC
####NEW INPUTS:
1. SCV
2. Express?
-->If yes, expose State dropdown
3. LDC
-->If >75' then POLD box required

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

##### >=2" systems
POLD Only

### C O S M E T I C
  1. Remove reset Button
  2. print out what was added on submit
  3. clear inputs i.e. reset form on submit
  4. Add input for PAM-1 Relays
  > --> PAM-1(1) = POLD(2)
  5. Add limit to inputs i.e. max=""
