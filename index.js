
const functions=require('firebase-functions')
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const { config } = require("firebase-functions/v1");
const stripe = require("stripe")(
  "sk_test_51OMyLMHyEXHJUIn2XO7tBHbzen2xvVRhbFTnlvwNRsdZtfF7clJ7hVvSwhzKPLZuFCRiBcoAQw7lvz7tvV49NarB00VktRzY4N"
);

// App config
const app = express();

//  -Middlewares
app.use(cors({ orgin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved for this amount >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    })
    
    //OK -Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen command
exports.api = functions.https.onRequest(app)

// const port=5001
// app.listen(port, () => console.log('listening to ',port));



// http://127.0.0.1:5001/current-amazon-clone/us-central1/api