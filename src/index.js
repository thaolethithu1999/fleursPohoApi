const express = require("express");
const app = express();
const cors = require('cors');

const flowerService = require("./services/flowersService");
const userService = require("./services/userService");
const discountService = require("./services/discountService");
const sizeAndPriceService = require("./services/sizePriceService");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({origin: '*'}));

app.listen(8000, () => console.log("Port 8000 was ready"));

// api
// flowers
app.get("/flowers", flowerService.getFlowers);
app.get("/flower/:id", flowerService.getFlowerById);

// user
app.post("/login", userService.login);
app.post("/user/add", userService.addUser);

// discount
app.get("/discount/:flower_id", discountService.getDiscountByFlowerId);

// size and price
app.get("/sizeAndPrice/:flower_id", sizeAndPriceService.getSizeAndPriceByFlowerId);
