const express = require('express');
const cors = require('cors');
const monk = require('monk');
const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/meower');
const mews = db.get('mews');

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('HELLO');
    res.end();
});

function isValid(mew) {
    return mew.name && mew.name.toString().trim() !== "" &&
        mew.content && mew.content.toString().trim() !== "";
}
app.get('/mews', function (req, res) {
   mews.find()
       .then(function (val) {
           return res.json(val);
       });
});
app.post('/mews', function (req, res) {
    if (isValid(req.body)) {
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            date: new Date()
        };

        mews.insert(mew)
            .then(function (value) {
                res.json(value);
            });
    }
    else {
        res.status(422);
        res.json({
            message: "Name and content are required!"
        });
    }
});

app.listen(5000, function () {
    console.log('Listening on port 5000...');
});