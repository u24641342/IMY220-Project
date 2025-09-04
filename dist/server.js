"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// CREATE APP
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"]["static"]("./frontend/public"));
app.post("/api/signup", function (req, res) {
  res.json({
    success: true,
    message: "Welcome aboard brodie.",
    user: {
      email: req.body.email
    }
  });
});
app.post("/api/signin", function (req, res) {
  res.json({
    success: true,
    message: "Welcome back brodie.",
    token: "brodie-token",
    user: {
      email: req.body.email
    }
  });
});
app.use(function (req, res) {
  res.sendFile("index.html", {
    root: "frontend/public"
  });
});
app.listen(3000, function () {
  console.log("Listening on localhost:3000");
});