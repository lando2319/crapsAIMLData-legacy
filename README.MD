# Craps AI Training Data


## TWO MODELS

### Tagger Model

This used to parse a sentence into the needed elements

It breaks down a sentence like so

```
{
    "tokens": [
        "WITH",
        "A",
        "$25",
        "BUY",
        "BET",
        "ON",
        "4",
        "WHAT",
        "HAPPENS",
        "IF",
        "9",
        "ROLLS"
    ],
    "labels": [
        "NONE",
        "NONE",
        "AMOUNT",
        "BET_NAME",
        "BET_NAME",
        "BET_NAME",
        "BET_NAME",
        "NONE",
        "NONE",
        "NONE",
        "ROLL",
        "NONE"
    ]
}
```

#### Here are the steps to train a new createML Tagger model

First run file to get training data
`node generateWordTaggingTrainingData.js`

Then in CreateML open word tagger project in this repo

Train (3+Hours)

Then add model to swift project

Update the 2 places where the name of the model is declared and update to new name

### Bet Name Model

This will translate the Bet Names capture by the tagger model into a bet name slug

```
{
    "text":"FIELD BET",
    "label":"fieldBet"
},
{
    "text":"WORLD BET",
    "label":"worldBet"
}
```

#### Here are the steps to train a new createML BetName model

First run file to get training data
`node generateBetNameTrainingData.js`

Then in CreateML open word tagger project in this repo

Train (3+Hours)

Then add model to swift project

Update the 2 places where the name of the model is declared and update to new name

----

TODO Test cases
`"text": "If a Twelve is rolled, does a the Field Bet pay double?",`

For GenKitUI
From within functions dir
> npx genkit start -o -- node --watch index.js