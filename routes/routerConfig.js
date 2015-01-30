Router.configure({
  layoutTemplate: 'baseLayout',
  waitOn: function () {
    return [
      Meteor.subscribe("budgets"),
      Meteor.subscribe("transactions")
    ];
  }
});

AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
