
- add some extra cases for the failing come bet tests


### STATUS:
__5, __8, and __12 seem to be the problem labels

### NAME VARIANCE
These are other names I need to account for

C&E: Currently only, "C&E"
Aliases
- Craps/Eleven
- Craps Eleven
- (See how Android and iOS dictation does it)

Crap Check
Aliases
- Any Craps

Training Data Do at least on loop of "no odds" with slug like comeBet5_5_0_10
with test cases


# NEW PLAN
Multiple models

- Roll Model
- Bet Models
- Amount
- Odds Model

MAKE THE JSON LIKE SO

{
    text:"how do I...",
    betLabel:"comeBet5",
    rollLabel:"7",
    amount:"5",
    odds:"10"
}



CONFIRM EACH



// LEFT OFF HERE
// These two look good, not perfect, but good
// Move on to the next one

    - thoroughly check roll training data
    - thoroughly check roll testing data







- thoroughly check bet training data
- thoroughly check bet testing data

- thoroughly check amount training data
- thoroughly check amount testing data

- thoroughly check odds training data
- thoroughly check odds testing data


# MUST DO
Right now I'm training for ONLY numbers, no word numbers at all

SET UP PREPROCESS

convert all word numbers 1-100 to number version



I had to drop Aces/Ace Deuce for now as roll combinations in the roll model

Somehow I'm going to need to distinguish between Ace/Ace Deuce the Bet and the roll



# RIGHT NOW

// put in iOS app
// back up final version on hugging face

// Then I need to do the same cleaning process in Swift