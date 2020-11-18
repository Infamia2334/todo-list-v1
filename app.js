const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//setting up view engine for ejs document
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

//items is an empty array that contains 'item', i.e. list item
let items = [];                                 
app.get("/", function (req, res) {
    //creating new instance of Date object
    let today = new Date()  

    //options is an object to format date properties
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    //toLocaleDateString() converts object 'Date' to a string using locale conventions 
    let day = today.toLocaleDateString("en-US", options);
    console.log(day);

    //rendering ejs document 'list.ejs' passing in two variables day and newListItems
    res.render("list", {
        day: day,
        newListItems: items
    });


});


app.post("/", function (req, res) {

    let item = req.body.newItem;
    items.push(item);
    //Redirecting to home route i.e., app.get()
    res.redirect("/");
})

app.listen(3000, function () {
    console.group("Server is A-ok");
});