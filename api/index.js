const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const user = {
    user: "vidurmodgil",
    password: "5FgCOAreMDQsZruG"
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const uri = `mongodb+srv://${user.user}:${user.password}@cluster0.yzwdwqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/api/add", function(req, res) {
    console.log(req.body)
    client.connect().then(() => client.db("seeker-ai").collection("emails").insertOne({ email: req.body.email })).then(() => {
        res.send("works");
    });
})

app.listen(3000)

module.exports = app;