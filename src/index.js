const express = require("express");
const app = express();
const cors = require('cors');

const productService = require("./services/productService");
const userService = require("./services/userService");
const discountService = require("./services/discountService");
const sizeAndPriceService = require("./services/sizePriceService");
const enquiryService = require("./services/enquiryService");
const packagingService = require("./services/packagingService");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({origin: '*'}));

app.listen(8000, () => console.log("Port 8000 was ready"));

// api
// flowers
app.get("/products", productService.getProducts);
app.get("/product/:id", productService.getProductById);

// user
app.post("/login", userService.login);
app.post("/user/add", userService.addUser);
app.get("/user/:id", userService.getUserById);

// discount
app.get("/discount/:product_id", discountService.getDiscountByFlowerId);

// size and price
app.get("/sizeAndPrice/:product_id", sizeAndPriceService.getSizeAndPriceByFlowerId);

// enquiry
app.post("/enquiry/add", enquiryService.addEnquiry);

// packaging
app.get("/packaging", packagingService.getPackList);

