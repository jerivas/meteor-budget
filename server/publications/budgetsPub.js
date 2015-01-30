Meteor.publish('budgets', function () {
  return Budgets.find();
});
