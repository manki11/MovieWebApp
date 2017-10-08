"use strict";
var express= require('express');
var app= express();

var request= require('request');

app.use(express.static("public"));

app.get("/", function (req, res) {
    var search= req.query.search;
    console.log(search);
    request("http://www.omdbapi.com/?s="+search+"&apikey=thewdb", function (error, response, body) {
        if(!error && response.statusCode == 200){
            var searchResults= JSON.parse(body);
            var array= searchResults.Search;
            res.render("results.ejs", {results: array});
        }
    });
})


app.listen(4000,function () {
    console.log("Movies app is online on 4000");
});