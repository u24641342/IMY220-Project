"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _database = require("./database.js");
var _excluded = ["password"],
  _excluded2 = ["password"],
  _excluded3 = ["password"],
  _excluded4 = ["password"],
  _excluded5 = ["password"],
  _excluded6 = ["password"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// CREATE APP
var app = (0, _express["default"])();

// Middleware - Increase payload limits for file uploads
app.use(_express["default"].json({
  limit: '10mb'
})); // Increase JSON payload limit to 10MB
app.use(_express["default"].urlencoded({
  limit: '10mb',
  extended: true
})); // Also handle URL-encoded data
app.use((0, _cors["default"])());
app.use(_express["default"]["static"]("./frontend/public"));

// Initialize database connection
(0, _database.connectDB)()["catch"](console.error);

// Error handling middleware
var asyncHandler = function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](next);
  };
};

// AUTHENTICATION ROUTES
app.post("/api/signup", asyncHandler(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, name, email, password, bio, skills, profilePicture, user, _, userResponse, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, bio = _req$body.bio, skills = _req$body.skills, profilePicture = _req$body.profilePicture;
          if (!(!name || !email || !password)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            success: false,
            message: "Name, email, and password are required"
          }));
        case 1:
          _context.n = 2;
          return _database.UserService.createUser({
            name: name,
            email: email,
            password: password,
            bio: bio,
            skills: skills,
            profilePicture: profilePicture
          });
        case 2:
          user = _context.v;
          // Remove password from response
          _ = user.password, userResponse = _objectWithoutProperties(user, _excluded);
          res.status(201).json({
            success: true,
            message: "Welcome aboard brodie.",
            user: userResponse
          });
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          res.status(400).json({
            success: false,
            message: _t.message
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
app.post("/api/signin", asyncHandler(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, _, userResponse, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            success: false,
            message: "Email and password are required"
          }));
        case 1:
          _context2.n = 2;
          return _database.UserService.getUserByEmail(email);
        case 2:
          user = _context2.v;
          if (!(!user || user.password !== password)) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(401).json({
            success: false,
            message: "Invalid credentials"
          }));
        case 3:
          // Remove password from response
          _ = user.password, userResponse = _objectWithoutProperties(user, _excluded2);
          res.json({
            success: true,
            message: "Welcome back brodie.",
            token: "brodie-token",
            user: userResponse
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          res.status(500).json({
            success: false,
            message: _t2.message
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));

// USER ROUTES
app.get("/api/users", asyncHandler(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var users, usersResponse, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return _database.UserService.getAllUsers();
        case 1:
          users = _context3.v;
          // Remove passwords from response
          usersResponse = users.map(function (user) {
            var password = user.password,
              userWithoutPassword = _objectWithoutProperties(user, _excluded3);
            return userWithoutPassword;
          });
          res.json({
            success: true,
            users: usersResponse
          });
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            success: false,
            message: _t3.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()));
app.get("/api/users/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var user, password, userResponse, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return _database.UserService.getUserById(req.params.id);
        case 1:
          user = _context4.v;
          if (user) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 2:
          // Remove password from response
          password = user.password, userResponse = _objectWithoutProperties(user, _excluded4);
          res.json({
            success: true,
            user: userResponse
          });
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          res.status(500).json({
            success: false,
            message: _t4.message
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()));
app.put("/api/users/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var updatedUser, password, userResponse, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return _database.UserService.updateUser(req.params.id, req.body);
        case 1:
          updatedUser = _context5.v;
          // Remove password from response
          password = updatedUser.password, userResponse = _objectWithoutProperties(updatedUser, _excluded5);
          res.json({
            success: true,
            user: userResponse
          });
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t5 = _context5.v;
          res.status(500).json({
            success: false,
            message: _t5.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}()));
app["delete"]("/api/users/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var result, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return _database.UserService.deleteUser(req.params.id);
        case 1:
          result = _context6.v;
          res.json({
            success: true,
            message: result.message
          });
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          res.status(500).json({
            success: false,
            message: _t6.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}()));
app.get("/api/users/search/:term", asyncHandler(/*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var users, usersResponse, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return _database.UserService.searchUsers(req.params.term);
        case 1:
          users = _context7.v;
          // Remove passwords from response
          usersResponse = users.map(function (user) {
            var password = user.password,
              userWithoutPassword = _objectWithoutProperties(user, _excluded6);
            return userWithoutPassword;
          });
          res.json({
            success: true,
            users: usersResponse
          });
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t7 = _context7.v;
          res.status(500).json({
            success: false,
            message: _t7.message
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}()));

// PROJECT ROUTES
app.get("/api/projects", asyncHandler(/*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var projects, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return _database.ProjectService.getAllProjects();
        case 1:
          projects = _context8.v;
          res.json({
            success: true,
            projects: projects
          });
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t8 = _context8.v;
          res.status(500).json({
            success: false,
            message: _t8.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}()));
app.get("/api/projects/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var project, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return _database.ProjectService.getProjectById(req.params.id);
        case 1:
          project = _context9.v;
          if (project) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, res.status(404).json({
            success: false,
            message: "Project not found"
          }));
        case 2:
          res.json({
            success: true,
            project: project
          });
          _context9.n = 4;
          break;
        case 3:
          _context9.p = 3;
          _t9 = _context9.v;
          res.status(500).json({
            success: false,
            message: _t9.message
          });
        case 4:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}()));
app.post("/api/projects", asyncHandler(/*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _req$body3, name, description, ownerId, project, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _req$body3 = req.body, name = _req$body3.name, description = _req$body3.description, ownerId = _req$body3.ownerId;
          if (!(!name || !description || !ownerId)) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2, res.status(400).json({
            success: false,
            message: "Name, description, and ownerId are required"
          }));
        case 1:
          _context0.n = 2;
          return _database.ProjectService.createProject(req.body);
        case 2:
          project = _context0.v;
          res.status(201).json({
            success: true,
            project: project
          });
          _context0.n = 4;
          break;
        case 3:
          _context0.p = 3;
          _t0 = _context0.v;
          res.status(400).json({
            success: false,
            message: _t0.message
          });
        case 4:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 3]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}()));
app.put("/api/projects/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var updatedProject, _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return _database.ProjectService.updateProject(req.params.id, req.body);
        case 1:
          updatedProject = _context1.v;
          res.json({
            success: true,
            project: updatedProject
          });
          _context1.n = 3;
          break;
        case 2:
          _context1.p = 2;
          _t1 = _context1.v;
          res.status(500).json({
            success: false,
            message: _t1.message
          });
        case 3:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 2]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}()));
app["delete"]("/api/projects/:id", asyncHandler(/*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var result, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return _database.ProjectService.deleteProject(req.params.id);
        case 1:
          result = _context10.v;
          res.json({
            success: true,
            message: result.message
          });
          _context10.n = 3;
          break;
        case 2:
          _context10.p = 2;
          _t10 = _context10.v;
          res.status(500).json({
            success: false,
            message: _t10.message
          });
        case 3:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 2]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}()));
app.get("/api/projects/user/:userId", asyncHandler(/*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var projects, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return _database.ProjectService.getProjectsByUser(req.params.userId);
        case 1:
          projects = _context11.v;
          res.json({
            success: true,
            projects: projects
          });
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t11 = _context11.v;
          res.status(500).json({
            success: false,
            message: _t11.message
          });
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}()));
app.get("/api/projects/search/:term", asyncHandler(/*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var projects, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return _database.ProjectService.searchProjects(req.params.term);
        case 1:
          projects = _context12.v;
          res.json({
            success: true,
            projects: projects
          });
          _context12.n = 3;
          break;
        case 2:
          _context12.p = 2;
          _t12 = _context12.v;
          res.status(500).json({
            success: false,
            message: _t12.message
          });
        case 3:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}()));

// PROJECT MEMBER ROUTES
app.post("/api/projects/:id/members", asyncHandler(/*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var memberId, project, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          memberId = req.body.memberId;
          if (memberId) {
            _context13.n = 1;
            break;
          }
          return _context13.a(2, res.status(400).json({
            success: false,
            message: "memberId is required"
          }));
        case 1:
          _context13.n = 2;
          return _database.ProjectService.addMemberToProject(req.params.id, memberId);
        case 2:
          project = _context13.v;
          res.json({
            success: true,
            project: project
          });
          _context13.n = 4;
          break;
        case 3:
          _context13.p = 3;
          _t13 = _context13.v;
          res.status(500).json({
            success: false,
            message: _t13.message
          });
        case 4:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 3]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}()));
app["delete"]("/api/projects/:id/members/:memberId", asyncHandler(/*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var project, _t14;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _context14.n = 1;
          return _database.ProjectService.removeMemberFromProject(req.params.id, req.params.memberId);
        case 1:
          project = _context14.v;
          res.json({
            success: true,
            project: project
          });
          _context14.n = 3;
          break;
        case 2:
          _context14.p = 2;
          _t14 = _context14.v;
          res.status(500).json({
            success: false,
            message: _t14.message
          });
        case 3:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 2]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}()));

// PROJECT FILE ROUTES
app.post("/api/projects/:id/files", asyncHandler(/*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var _req$body4, name, originalName, size, type, uploadedBy, content, url, fileData, project, _t15;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _req$body4 = req.body, name = _req$body4.name, originalName = _req$body4.originalName, size = _req$body4.size, type = _req$body4.type, uploadedBy = _req$body4.uploadedBy, content = _req$body4.content, url = _req$body4.url;
          if (!(!name || !uploadedBy)) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2, res.status(400).json({
            success: false,
            message: "Name and uploadedBy are required"
          }));
        case 1:
          fileData = {
            name: name,
            originalName: originalName,
            size: size,
            type: type,
            uploadedBy: uploadedBy,
            content: content,
            url: url
          };
          _context15.n = 2;
          return _database.ProjectService.addFileToProject(req.params.id, fileData);
        case 2:
          project = _context15.v;
          res.json({
            success: true,
            project: project
          });
          _context15.n = 4;
          break;
        case 3:
          _context15.p = 3;
          _t15 = _context15.v;
          res.status(500).json({
            success: false,
            message: _t15.message
          });
        case 4:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 3]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}()));
app.get("/api/projects/:id/files/:fileId", asyncHandler(/*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var file, _t16;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          _context16.n = 1;
          return _database.ProjectService.getFileFromProject(req.params.id, req.params.fileId);
        case 1:
          file = _context16.v;
          res.json({
            success: true,
            file: file
          });
          _context16.n = 3;
          break;
        case 2:
          _context16.p = 2;
          _t16 = _context16.v;
          res.status(500).json({
            success: false,
            message: _t16.message
          });
        case 3:
          return _context16.a(2);
      }
    }, _callee16, null, [[0, 2]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}()));
app.put("/api/projects/:id/files/:fileId", asyncHandler(/*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var _req$body5, name, content, type, updateData, project, _t17;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _context17.p = 0;
          _req$body5 = req.body, name = _req$body5.name, content = _req$body5.content, type = _req$body5.type;
          updateData = {};
          if (name) updateData.name = name;
          if (content) updateData.content = content;
          if (type) updateData.type = type;
          _context17.n = 1;
          return _database.ProjectService.updateFileInProject(req.params.id, req.params.fileId, updateData);
        case 1:
          project = _context17.v;
          res.json({
            success: true,
            project: project
          });
          _context17.n = 3;
          break;
        case 2:
          _context17.p = 2;
          _t17 = _context17.v;
          res.status(500).json({
            success: false,
            message: _t17.message
          });
        case 3:
          return _context17.a(2);
      }
    }, _callee17, null, [[0, 2]]);
  }));
  return function (_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}()));
app["delete"]("/api/projects/:id/files/:fileId", asyncHandler(/*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
    var project, _t18;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          _context18.n = 1;
          return _database.ProjectService.removeFileFromProject(req.params.id, req.params.fileId);
        case 1:
          project = _context18.v;
          res.json({
            success: true,
            project: project
          });
          _context18.n = 3;
          break;
        case 2:
          _context18.p = 2;
          _t18 = _context18.v;
          res.status(500).json({
            success: false,
            message: _t18.message
          });
        case 3:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 2]]);
  }));
  return function (_x37, _x38) {
    return _ref18.apply(this, arguments);
  };
}()));

// CHECK-IN ROUTES
app.post("/api/projects/:id/checkins", asyncHandler(/*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
    var _req$body6, userId, message, progress, checkIn, _t19;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          _req$body6 = req.body, userId = _req$body6.userId, message = _req$body6.message, progress = _req$body6.progress;
          if (!(!userId || !message)) {
            _context19.n = 1;
            break;
          }
          return _context19.a(2, res.status(400).json({
            success: false,
            message: "userId and message are required"
          }));
        case 1:
          _context19.n = 2;
          return _database.ProjectService.addCheckIn(req.params.id, {
            userId: userId,
            message: message,
            progress: progress || 0
          });
        case 2:
          checkIn = _context19.v;
          res.status(201).json({
            success: true,
            checkIn: checkIn
          });
          _context19.n = 4;
          break;
        case 3:
          _context19.p = 3;
          _t19 = _context19.v;
          res.status(400).json({
            success: false,
            message: _t19.message
          });
        case 4:
          return _context19.a(2);
      }
    }, _callee19, null, [[0, 3]]);
  }));
  return function (_x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}()));
app.post("/api/projects/:projectId/checkins/:checkInId/comments", asyncHandler(/*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
    var _req$body7, userId, message, comment, _t20;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _req$body7 = req.body, userId = _req$body7.userId, message = _req$body7.message;
          if (!(!userId || !message)) {
            _context20.n = 1;
            break;
          }
          return _context20.a(2, res.status(400).json({
            success: false,
            message: "userId and message are required"
          }));
        case 1:
          _context20.n = 2;
          return _database.ProjectService.addCommentToCheckIn(req.params.projectId, req.params.checkInId, {
            userId: userId,
            message: message
          });
        case 2:
          comment = _context20.v;
          res.status(201).json({
            success: true,
            comment: comment
          });
          _context20.n = 4;
          break;
        case 3:
          _context20.p = 3;
          _t20 = _context20.v;
          res.status(400).json({
            success: false,
            message: _t20.message
          });
        case 4:
          return _context20.a(2);
      }
    }, _callee20, null, [[0, 3]]);
  }));
  return function (_x41, _x42) {
    return _ref20.apply(this, arguments);
  };
}()));

// FRIENDS ROUTES
app.post("/api/friends/request", asyncHandler(/*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
    var _req$body8, fromUserId, toUserId, friendship, _t21;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _req$body8 = req.body, fromUserId = _req$body8.fromUserId, toUserId = _req$body8.toUserId;
          if (!(!fromUserId || !toUserId)) {
            _context21.n = 1;
            break;
          }
          return _context21.a(2, res.status(400).json({
            success: false,
            message: "fromUserId and toUserId are required"
          }));
        case 1:
          if (!(fromUserId === toUserId)) {
            _context21.n = 2;
            break;
          }
          return _context21.a(2, res.status(400).json({
            success: false,
            message: "Cannot send friend request to yourself"
          }));
        case 2:
          _context21.n = 3;
          return _database.FriendsService.sendFriendRequest(fromUserId, toUserId);
        case 3:
          friendship = _context21.v;
          res.status(201).json({
            success: true,
            friendship: friendship
          });
          _context21.n = 5;
          break;
        case 4:
          _context21.p = 4;
          _t21 = _context21.v;
          res.status(400).json({
            success: false,
            message: _t21.message
          });
        case 5:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 4]]);
  }));
  return function (_x43, _x44) {
    return _ref21.apply(this, arguments);
  };
}()));
app.put("/api/friends/:id/accept", asyncHandler(/*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
    var friendship, _t22;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _context22.p = 0;
          _context22.n = 1;
          return _database.FriendsService.acceptFriendRequest(req.params.id);
        case 1:
          friendship = _context22.v;
          res.json({
            success: true,
            friendship: friendship
          });
          _context22.n = 3;
          break;
        case 2:
          _context22.p = 2;
          _t22 = _context22.v;
          res.status(500).json({
            success: false,
            message: _t22.message
          });
        case 3:
          return _context22.a(2);
      }
    }, _callee22, null, [[0, 2]]);
  }));
  return function (_x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}()));
app["delete"]("/api/friends/:id/reject", asyncHandler(/*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
    var result, _t23;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          _context23.n = 1;
          return _database.FriendsService.rejectFriendRequest(req.params.id);
        case 1:
          result = _context23.v;
          res.json({
            success: true,
            message: result.message
          });
          _context23.n = 3;
          break;
        case 2:
          _context23.p = 2;
          _t23 = _context23.v;
          res.status(500).json({
            success: false,
            message: _t23.message
          });
        case 3:
          return _context23.a(2);
      }
    }, _callee23, null, [[0, 2]]);
  }));
  return function (_x47, _x48) {
    return _ref23.apply(this, arguments);
  };
}()));
app["delete"]("/api/friends/:userId1/:userId2", asyncHandler(/*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
    var result, _t24;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _context24.p = 0;
          _context24.n = 1;
          return _database.FriendsService.removeFriend(req.params.userId1, req.params.userId2);
        case 1:
          result = _context24.v;
          res.json({
            success: true,
            message: result.message
          });
          _context24.n = 3;
          break;
        case 2:
          _context24.p = 2;
          _t24 = _context24.v;
          res.status(500).json({
            success: false,
            message: _t24.message
          });
        case 3:
          return _context24.a(2);
      }
    }, _callee24, null, [[0, 2]]);
  }));
  return function (_x49, _x50) {
    return _ref24.apply(this, arguments);
  };
}()));
app.get("/api/friends/:userId", asyncHandler(/*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
    var friends, _t25;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _context25.p = 0;
          _context25.n = 1;
          return _database.FriendsService.getUserFriends(req.params.userId);
        case 1:
          friends = _context25.v;
          res.json({
            success: true,
            friends: friends
          });
          _context25.n = 3;
          break;
        case 2:
          _context25.p = 2;
          _t25 = _context25.v;
          res.status(500).json({
            success: false,
            message: _t25.message
          });
        case 3:
          return _context25.a(2);
      }
    }, _callee25, null, [[0, 2]]);
  }));
  return function (_x51, _x52) {
    return _ref25.apply(this, arguments);
  };
}()));
app.get("/api/friends/:userId/pending", asyncHandler(/*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(req, res) {
    var pendingRequests, _t26;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          _context26.p = 0;
          _context26.n = 1;
          return _database.FriendsService.getPendingFriendRequests(req.params.userId);
        case 1:
          pendingRequests = _context26.v;
          res.json({
            success: true,
            pendingRequests: pendingRequests
          });
          _context26.n = 3;
          break;
        case 2:
          _context26.p = 2;
          _t26 = _context26.v;
          res.status(500).json({
            success: false,
            message: _t26.message
          });
        case 3:
          return _context26.a(2);
      }
    }, _callee26, null, [[0, 2]]);
  }));
  return function (_x53, _x54) {
    return _ref26.apply(this, arguments);
  };
}()));
app.get("/api/friends/status/:userId1/:userId2", asyncHandler(/*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(req, res) {
    var status, _t27;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _context27.p = 0;
          _context27.n = 1;
          return _database.FriendsService.getFriendshipStatus(req.params.userId1, req.params.userId2);
        case 1:
          status = _context27.v;
          res.json({
            success: true,
            status: status
          });
          _context27.n = 3;
          break;
        case 2:
          _context27.p = 2;
          _t27 = _context27.v;
          res.status(500).json({
            success: false,
            message: _t27.message
          });
        case 3:
          return _context27.a(2);
      }
    }, _callee27, null, [[0, 2]]);
  }));
  return function (_x55, _x56) {
    return _ref27.apply(this, arguments);
  };
}()));

// FEED ROUTES
app.get("/api/feed/global", asyncHandler(/*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(req, res) {
    var projects, feedItems, _t28;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          _context28.p = 0;
          _context28.n = 1;
          return _database.ProjectService.getAllProjects();
        case 1:
          projects = _context28.v;
          // Generate feed items from all projects
          feedItems = [];
          if (projects.length === 0) {
            feedItems.push({
              type: 'welcome',
              message: 'Welcome to GitGud! No projects yet - be the first to create one!',
              timestamp: new Date()
            });
          } else {
            // Add recent project activities
            projects.forEach(function (project) {
              // Recent check-ins
              if (project.checkIns && project.checkIns.length > 0) {
                var latestCheckIn = project.checkIns[project.checkIns.length - 1];
                var checkInDate = new Date(latestCheckIn.timestamp);
                feedItems.push({
                  type: 'checkin',
                  projectName: project.name,
                  projectId: project._id,
                  message: latestCheckIn.message,
                  timestamp: checkInDate,
                  author: latestCheckIn.userId
                });
              }

              // New projects (created in last 7 days)
              var projectCreated = new Date(project.createdAt);
              var daysSinceCreated = (new Date() - projectCreated) / (1000 * 60 * 60 * 24);
              if (daysSinceCreated <= 7) {
                feedItems.push({
                  type: 'project_created',
                  projectName: project.name,
                  projectId: project._id,
                  message: "New project \"".concat(project.name, "\" was created"),
                  timestamp: projectCreated,
                  author: project.ownerId
                });
              }
            });
          }

          // Sort by timestamp (newest first)
          feedItems.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          res.json({
            success: true,
            feedItems: feedItems.slice(0, 20)
          }); // Limit to 20 items
          _context28.n = 3;
          break;
        case 2:
          _context28.p = 2;
          _t28 = _context28.v;
          res.status(500).json({
            success: false,
            message: _t28.message
          });
        case 3:
          return _context28.a(2);
      }
    }, _callee28, null, [[0, 2]]);
  }));
  return function (_x57, _x58) {
    return _ref28.apply(this, arguments);
  };
}()));
app.get("/api/feed/local/:userId", asyncHandler(/*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(req, res) {
    var userId, userFriends, friendIds, userProjects, allProjects, memberProjects, friendProjects, relevantProjects, uniqueProjects, feedItems, _t29;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          _context29.p = 0;
          userId = req.params.userId; // Get user's friends
          _context29.n = 1;
          return _database.FriendsService.getUserFriends(userId);
        case 1:
          userFriends = _context29.v;
          friendIds = userFriends.map(function (friend) {
            return friend._id;
          }); // Get user's projects and friend projects
          _context29.n = 2;
          return _database.ProjectService.getProjectsByUser(userId);
        case 2:
          userProjects = _context29.v;
          _context29.n = 3;
          return _database.ProjectService.getAllProjects();
        case 3:
          allProjects = _context29.v;
          memberProjects = allProjects.filter(function (project) {
            return project.members && project.members.includes(userId);
          }); // Get friend projects
          friendProjects = allProjects.filter(function (project) {
            return friendIds.includes(project.ownerId) || project.members && project.members.some(function (memberId) {
              return friendIds.includes(memberId);
            });
          }); // Combine relevant projects
          relevantProjects = [].concat(_toConsumableArray(userProjects), _toConsumableArray(memberProjects), _toConsumableArray(friendProjects)); // Remove duplicates
          uniqueProjects = relevantProjects.filter(function (project, index, self) {
            return index === self.findIndex(function (p) {
              return p._id.toString() === project._id.toString();
            });
          });
          feedItems = [];
          if (uniqueProjects.length === 0) {
            feedItems.push({
              type: 'local_welcome',
              message: 'Your local feed is empty. Create projects or connect with friends to see their activity!',
              timestamp: new Date()
            });
          } else {
            // Generate feed items from relevant projects
            uniqueProjects.forEach(function (project) {
              if (project.checkIns && project.checkIns.length > 0) {
                var latestCheckIn = project.checkIns[project.checkIns.length - 1];
                var checkInDate = new Date(latestCheckIn.timestamp);
                feedItems.push({
                  type: 'local_checkin',
                  projectName: project.name,
                  projectId: project._id,
                  message: latestCheckIn.message,
                  timestamp: checkInDate,
                  author: latestCheckIn.userId,
                  isOwner: project.ownerId === userId,
                  isMember: project.members && project.members.includes(userId)
                });
              }
            });
          }

          // Sort by timestamp (newest first)
          feedItems.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
          res.json({
            success: true,
            feedItems: feedItems.slice(0, 20)
          }); // Limit to 20 items
          _context29.n = 5;
          break;
        case 4:
          _context29.p = 4;
          _t29 = _context29.v;
          res.status(500).json({
            success: false,
            message: _t29.message
          });
        case 5:
          return _context29.a(2);
      }
    }, _callee29, null, [[0, 4]]);
  }));
  return function (_x59, _x60) {
    return _ref29.apply(this, arguments);
  };
}()));

// Error handling middleware
app.use(function (error, req, res, next) {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Catch-all route for frontend
app.use(function (req, res) {
  res.sendFile("index.html", {
    root: "frontend/public"
  });
});
app.listen(3000, function () {
  console.log("Listening on localhost:3000");
});