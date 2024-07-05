
const mongoose = require("mongoose");


const productSchema = {
  title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  like: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users"// thid the collect ref name
    // this is the way to write the aggrigation of two collection ref
  },
  dislike: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "users"
  },
    likesCount: {
      type: Number,
      default: 0
    },
  // reviews: {
  //   type: [{
  //     rating: Number,
  //     comment: String,
  //     userID: mongoose.Schema.Types.ObjectId
  //   }
  //   ],
  //   default: [],
  //   ref: "users"
  // }
}
module.exports = mongoose.model("products", productSchema);