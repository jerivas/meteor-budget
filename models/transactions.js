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

Meteor.methods({
  addTransaction: function (transaction) {
    Transactions.insert(transaction);
    Budgets.update(transaction.budgetId, {$inc: {
      transactionCount: 1,
      balance: parseFloat(transaction.amount)
    }});
  },
  removeTransaction: function (transaction) {
    Budgets.update(transaction.budgetId, {$inc: {
      transactionCount: -1,
      balance: -parseFloat(transaction.amount)
    }});
    Transactions.remove({_id: transaction._id});
  }
});
