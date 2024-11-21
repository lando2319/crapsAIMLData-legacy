# LATEST

## NEW PLAN

I'm abandoning the big 4 model approach

I'm trying a new approach:

- Word Tagger Model + Bet Name Classifier

"How much does a $5 Field Bet pay if a 6 rolls"

["How", "much", "does", "a" "$5" "Field" "Bet" "pay" "if" "a" "6" "rolls"]
["NONE", "NONE", "NONE", "NONE" "AMOUNT" "BET_NAME" "BET_NAME" "NONE" "NONE" "NONE" "ROLL" "NONE"]

Then I pluck out the BET_NAME hits and join into
"Field Bet"

Then I run THAT through the new BetNamesViaTags model

which returns "fieldBet"

----

LEFT OFF HERE
- Over on iOS
    - plug in the matched value into calculate
    - Figure out how EXACTLY I'm going to use the ROLL, AMOUNT, and ODDS tags
    - Do I want to check number of groups of digits

- Current models seems to be case sensitive, might want to go all caps
- test how how it does with marking, "roll" as "ROLL" tag instead of NONE
    - must measure it first
    - and keep the current way of doing it too, duplicate

THEN

- Expand the new bet name model with bet name aliases
- add aliases to bet check match, we'll need a shared alias list somehow

TODO:
- Try the other algo on createML for word tagging, "embeds"

Models are loaded

Big Things Left To Do:
- Design App
- Develop Calculator
- Paywall Solution
- Finish All Bets
- Get a Backend For Swift
    - Do the local dependency move

MVP:
- A user can ask non-prop bet questions
- A user can see bet details (Learn Craps)
- A users' queries get saved to firestore
- A users sees barebones design

V1 (MVP PLUS):
- A user sees full pretty design
- A user pays
- A user can ask prop bets

V+:
- Save all queries
- Train and retrain
- maybe even get a pretrained model to see if it's gibberish
    - how can a pretrain model help me?

# Models and Status

### Bet Names
V0 READY

### Word Tagger
V0 READY
