const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q43xx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventsCollection = client.db("volunteerdb").collection("events");
    app.get('/events', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
});

app.listen(port)