const express = require("express");
const routesBudget = require("./app/routes/budget.routes.js");
const routesAuth = require("./app/routes/auth.routes.js");
const routesProduct = require("./app/routes/product.routes.js");
const clientsProduct = require("./app/routes/client.routes.js");
// const signupClientsProduct = require("./app/routes/signupClient.routes.js");
const sellers = require("./app/routes/seller.routes.js");
const paymentsType = require("./app/routes/paymentType.routes.js");
const productPrices = require("./app/routes/price.routes");
const routesOrder = require("./app/routes/order.routes");
const checkSession = require("./app/routes/check.routes");
const routesShippingCompany = require("./app/routes/shipping.routes");
const routesSellerCompany = require("./app/routes/seller.routes");
const routesAssistentSellerCompany = require("./app/routes/assistent-seller.routes ");


const auth = require("./app/middlewares/auth.js");

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

router.use("/auth", routesAuth);
router.use("/budget", auth, routesBudget);
router.use("/products", auth, routesProduct);
router.use("/clients", auth, clientsProduct);
// router.use("/signupClients", auth, signupClientsProduct);
router.use("/sellers", auth, sellers);
router.use("/paymentsType", auth, paymentsType);
router.use("/price-manager", auth, productPrices);
router.use("/order", auth, routesOrder);
router.use("/shipping-company", auth, routesShippingCompany);
router.use("/seller-company", auth, routesSellerCompany);
router.use("/assistent-seller-company", auth, routesAssistentSellerCompany);
router.use("/check-session", auth, checkSession);

module.exports = router;
