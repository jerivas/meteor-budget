Meteor.publish('transactions', function () {
  return Transactions.find({ownerId: this.userId});
});
