const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())
dotenv.config();
const userRoutes=require("./routes/user")
const productRouter=require("./routes/products")
const cartRouter=require("./routes/cart")
const CoopanRouter=require("./routes/coopan")
const PaymentRouter=require("./routes/Payment")
const OrderRouter=require("./routes/order")

// --------------------DB Connect ------------------------------
if (process.env.SERVER=="LOCAL") {
    mongoose
      .connect(process.env.DB_LOCAL)
    .then(() => {
      console.log("LOCAL Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected failed ", err);
    });
  } else {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3qnwaw3.mongodb.net/ecom`
    )
     .then(() => {
      console.log("REMOTE Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected Failed ", err);
    });
  }

app.use(express.json());
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/",productRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/coopan",CoopanRouter);
app.use("/api/v1/payment",PaymentRouter);
app.use("/api/v1/order",OrderRouter)

app.listen(process.env.PORT, () => {
  console.log("listening on "+process.env.PORT);
});

