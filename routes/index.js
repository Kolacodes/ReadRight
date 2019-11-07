var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User     = require("../models/user")

router.get("/", function(req, res) {
    res.render("home");
});


// ===========
// AUTH ROUTES
// ============

// show signup/register form
router.get("/register", function(req, res){
  res.render("register");
});

// signup logic route
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        console.log(err);
        return res.render("register")
      }
      passport.authenticate("local")(req, res, function(){
        res.redirect("/books");
      });
    });
});

// login form route
router.get("/login", function(req, res){
  res.render("login");
});
// login logic route
router.post("/login", passport.authenticate("local",
    {
      successRedirect: "books",
      failureRedirect: "login"
    }), function(req, res){ 
});

// logout route
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/books");
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
};


module.exports = router;
