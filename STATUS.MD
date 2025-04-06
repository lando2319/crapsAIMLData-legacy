# LATEST












LEFT OFF HERE
- FINAL PUSH














- QA TOP TO BOTTOM
    - Horn Bet
    - Hop Bet

TODO:
Incoming Question What happens to my $4 Pass Line Bet with $10 odds with a Point of 6 if 6 rolls
ai Parsed as {
  amount: 4,
  bet_name: 'Pass Line Bet',
  odds: 10,
  point: 6,
  roll: 6,
  rollDie1: 3,
  rollDie2: 3
}

For some reason it's picking up 3-3 for how it came


-----------------------------------------------

- add final bet list to .prompt file

THEN

- add activity indicator
- QA Each bet one by one
    - make sure genkit can capture
    - QA the response
    - Get specs for image, "Props Section Arrow on Hardways", make a huge list
    - QA Follow up questions, sensible with answers ready




LEFT OFF HERE
MILESTONE MET
- Make a Readme with instructions for this operation
- Might need to have proprocessor exception to split "8 rolled as 2-4" split the "2-4" into "2 - 4"
- setup AppCheck

App check line shown here
https://firebase.google.com/docs/genkit/auth#client_integrity


# MVP DECLARATION

Swift: "What does a $5 Horn Bet pay if 12 rolls"

CALL

onFlow call to firebase functions
- run .generate get json
- set to db as vector
    - response json
    - original question
    - embedding

- return firestore index

RESPONSE

Swift 
- Runs Local Models
- uses the json to answer question
- Shows data and images
- Updates db
    - final answer
    - local model data

Pour over local model data to continually improve

## Vector DB Status
This is working
- savePrompt.js is WORKING
- queryDBForVector.js is WORKING, Ranking, always gives something

- savePromptWithVertex.js is NOT WORKING, permission issue, See Stackoverflow

```
const docs = await ai.retrieve({
    retriever,
    query: question,
    options: {
        limit: 3,
        where: { confirmed: true },

        // Here are some options
        // k: 2,
        // preRerankK: 4,
        // scoreThreshold: 1
    },
});
```

It's always pulling something

TODO: find some way to gague likiness
    Right now it's ranking well, most similar questions are top
    But sometimes the question is way off, but still highest ranked

    If I'm answering based on a match, I need to get some kind of likiness score

    Ideally a firebase FieldValue type solution

## Genkit approach

New Plan

Once and for all abandon the LLM talking approach

MVP
- onCall function to genkit
- App Check
- serverside query to vector db for confirmed data
- serverside save to vector db as unconfirmed
- return parsed response
- answer question clientside or via vector data


FROM HERE:
- Setup vector db
- Confirm I can query for vector db from here








// LEFT OFF HERE
// set up another file for retrieval
// CONFIRM with a slightly different phrase

// FUTURE
// migrage over the whole saving questions part to an onCall function
// set the rules to false, confirm service account still works
// remove the dep on ios for firebase
















----

It's a new day

Genkit is the path forward with the 'two models, one calculator' approach
- Parser AI: extract the following vars from message
    - amount
    - bet_name
    - roll

- JS Calculator: based on info of Parser AI Model, calculate payout

- Talker AI: gives context and provide details about the bet

Final Output To Clientside

```
{
    message: "How much does a $4 Horn Bet pay if 12 rolls"          // original input

    amount:4,                                                       // from Parser AI
    bet_name:"Horn Bet",     
    roll:12,                 

    full_payout: 31                                                 // from JS Calculator
    still_up_payout: 27

    bet_details: "Horn wins on 2,3,11,12 ..."                       // From Talker AI
}

add image_slug
```

# Legacy


Everythings changed

I have Genkit mostly working
I have a flow
I evaluated a flow

This was pretty enlightening

```
- GenKit’s semantic evaluation for “Does the answer make sense?”
- unit tests (or integration tests) for exact numeric checks.
```

FROM HERE
I just got this one off file to work

Now I want to setup tests
- Base mocha test for payouts
- Confirm that I'm having an effect by massively changing the prompt file
- Setup my first test

- make sure the dash still works










