const Twitter = require('twitter');
const config = require('./config/config.js');
const express = require('express');
const app = express();
const Tweet = require('./model/tweet');
const path = require('path');

const T = new Twitter(config);

const params = {
    count: 10
};

app.set("view engine", path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    T.get('statuses/home_timeline', params, function(err, data, response) {
        if(!err){
            data.forEach(el => {
                console.log(el.extended_entities);
                Tweet.create({
                    text: el.text,
                    user_name: el.user.name,
                    user_avatar: el.user.profile_image_url_https,
                    tweet_url: el.hasOwnProperty('extended_entities') ? el.extended_entities.media[0].url : 'https://twitter.com'
                });
            });


            res.render('home.hbs', {
                title: "Last 10 tweets",
                tweets: data
            });
            // res.send(data);
        } else {
            console.log(err);
        }
    })
});

app.listen(3000, function () {
    console.log(`Listening on port 3000...`);
});

