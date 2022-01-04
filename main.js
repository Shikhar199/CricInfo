const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const fs = require("fs");
const path = require("path");
// Venue date opponent result runs balls fours sixes sr
const request = require("request");
const cheerio = require("cheerio");
const AllMatcgObj = require("./Allmatch");
// home page 
const iplPath = path.join(__dirname, "ipl");         //iplPath contains the path jaha pr ipl naam ka folder bnana hai
dirCreater(iplPath);
request(url, cb);
function cb(err, response, html) {               // ye function homepage pr request marega
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractLink(html);
    }
}
function extractLink(html) {                      // ye function view all results wala link lekr ayega
    let $ = cheerio.load(html);
    let anchorElem = $("a[data-hover='View All Results']");
    let link = anchorElem.attr("href");
    // console.log(link);
    let fullLink = "https://www.espncricinfo.com" + link;
    // console.log(fullLink);
    AllMatcgObj.gAlmatches(fullLink);              // allmatches.js me jo function hai use call krega aur vo function sare matches ka links nikalega
}

function dirCreater(filePath) {                    // ye function ipl folder bnayega
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}