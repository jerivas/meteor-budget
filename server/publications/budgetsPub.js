Meteor.publish('budgets', function () {
  return Budgets.find({ownerId: this.userId});
});
