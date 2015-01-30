Template.transactionItem.events({
  'click .negative.button': function () {
    Meteor.call("removeTransaction", this);
  }
});
