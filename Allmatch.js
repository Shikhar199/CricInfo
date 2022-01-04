const request = require("request");
const cheerio = require("cheerio");
const scoreCardObj = require("./scorecard");
function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            extractAllLinks(html);
        }
    })
}
function extractAllLinks(html) {
    let $ = cheerio.load(html);
    let scorecardElems = $("a[data-hover='Scorecard']");     //is array ke andr sare matches ke link aa gye 
    for (let i = 0; i < scorecardElems.length; i++) {        // ye loop ek ek link ko process kregi
        let link = $(scorecardElems[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        console.log(fullLink);
        scoreCardObj.ps(fullLink);                // ek ek link ko leke scorecard.js ke processScorecard ko call kr rha hai
    }
}
module.exports = {
    gAlmatches: getAllMatchesLink
}