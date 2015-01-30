Router.configure({
  layoutTemplate: "baseLayout",
  notFoundTemplate: "notFound",
  waitOn: function () {
    return [
      Meteor.subscribe("budgets"),
      Meteor.subscribe("transactions")
    ];
  }
});

AccountsTemplates.configureRoute("signIn", {
	redirect: "budgets",
});
AccountsTemplates.configureRoute("signUp", {
	redirect: "budgets",
});
