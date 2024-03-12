const express = require("express")
const hbs = require("hbs")
const path = require("path")
const helmet = require("helmet")


let app = express()
const weatherData = require("../utils/weatherData")

let publicPath = path.join(__dirname, "../public")
let viewPath = path.join(__dirname, "../Templates/views")
let partialPath = path.join(__dirname, "../Templates/partials")

app.use(helmet())
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))


app.get("/", (req, res) => {
    res.status(200).render("index", { title: "weather App" })
})
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.render("404", { title: "Page not Found" });
    }

    weatherData(address, (err, data) => {
        if (err) {
            return res.status(500).send('Error fetching weather data');
        }
        res.json(data);
    });
});

app.get("*", (req, res) => {
    res.render("404", { title: "Page not Found" })
})
app.listen(5000, () => {
    console.log("Serever is listening on post" + 5000)
})