// So I had it working in dash
// Then I had to drop the message and just do string in order to get the flow to work

// idk I don't even care about the input, its just without it

it says no input json in the dash






// START HERE
// RIGHT NOW NOW
// so I guess it works with no input
// I just have to do the flows instead of the prompts, which I think is better anyways

// find a way to run these tests where it's not just hanging



// HOLD THIS
// So I know how to setup the eval later
const { gemini15Flash, googleAI, textEmbeddingGecko001 } = require('@genkit-ai/googleai');
const { genkitEval, GenkitMetric } = require('@genkit-ai/evaluator');
...
const ai = genkit({
    plugins: [
        googleAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY
        }),
        genkitEval({
            judge: gemini15Flash,
            metrics: [
                GenkitMetric.ANSWER_RELEVANCY,
                GenkitMetric.FAITHFULNESS,
                GenkitMetric.MALICIOUSNESS
            ],
            embedder: textEmbeddingGecko001
        })
    ],
    model: gemini15Flash
});











TWO TYPES OF QUESTION
- Calculatable
- Non-Calculatable

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






// BIG BIG
Try this Genkit
see if it can REALLY provide a slug for
"What does my $5 Come bet on 5 with $10 odds pay if 6 rolls"

CAN IT REALLY DO THAT


START BACK AT THE TOP

First thing is first
- How do I train it
- can it really do structed output like that



















// WIP NEEDS UPDATING



current cli
npx genkit start -o -- node --watch genAIFlow.js






























WHERE DO I FIT IN????


First Step
- Get some effect on prompts with this prompt manager
- Get some effect on fine tuning
- try retrieval augmented generation
- Setup SOME kind of evaluation


LIKE SO

---
model: googleai/gemini-1.5-flash
config:
  temperature: 0.9
input:
  schema:
    bet: string
    amount?: int
    roll?: int
  default:
    location: Horn Bet
---

I want you to explain how a Horn Bet works

it wins on 2,3,11,12

the 3 and 11 pay 16 for 1

the 2 and 12 pay 31 for 1

to calcualte a horn bet if the roll is not a horn bet number 2,3,11,12 it loses

first divide the bet amount by 4, that is the per bet amount

the proper way to describe the payout is per bet amount times 31 is the, 'and down amount'

the, 'still up to win' amount is the, 'and down amount' minus the bet

so if it's a $4 horn and 12 rolls it would be '31 and down' or '27 still up to win'


HORN bet pays 16 for 1 on the lowside and 31 for 1 on the highside

so a $4 Horn Bet if Ace Deuce Rolls it pays $16 and down or $12 still up to win

// FINISH THIS, but use the interpolations, at least as a test
// I think I can do this if stuff to match the winning rolls

You are the world's most welcoming AI assistant and are currently working at {{location}}.

Greet a guest{{#if name}} named {{name}}{{/if}}{{#if style}} in the style of {{style}}{{/if}}.


























 Somehow I'm going to need to train the model for how the dice came
 "I bet a 2-3 Hopping and 5 came but it rolled 4-1"

 I would like to say definitatively yes, not just, 'yes if 5 came 2-3'
 
 I think this means expanding the bet tagging to include DICE_CAME











Need to train bet name model on high low




I'm going to need a solution for Hops losing based on how it came
idk, I guess I could update the tagger to check for 'how it came' info









LEFT OFF HERE

- See if we're stripping out commas
- probably should be JUST Digits and Letters, and just standard ones






MVP TODO:
- Firebase setup
    - App check
    - Kill Switch
- Finish Calculator
- Finish Suggested questions
    - relevant questions






- do a client side test and see why this isn't match correctly
    - "How much is a $5 Don't Come Bet on 4 ..."
        - should match dontComeBetOn4
        - right now it's match comeBetOn4

// - ORDER GEAR

    // - get 30+ craps questions with preloaded answers
    //      - for the general questions at the bottom










- Note the split on iOS is spliting, "$5" as two, but nodejs is splitting it as one
    - so for consistency on node we should split two and traing that way

- Do I want to check number of groups of digits on iOS

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
- A user can see bet details (Learn Craps content)
- A users' queries get saved to firestore

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
