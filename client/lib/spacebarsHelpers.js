// Global helpers
Template.registerHelper("debug", function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }
    return "";
  }
  // For IE8
  alert(this);
  if (optionalValue) {
    alert(optionalValue);
  }
  return "";
});
Template.registerHelper("constant", function (what) {
  return Meteor.App[what.toUpperCase()];
});
// Wrapper for accounting.js "formatMoney"
// We handle a special case where Spacebar will pass amount as "false" if it is 0
Template.registerHelper("formatMoney", function(amount) {
    if (!amount) amount = 0;
    return accounting.formatMoney(amount);
});
// Wrappers for moment.js "calendar" and "fromNow"
Template.registerHelper("calendar", function(date) {
  if (date) {
    return moment(date).calendar();
  }
});
Template.registerHelper("fromNow", function(date) {
  if (date) {
    return moment(date).fromNow();
  }
});
// Provides red, blue, gray classes depending on the number passed
Template.registerHelper("colorByNumber", function(number) {
  var color = "";
  if (number > 0.0) {
    color = "green";
  } else if (number < 0.0) {
    color = "red";
  }
  return color;
});
// Return "out" if Session.equals(key, value)
// If "out" is and Object (which is the case if it not passed to the helper),
// return a default value of "active"
Template.registerHelper("sessionEq", function(key, value, out) {
  var returnVal = "";
  if (Session.equals(key, value)) {
    returnVal = _.isObject(out) ? "active" : out;
  }
  return returnVal;
});
// Same as above, but compares between value and a Router param
Template.registerHelper("routeEq", function(param, value, out) {
  var returnVal = "";
  if (Router.current().params[param] == value) {
    returnVal = _.isObject(out) ? "active" : out;
  }
  return returnVal;
});
