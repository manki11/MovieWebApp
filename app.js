"use strict";
var express= require('express');
var app= express();

var request= require('request');

app.use(express.static("public"));

app.get("/", function (req, res) {
    var search= req.query.search;
    var page= req.query.page;

    console.log("current page is"+ page);

    if(page=== undefined){
        page=1;
    }

    var pageInfo={
        search:search,
        page:page
    }

    request("http://www.omdbapi.com/?s="+search+"&page="+page+"&apikey=thewdb", function (error, response, body) {
        if(!error && response.statusCode == 200){
            var searchResults= JSON.parse(body);
            var array= searchResults.Search;
            res.render("results.ejs", {results: array, pageInfo:pageInfo});
        }
    });
})

app.get("/id/:id", function (req, res) {
    var id= req.params.id;
    request("http://www.omdbapi.com/?i="+id+"&apikey=thewdb", function (error, response, body) {
        if(!error && response.statusCode == 200){
            var movie= JSON.parse(body);
            res.render("movie.ejs", {result: movie});
        }
    });
})


app.listen(4000,function () {
    console.log("Movies app is online on 4000");
});