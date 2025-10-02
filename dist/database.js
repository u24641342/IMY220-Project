"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = exports.ProjectService = exports.FriendsService = void 0;
exports.connectDB = connectDB;
exports.getDB = getDB;
var _mongodb = require("mongodb");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var connectionString = "mongodb+srv://admin:admin@imy220-ass3.0bmh7gw.mongodb.net/?retryWrites=true&w=majority&appName=IMY220-ASS3";
var dbName = "GitGud";
var db = null;

// Initialize database connection
function connectDB() {
  return _connectDB.apply(this, arguments);
} // Get database instance
function _connectDB() {
  _connectDB = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28() {
    var client, _t28;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          _context28.p = 0;
          client = new _mongodb.MongoClient(connectionString);
          _context28.n = 1;
          return client.connect();
        case 1:
          db = client.db(dbName);
          return _context28.a(2, db);
        case 2:
          _context28.p = 2;
          _t28 = _context28.v;
          console.error("Database connection error:", _t28);
          throw _t28;
        case 3:
          return _context28.a(2);
      }
    }, _callee28, null, [[0, 2]]);
  }));
  return _connectDB.apply(this, arguments);
}
function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

// USER CRUD OPERATIONS
var UserService = exports.UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }
  return _createClass(UserService, null, [{
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userData) {
        var _db, existingUser, user, result, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _db = getDB();
              _context.n = 1;
              return _db.collection('users').findOne({
                email: userData.email
              });
            case 1:
              existingUser = _context.v;
              if (!existingUser) {
                _context.n = 2;
                break;
              }
              throw new Error('User with this email already exists');
            case 2:
              user = _objectSpread(_objectSpread({}, userData), {}, {
                createdAt: new Date(),
                profilePicture: userData.profilePicture || null,
                bio: userData.bio || "",
                skills: userData.skills || [],
                projects: [],
                friends: []
              });
              _context.n = 3;
              return _db.collection('users').insertOne(user);
            case 3:
              result = _context.v;
              return _context.a(2, _objectSpread(_objectSpread({}, user), {}, {
                _id: result.insertedId
              }));
            case 4:
              _context.p = 4;
              _t = _context.v;
              throw _t;
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[0, 4]]);
      }));
      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId) {
        var _db2, user, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _db2 = getDB();
              _context2.n = 1;
              return _db2.collection('users').findOne({
                _id: new _mongodb.ObjectId(userId)
              });
            case 1:
              user = _context2.v;
              return _context2.a(2, user);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw _t2;
            case 3:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 2]]);
      }));
      function getUserById(_x2) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(email) {
        var _db3, user, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _db3 = getDB();
              _context3.n = 1;
              return _db3.collection('users').findOne({
                email: email
              });
            case 1:
              user = _context3.v;
              return _context3.a(2, user);
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              throw _t3;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function getUserByEmail(_x3) {
        return _getUserByEmail.apply(this, arguments);
      }
      return getUserByEmail;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId, updateData) {
        var _db4, result, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _db4 = getDB();
              _context4.n = 1;
              return _db4.collection('users').updateOne({
                _id: new _mongodb.ObjectId(userId)
              }, {
                $set: updateData
              });
            case 1:
              result = _context4.v;
              if (!(result.matchedCount === 0)) {
                _context4.n = 2;
                break;
              }
              throw new Error('User not found');
            case 2:
              _context4.n = 3;
              return this.getUserById(userId);
            case 3:
              return _context4.a(2, _context4.v);
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              throw _t4;
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 4]]);
      }));
      function updateUser(_x4, _x5) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
        var _db5, result, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _db5 = getDB();
              _context5.n = 1;
              return _db5.collection('users').deleteOne({
                _id: new _mongodb.ObjectId(userId)
              });
            case 1:
              result = _context5.v;
              if (!(result.deletedCount === 0)) {
                _context5.n = 2;
                break;
              }
              throw new Error('User not found');
            case 2:
              return _context5.a(2, {
                message: 'User deleted successfully'
              });
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw _t5;
            case 4:
              return _context5.a(2);
          }
        }, _callee5, null, [[0, 3]]);
      }));
      function deleteUser(_x6) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _db6, users, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _db6 = getDB();
              _context6.n = 1;
              return _db6.collection('users').find({}).toArray();
            case 1:
              users = _context6.v;
              return _context6.a(2, users);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw _t6;
            case 3:
              return _context6.a(2);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }
      return getAllUsers;
    }()
  }, {
    key: "searchUsers",
    value: function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(searchTerm) {
        var _db7, users, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _db7 = getDB();
              _context7.n = 1;
              return _db7.collection('users').find({
                $or: [{
                  name: {
                    $regex: searchTerm,
                    $options: 'i'
                  }
                }, {
                  email: {
                    $regex: searchTerm,
                    $options: 'i'
                  }
                }, {
                  skills: {
                    $in: [new RegExp(searchTerm, 'i')]
                  }
                }]
              }).toArray();
            case 1:
              users = _context7.v;
              return _context7.a(2, users);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              throw _t7;
            case 3:
              return _context7.a(2);
          }
        }, _callee7, null, [[0, 2]]);
      }));
      function searchUsers(_x7) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
  }]);
}(); // PROJECT CRUD OPERATIONS
var ProjectService = exports.ProjectService = /*#__PURE__*/function () {
  function ProjectService() {
    _classCallCheck(this, ProjectService);
  }
  return _createClass(ProjectService, null, [{
    key: "createProject",
    value: function () {
      var _createProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(projectData) {
        var _db8, project, result, newProject, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _db8 = getDB();
              project = _objectSpread(_objectSpread({}, projectData), {}, {
                createdAt: new Date(),
                members: projectData.members || [],
                checkIns: [],
                files: projectData.files || [],
                status: projectData.status || 'active',
                visibility: projectData.visibility || 'public'
              });
              _context8.n = 1;
              return _db8.collection('projects').insertOne(project);
            case 1:
              result = _context8.v;
              newProject = _objectSpread(_objectSpread({}, project), {}, {
                _id: result.insertedId
              }); // Add project to owner's projects array
              if (!projectData.ownerId) {
                _context8.n = 2;
                break;
              }
              _context8.n = 2;
              return _db8.collection('users').updateOne({
                _id: new _mongodb.ObjectId(projectData.ownerId)
              }, {
                $push: {
                  projects: result.insertedId
                }
              });
            case 2:
              return _context8.a(2, newProject);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw _t8;
            case 4:
              return _context8.a(2);
          }
        }, _callee8, null, [[0, 3]]);
      }));
      function createProject(_x8) {
        return _createProject.apply(this, arguments);
      }
      return createProject;
    }()
  }, {
    key: "getProjectById",
    value: function () {
      var _getProjectById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(projectId) {
        var _db9, project, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _db9 = getDB();
              _context9.n = 1;
              return _db9.collection('projects').findOne({
                _id: new _mongodb.ObjectId(projectId)
              });
            case 1:
              project = _context9.v;
              return _context9.a(2, project);
            case 2:
              _context9.p = 2;
              _t9 = _context9.v;
              throw _t9;
            case 3:
              return _context9.a(2);
          }
        }, _callee9, null, [[0, 2]]);
      }));
      function getProjectById(_x9) {
        return _getProjectById.apply(this, arguments);
      }
      return getProjectById;
    }()
  }, {
    key: "updateProject",
    value: function () {
      var _updateProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(projectId, updateData) {
        var _db0, result, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _db0 = getDB();
              _context0.n = 1;
              return _db0.collection('projects').updateOne({
                _id: new _mongodb.ObjectId(projectId)
              }, {
                $set: updateData
              });
            case 1:
              result = _context0.v;
              if (!(result.matchedCount === 0)) {
                _context0.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              _context0.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context0.a(2, _context0.v);
            case 4:
              _context0.p = 4;
              _t0 = _context0.v;
              throw _t0;
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 4]]);
      }));
      function updateProject(_x0, _x1) {
        return _updateProject.apply(this, arguments);
      }
      return updateProject;
    }()
  }, {
    key: "deleteProject",
    value: function () {
      var _deleteProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(projectId) {
        var _db1, result, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _db1 = getDB(); // Remove project from all users' projects arrays
              _context1.n = 1;
              return _db1.collection('users').updateMany({
                projects: new _mongodb.ObjectId(projectId)
              }, {
                $pull: {
                  projects: new _mongodb.ObjectId(projectId)
                }
              });
            case 1:
              _context1.n = 2;
              return _db1.collection('projects').deleteOne({
                _id: new _mongodb.ObjectId(projectId)
              });
            case 2:
              result = _context1.v;
              if (!(result.deletedCount === 0)) {
                _context1.n = 3;
                break;
              }
              throw new Error('Project not found');
            case 3:
              return _context1.a(2, {
                message: 'Project deleted successfully'
              });
            case 4:
              _context1.p = 4;
              _t1 = _context1.v;
              throw _t1;
            case 5:
              return _context1.a(2);
          }
        }, _callee1, null, [[0, 4]]);
      }));
      function deleteProject(_x10) {
        return _deleteProject.apply(this, arguments);
      }
      return deleteProject;
    }()
  }, {
    key: "getAllProjects",
    value: function () {
      var _getAllProjects = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var _db10, projects, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _db10 = getDB();
              _context10.n = 1;
              return _db10.collection('projects').find({}).toArray();
            case 1:
              projects = _context10.v;
              return _context10.a(2, projects);
            case 2:
              _context10.p = 2;
              _t10 = _context10.v;
              throw _t10;
            case 3:
              return _context10.a(2);
          }
        }, _callee10, null, [[0, 2]]);
      }));
      function getAllProjects() {
        return _getAllProjects.apply(this, arguments);
      }
      return getAllProjects;
    }()
  }, {
    key: "getProjectsByUser",
    value: function () {
      var _getProjectsByUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(userId) {
        var _db11, projects, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _db11 = getDB();
              _context11.n = 1;
              return _db11.collection('projects').find({
                $or: [{
                  ownerId: userId
                }, {
                  members: userId
                }]
              }).toArray();
            case 1:
              projects = _context11.v;
              return _context11.a(2, projects);
            case 2:
              _context11.p = 2;
              _t11 = _context11.v;
              throw _t11;
            case 3:
              return _context11.a(2);
          }
        }, _callee11, null, [[0, 2]]);
      }));
      function getProjectsByUser(_x11) {
        return _getProjectsByUser.apply(this, arguments);
      }
      return getProjectsByUser;
    }()
  }, {
    key: "addMemberToProject",
    value: function () {
      var _addMemberToProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(projectId, memberId) {
        var _db12, result, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _db12 = getDB();
              _context12.n = 1;
              return _db12.collection('projects').updateOne({
                _id: new _mongodb.ObjectId(projectId)
              }, {
                $addToSet: {
                  members: memberId
                }
              });
            case 1:
              result = _context12.v;
              if (!(result.matchedCount === 0)) {
                _context12.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              _context12.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context12.a(2, _context12.v);
            case 4:
              _context12.p = 4;
              _t12 = _context12.v;
              throw _t12;
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 4]]);
      }));
      function addMemberToProject(_x12, _x13) {
        return _addMemberToProject.apply(this, arguments);
      }
      return addMemberToProject;
    }()
  }, {
    key: "removeMemberFromProject",
    value: function () {
      var _removeMemberFromProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(projectId, memberId) {
        var _db13, result, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _db13 = getDB();
              _context13.n = 1;
              return _db13.collection('projects').updateOne({
                _id: new _mongodb.ObjectId(projectId)
              }, {
                $pull: {
                  members: memberId
                }
              });
            case 1:
              result = _context13.v;
              if (!(result.matchedCount === 0)) {
                _context13.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              _context13.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context13.a(2, _context13.v);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw _t13;
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function removeMemberFromProject(_x14, _x15) {
        return _removeMemberFromProject.apply(this, arguments);
      }
      return removeMemberFromProject;
    }()
  }, {
    key: "addCheckIn",
    value: function () {
      var _addCheckIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(projectId, checkInData) {
        var _db14, checkIn, result, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _db14 = getDB();
              checkIn = _objectSpread(_objectSpread({
                _id: new _mongodb.ObjectId()
              }, checkInData), {}, {
                timestamp: new Date(),
                comments: []
              });
              _context14.n = 1;
              return _db14.collection('projects').updateOne({
                _id: new _mongodb.ObjectId(projectId)
              }, {
                $push: {
                  checkIns: checkIn
                }
              });
            case 1:
              result = _context14.v;
              if (!(result.matchedCount === 0)) {
                _context14.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              return _context14.a(2, checkIn);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw _t14;
            case 4:
              return _context14.a(2);
          }
        }, _callee14, null, [[0, 3]]);
      }));
      function addCheckIn(_x16, _x17) {
        return _addCheckIn.apply(this, arguments);
      }
      return addCheckIn;
    }()
  }, {
    key: "addCommentToCheckIn",
    value: function () {
      var _addCommentToCheckIn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(projectId, checkInId, commentData) {
        var _db15, comment, result, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _db15 = getDB();
              comment = _objectSpread(_objectSpread({
                _id: new _mongodb.ObjectId()
              }, commentData), {}, {
                timestamp: new Date()
              });
              _context15.n = 1;
              return _db15.collection('projects').updateOne({
                _id: new _mongodb.ObjectId(projectId),
                "checkIns._id": new _mongodb.ObjectId(checkInId)
              }, {
                $push: {
                  "checkIns.$.comments": comment
                }
              });
            case 1:
              result = _context15.v;
              if (!(result.matchedCount === 0)) {
                _context15.n = 2;
                break;
              }
              throw new Error('Project or check-in not found');
            case 2:
              return _context15.a(2, comment);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw _t15;
            case 4:
              return _context15.a(2);
          }
        }, _callee15, null, [[0, 3]]);
      }));
      function addCommentToCheckIn(_x18, _x19, _x20) {
        return _addCommentToCheckIn.apply(this, arguments);
      }
      return addCommentToCheckIn;
    }()
  }, {
    key: "searchProjects",
    value: function () {
      var _searchProjects = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(searchTerm) {
        var _db16, projects, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _db16 = getDB();
              _context16.n = 1;
              return _db16.collection('projects').find({
                $or: [{
                  name: {
                    $regex: searchTerm,
                    $options: 'i'
                  }
                }, {
                  description: {
                    $regex: searchTerm,
                    $options: 'i'
                  }
                }, {
                  tags: {
                    $in: [new RegExp(searchTerm, 'i')]
                  }
                }]
              }).toArray();
            case 1:
              projects = _context16.v;
              return _context16.a(2, projects);
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw _t16;
            case 3:
              return _context16.a(2);
          }
        }, _callee16, null, [[0, 2]]);
      }));
      function searchProjects(_x21) {
        return _searchProjects.apply(this, arguments);
      }
      return searchProjects;
    }() // File management methods
  }, {
    key: "addFileToProject",
    value: function () {
      var _addFileToProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(projectId, fileData) {
        var _db17, objectId, fileObject, result, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _db17 = getDB();
              objectId = _mongodb.ObjectId.isValid(projectId) ? new _mongodb.ObjectId(projectId) : projectId;
              fileObject = {
                _id: new _mongodb.ObjectId(),
                name: fileData.name,
                originalName: fileData.originalName || fileData.name,
                size: fileData.size || 0,
                type: fileData.type || 'application/octet-stream',
                uploadedBy: fileData.uploadedBy,
                uploadedAt: new Date(),
                content: fileData.content || null,
                // Base64 encoded content
                url: fileData.url || null // For external files
              };
              _context17.n = 1;
              return _db17.collection('projects').updateOne({
                _id: objectId
              }, {
                $addToSet: {
                  files: fileObject
                }
              });
            case 1:
              result = _context17.v;
              if (!(result.matchedCount === 0)) {
                _context17.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              _context17.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context17.a(2, _context17.v);
            case 4:
              _context17.p = 4;
              _t17 = _context17.v;
              throw _t17;
            case 5:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function addFileToProject(_x22, _x23) {
        return _addFileToProject.apply(this, arguments);
      }
      return addFileToProject;
    }()
  }, {
    key: "removeFileFromProject",
    value: function () {
      var _removeFileFromProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(projectId, fileId) {
        var _db18, projectObjectId, fileObjectId, result, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _db18 = getDB();
              projectObjectId = _mongodb.ObjectId.isValid(projectId) ? new _mongodb.ObjectId(projectId) : projectId;
              fileObjectId = _mongodb.ObjectId.isValid(fileId) ? new _mongodb.ObjectId(fileId) : fileId;
              _context18.n = 1;
              return _db18.collection('projects').updateOne({
                _id: projectObjectId
              }, {
                $pull: {
                  files: {
                    _id: fileObjectId
                  }
                }
              });
            case 1:
              result = _context18.v;
              if (!(result.matchedCount === 0)) {
                _context18.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              _context18.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context18.a(2, _context18.v);
            case 4:
              _context18.p = 4;
              _t18 = _context18.v;
              throw _t18;
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 4]]);
      }));
      function removeFileFromProject(_x24, _x25) {
        return _removeFileFromProject.apply(this, arguments);
      }
      return removeFileFromProject;
    }()
  }, {
    key: "updateFileInProject",
    value: function () {
      var _updateFileInProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(projectId, fileId, updateData) {
        var _db19, projectObjectId, fileObjectId, updateFields, result, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _db19 = getDB();
              projectObjectId = _mongodb.ObjectId.isValid(projectId) ? new _mongodb.ObjectId(projectId) : projectId;
              fileObjectId = _mongodb.ObjectId.isValid(fileId) ? new _mongodb.ObjectId(fileId) : fileId;
              updateFields = {};
              if (updateData.name) updateFields['files.$.name'] = updateData.name;
              if (updateData.content) updateFields['files.$.content'] = updateData.content;
              if (updateData.type) updateFields['files.$.type'] = updateData.type;
              updateFields['files.$.updatedAt'] = new Date();
              _context19.n = 1;
              return _db19.collection('projects').updateOne({
                _id: projectObjectId,
                'files._id': fileObjectId
              }, {
                $set: updateFields
              });
            case 1:
              result = _context19.v;
              if (!(result.matchedCount === 0)) {
                _context19.n = 2;
                break;
              }
              throw new Error('Project or file not found');
            case 2:
              _context19.n = 3;
              return this.getProjectById(projectId);
            case 3:
              return _context19.a(2, _context19.v);
            case 4:
              _context19.p = 4;
              _t19 = _context19.v;
              throw _t19;
            case 5:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 4]]);
      }));
      function updateFileInProject(_x26, _x27, _x28) {
        return _updateFileInProject.apply(this, arguments);
      }
      return updateFileInProject;
    }()
  }, {
    key: "getFileFromProject",
    value: function () {
      var _getFileFromProject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(projectId, fileId) {
        var _db20, projectObjectId, fileObjectId, project, file, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _db20 = getDB();
              projectObjectId = _mongodb.ObjectId.isValid(projectId) ? new _mongodb.ObjectId(projectId) : projectId;
              fileObjectId = _mongodb.ObjectId.isValid(fileId) ? new _mongodb.ObjectId(fileId) : fileId;
              _context20.n = 1;
              return _db20.collection('projects').findOne({
                _id: projectObjectId
              }, {
                projection: {
                  files: 1
                }
              });
            case 1:
              project = _context20.v;
              if (project) {
                _context20.n = 2;
                break;
              }
              throw new Error('Project not found');
            case 2:
              file = project.files.find(function (f) {
                return f._id.toString() === fileObjectId.toString();
              });
              if (file) {
                _context20.n = 3;
                break;
              }
              throw new Error('File not found');
            case 3:
              return _context20.a(2, file);
            case 4:
              _context20.p = 4;
              _t20 = _context20.v;
              throw _t20;
            case 5:
              return _context20.a(2);
          }
        }, _callee20, null, [[0, 4]]);
      }));
      function getFileFromProject(_x29, _x30) {
        return _getFileFromProject.apply(this, arguments);
      }
      return getFileFromProject;
    }()
  }]);
}(); // FRIENDS CRUD OPERATIONS
var FriendsService = exports.FriendsService = /*#__PURE__*/function () {
  function FriendsService() {
    _classCallCheck(this, FriendsService);
  }
  return _createClass(FriendsService, null, [{
    key: "sendFriendRequest",
    value: function () {
      var _sendFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(fromUserId, toUserId) {
        var _db21, existingFriendship, friendship, result, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _db21 = getDB(); // Check if friendship already exists
              _context21.n = 1;
              return _db21.collection('friends').findOne({
                $or: [{
                  user1: fromUserId,
                  user2: toUserId
                }, {
                  user1: toUserId,
                  user2: fromUserId
                }]
              });
            case 1:
              existingFriendship = _context21.v;
              if (!existingFriendship) {
                _context21.n = 2;
                break;
              }
              throw new Error('Friendship request already exists or users are already friends');
            case 2:
              friendship = {
                user1: fromUserId,
                user2: toUserId,
                status: 'pending',
                requestedBy: fromUserId,
                createdAt: new Date()
              };
              _context21.n = 3;
              return _db21.collection('friends').insertOne(friendship);
            case 3:
              result = _context21.v;
              return _context21.a(2, _objectSpread(_objectSpread({}, friendship), {}, {
                _id: result.insertedId
              }));
            case 4:
              _context21.p = 4;
              _t21 = _context21.v;
              throw _t21;
            case 5:
              return _context21.a(2);
          }
        }, _callee21, null, [[0, 4]]);
      }));
      function sendFriendRequest(_x31, _x32) {
        return _sendFriendRequest.apply(this, arguments);
      }
      return sendFriendRequest;
    }()
  }, {
    key: "acceptFriendRequest",
    value: function () {
      var _acceptFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(friendshipId) {
        var _db22, result, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _db22 = getDB();
              _context22.n = 1;
              return _db22.collection('friends').updateOne({
                _id: new _mongodb.ObjectId(friendshipId)
              }, {
                $set: {
                  status: 'accepted'
                }
              });
            case 1:
              result = _context22.v;
              if (!(result.matchedCount === 0)) {
                _context22.n = 2;
                break;
              }
              throw new Error('Friend request not found');
            case 2:
              _context22.n = 3;
              return _db22.collection('friends').findOne({
                _id: new _mongodb.ObjectId(friendshipId)
              });
            case 3:
              return _context22.a(2, _context22.v);
            case 4:
              _context22.p = 4;
              _t22 = _context22.v;
              throw _t22;
            case 5:
              return _context22.a(2);
          }
        }, _callee22, null, [[0, 4]]);
      }));
      function acceptFriendRequest(_x33) {
        return _acceptFriendRequest.apply(this, arguments);
      }
      return acceptFriendRequest;
    }()
  }, {
    key: "rejectFriendRequest",
    value: function () {
      var _rejectFriendRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(friendshipId) {
        var _db23, result, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _db23 = getDB();
              _context23.n = 1;
              return _db23.collection('friends').deleteOne({
                _id: new _mongodb.ObjectId(friendshipId)
              });
            case 1:
              result = _context23.v;
              if (!(result.deletedCount === 0)) {
                _context23.n = 2;
                break;
              }
              throw new Error('Friend request not found');
            case 2:
              return _context23.a(2, {
                message: 'Friend request rejected'
              });
            case 3:
              _context23.p = 3;
              _t23 = _context23.v;
              throw _t23;
            case 4:
              return _context23.a(2);
          }
        }, _callee23, null, [[0, 3]]);
      }));
      function rejectFriendRequest(_x34) {
        return _rejectFriendRequest.apply(this, arguments);
      }
      return rejectFriendRequest;
    }()
  }, {
    key: "removeFriend",
    value: function () {
      var _removeFriend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(userId1, userId2) {
        var _db24, result, _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _db24 = getDB();
              _context24.n = 1;
              return _db24.collection('friends').deleteOne({
                $or: [{
                  user1: userId1,
                  user2: userId2
                }, {
                  user1: userId2,
                  user2: userId1
                }]
              });
            case 1:
              result = _context24.v;
              if (!(result.deletedCount === 0)) {
                _context24.n = 2;
                break;
              }
              throw new Error('Friendship not found');
            case 2:
              return _context24.a(2, {
                message: 'Friend removed successfully'
              });
            case 3:
              _context24.p = 3;
              _t24 = _context24.v;
              throw _t24;
            case 4:
              return _context24.a(2);
          }
        }, _callee24, null, [[0, 3]]);
      }));
      function removeFriend(_x35, _x36) {
        return _removeFriend.apply(this, arguments);
      }
      return removeFriend;
    }()
  }, {
    key: "getUserFriends",
    value: function () {
      var _getUserFriends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(userId) {
        var _db25, friendships, friendIds, friends, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _db25 = getDB();
              _context25.n = 1;
              return _db25.collection('friends').find({
                $and: [{
                  $or: [{
                    user1: userId
                  }, {
                    user2: userId
                  }]
                }, {
                  status: 'accepted'
                }]
              }).toArray();
            case 1:
              friendships = _context25.v;
              // Get friend user details
              friendIds = friendships.map(function (friendship) {
                return friendship.user1 === userId ? friendship.user2 : friendship.user1;
              });
              _context25.n = 2;
              return _db25.collection('users').find({
                _id: {
                  $in: friendIds.map(function (id) {
                    return new _mongodb.ObjectId(id);
                  })
                }
              }).toArray();
            case 2:
              friends = _context25.v;
              return _context25.a(2, friends);
            case 3:
              _context25.p = 3;
              _t25 = _context25.v;
              throw _t25;
            case 4:
              return _context25.a(2);
          }
        }, _callee25, null, [[0, 3]]);
      }));
      function getUserFriends(_x37) {
        return _getUserFriends.apply(this, arguments);
      }
      return getUserFriends;
    }()
  }, {
    key: "getPendingFriendRequests",
    value: function () {
      var _getPendingFriendRequests = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(userId) {
        var _db26, pendingRequests, requesterIds, requesters, _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _context26.p = 0;
              _db26 = getDB();
              _context26.n = 1;
              return _db26.collection('friends').find({
                user2: userId,
                status: 'pending'
              }).toArray();
            case 1:
              pendingRequests = _context26.v;
              // Get requester details
              requesterIds = pendingRequests.map(function (req) {
                return new _mongodb.ObjectId(req.user1);
              });
              _context26.n = 2;
              return _db26.collection('users').find({
                _id: {
                  $in: requesterIds
                }
              }).toArray();
            case 2:
              requesters = _context26.v;
              return _context26.a(2, pendingRequests.map(function (request) {
                var requester = requesters.find(function (user) {
                  return user._id.toString() === request.user1;
                });
                return _objectSpread(_objectSpread({}, request), {}, {
                  requesterDetails: requester
                });
              }));
            case 3:
              _context26.p = 3;
              _t26 = _context26.v;
              throw _t26;
            case 4:
              return _context26.a(2);
          }
        }, _callee26, null, [[0, 3]]);
      }));
      function getPendingFriendRequests(_x38) {
        return _getPendingFriendRequests.apply(this, arguments);
      }
      return getPendingFriendRequests;
    }()
  }, {
    key: "getFriendshipStatus",
    value: function () {
      var _getFriendshipStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(userId1, userId2) {
        var _db27, friendship, _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              _context27.p = 0;
              _db27 = getDB();
              _context27.n = 1;
              return _db27.collection('friends').findOne({
                $or: [{
                  user1: userId1,
                  user2: userId2
                }, {
                  user1: userId2,
                  user2: userId1
                }]
              });
            case 1:
              friendship = _context27.v;
              if (friendship) {
                _context27.n = 2;
                break;
              }
              return _context27.a(2, {
                status: 'none'
              });
            case 2:
              return _context27.a(2, friendship);
            case 3:
              _context27.p = 3;
              _t27 = _context27.v;
              throw _t27;
            case 4:
              return _context27.a(2);
          }
        }, _callee27, null, [[0, 3]]);
      }));
      function getFriendshipStatus(_x39, _x40) {
        return _getFriendshipStatus.apply(this, arguments);
      }
      return getFriendshipStatus;
    }()
  }]);
}();