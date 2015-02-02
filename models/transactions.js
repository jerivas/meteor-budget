Transactions = new Mongo.Collection('transactions');

Transactions.attachSchema(
    new SimpleSchema({
    title: {
      type: String,
      max: 100
    },
    amount: {
      type: Number,
      decimal: true
    },
    createdAt: {
      type: Date
    },
    budgetId: {
      type: String
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
  addTransaction: function (transaction) {
    check(transaction, Object);
    Transactions.insert(transaction);
    Budgets.update(transaction.budgetId, {$inc: {
      transactionCount: 1,
      balance: parseFloat(transaction.amount)
    }});
    Meteor.users.update(this.userId, {$inc: {
      "profile.balance": parseFloat(transaction.amount)
    }});
  },
  removeTransaction: function (transaction) {
    check(transaction, Object);
    Transactions.remove({_id: transaction._id});
    Budgets.update(transaction.budgetId, {$inc: {
      transactionCount: -1,
      balance: -parseFloat(transaction.amount)
    }});
    Meteor.users.update(this.userId, {$inc: {
      "profile.balance": -parseFloat(transaction.amount)
    }});
  }
});

// Deny all client-side operations
if (Meteor.isServer) {
  Transactions.deny({
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
