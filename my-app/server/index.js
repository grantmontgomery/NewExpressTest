const express = require("express");
const cors = require("cors");
require("dotenv").config();
const json = require("body-parser").json;
const urlEncoded = require("body-parser").urlencoded;
const fetch = require("node-fetch");

const app = express();

app.use(json());
app.use(urlEncoded({ extended: true }));
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  const yelp = new URL("https://api.yelp.com/v3/businesses/search"),
    params = {
      term: req.params.term,
      location: req.params.location,
      radius: 15000
    };

  Object.keys(params).forEach(key =>
    yelp.searchParams.append(key, params[key])
  );

  const response = fetch(yelp, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
    }
  });

  response
    .then(resp => resp.json())
    .then(data => res.send(data.businesses))
    .catch(error => console.log(error.message));
});

app.listen(port, () => console.log(`Server started on port ${port}`));
