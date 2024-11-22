# LATEST

## NEW PLAN

I'm abandoning the big 4 model approach

I'm trying a new approach:

- Word Tagger Model => Bet Name Classifier

"How much does a $5 Field Bet pay if a 6 rolls"

["How", "much", "does", "a" "$5" "Field" "Bet" "pay" "if" "a" "6" "rolls"]
["NONE", "NONE", "NONE", "NONE" "AMOUNT" "BET_NAME" "BET_NAME" "NONE" "NONE" "NONE" "ROLL" "NONE"]

Then I pluck out the BET_NAME hits and join into
"Field Bet"

Then I run THAT through the new BetNamesViaTags model

which returns "fieldBet"

----










LEFT OFF HERE
- Just trained a new all caps word tagger
- check the tests vs last model
- add model to iOS and try it out
    - I added .uppercased, should be good
    - see if it's better able to capture the bet names like, come bet on 4









- Note the split on iOS is spliting, "$5" as two, but nodejs is splitting it as one
    - so for consistency on node we should split two and traing that way

- Do I want to check number of groups of digits on iOS

- Current models seems to be case sensitive, might want to go all caps
- test how how it does with marking, "roll" as "ROLL" tag instead of NONE
    - must measure it first
    - and keep the current way of doing it too, duplicate

THEN

- Expand the new bet name model with bet name aliases
- add aliases to bet check match, we'll need a shared alias list somehow

TODO:
- Try the other algo on createML for word tagging, "embeds"

Big Things Left To Do:
- Design App
- Develop Calculator
- Paywall Solution
- Get a Backend For Swift
    - Do the local dependency move

MVP:
- A user can ask Craps questions
- A user can see bet details (Learn Craps)
- A users' queries get saved to firestore
- A users sees barebones design

V1 (MVP PLUS):
- A user sees full pretty design
- A user pays

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
