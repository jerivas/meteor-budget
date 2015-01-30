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

Meteor.methods({
  addBudget: function (budget, redirect) {
    var budgetId = Budgets.insert(budget);
    if (redirect) {
      Router.go(redirect, {_id: budgetId});
    }
  },
  removeBudget: function (budget, redirect) {
    Transactions.remove({budgetId: budget._id});
    Budgets.remove({_id: budget._id});
    if (redirect) {
      Router.go(redirect);
    }
  }
});
