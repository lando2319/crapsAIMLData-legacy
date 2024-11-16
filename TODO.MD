
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



# MUST DO

I had to drop Aces/Ace Deuce for now as roll combinations in the roll model

Somehow I'm going to need to distinguish between Ace/Ace Deuce the Bet and the roll



# ALSO

- back up final version on hugging face