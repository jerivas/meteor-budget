Budgets = new Mongo.Collection('budgets');

Budgets.attachSchema(
    new SimpleSchema({
    title: {
      type: String,
      max: 100
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    },
    transactionCount: {
      type: Number,
      min: 0
    },
    balance: {
      type: Number,
      decimal: true
    },
    ownerId: {
      type: String,
      optional: true
    }
  })
);

// We're being lax with check() here because SimpleSchema
// does the validation.
Meteor.methods({
  addBudget: function (budget, redirect) {
    check(budget, Object);
    check(redirect, Match.Optional(String));
    var budgetId = Budgets.insert(budget);
    if (redirect && Meteor.isClient) {
      Router.go(redirect, {_id: budgetId});
    }
  },
  removeBudget: function (budget, redirect) {
    check(budget, Object);
    check(redirect, Match.Optional(String));
    Transactions.remove({budgetId: budget._id});
    Budgets.remove({_id: budget._id});
    Meteor.users.update(this.userId, {$inc: {
      "profile.balance": -budget.balance
    }});
    if (redirect && Meteor.isClient) {
      Router.go(redirect);
    }
  }
});

// Deny all client-side operations
if (Meteor.isServer) {
  Budgets.deny({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}
