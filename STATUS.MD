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








LEFT OFF HERE
- Finish setting up word tagging testing
- Expand the new bet name model with bet name aliases

NEXT
- add aliases to bet check match

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

All models loaded

# CORE MODELS

### Roll
V0 READY

### Bet Names
V0 READY

# NUMBER MODELS

### Odds
READY FOR NOW
RETRAIN with final list of bets

### Amount
V0 READY

# CONTEXT MODELS

### Prompt Type
READY FOR NOW
RETRAIN with final list of bets

### Word Tagger
LOADED AND FUNCTIONAL
POOR rating

# EXPERIMENTAL MODELS

### Probs
I'm experimenting to get probabilities
SO far no luck, I don't think it's possible