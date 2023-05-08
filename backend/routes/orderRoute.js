//isme order se related sare routes ajangey

const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
// const {
  // newOrder,
//   getSingleOrder,
//   myOrders,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
// } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);  //authentication kuki jab login hoga tabhi order place kar sake

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);


  ///R  E M E M B E R FOR UPDATE WE ALWAYS USE PUT REQUEST
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;