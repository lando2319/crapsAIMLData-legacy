# LATEST


Next do some tests to make sure

If I have $1 on the Come Bet on Six with $10 odds and Four rolls, does it lose

DO TESTS FOR
- going from Four to 4
- all the replace steps on cleaner.js

make sure I'm getting data the EXACT same way as I'm training on


JUST HAVE A MAX LIMIT OF 1000

THEN in my clean process, check for any number over 1000

NEED:
FIRST turn all word numbers into digits
THEN PREPROCESS


PROCESS FOR AMOUNT:
User enters

"If I have $6 on the Come Bet on Ten with $10 odds then a Six rolls does it win"

cleaner converts to

"If I have $6 on the Come Bet on with then a does it win"

Run through model to get 6

Run through other processes to go the other numbers

Calculate and Answer question, and show supporting files


BIG PICTURE:

setup iOS app

- have model on it
- text label for query
- clean and prompt model
- show result, for now just number

Things are fluid

I've broken off the process for amount training data gen

I tried this

"How much does my $85 C&E <odds> pay if <roll> is rolled"

I am going to add the rolls as numbers

right now I'm leaning toward a preprocess that converts all word numbers into numbers


COMMITING HERE WIP WITH WORKABLE MODEL

Amount Tests are
1,1,.67,1,.67,.4

Preview Prompt

How much does a $5 Field Bet pay if 7 rolls

gives 

7 at 50%
5 at 49%

placed in repo /models/amount GOOD














# Models and Status

### Roll
- Producing correct data
- TESTS look good
- All perfect except 
    - 10: 0.8
    - 9: 0.5
    - 6: 0.5
    - 4: 0.8
UNDER DEVELOPMENT
Redo with cleaning

### Odds
UNDER DEVELOPMENT

### Bet
UNDER DEVELOPMENT

### Amount
READY