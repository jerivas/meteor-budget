Template.budgetDashboard.helpers({
  budgets: function () {
    return Budgets.find({});
  },
  transactions: function () {
    return Transactions.find({budgetId: this._id}, {sort: {createdAt: -1}});
  },
  activeTab: function () {
    return Session.get("activeTab");
  }
 });

Template.budgetDashboard.events({
  'click #budgetTabs > a': function (e) {
    Session.set("activeTab", e.target.id);
  },
  'submit #newBudget': function (e) {
    var budget = {
      title: e.target.title.value,
      createdAt: new Date(),
      transactionCount: 0,
      balance: 0,
      ownerId: Meteor.userId(),
    };
    Meteor.call("addBudget", budget, "budgetDashboard");
    e.target.reset();
    return false;
  },
  'click #removeBudget': function () {
    var ok = confirm("You're about to delete the " + this.title + 
        " budget and all related transactions. This action can not " +
        "be undone.");
    if (ok) {
      Meteor.call("removeBudget", this, "budgets");
    }
  },
  'submit #newTransaction': function (e) {
    var dateString = e.target.date.value;
    var date = new Date();
    if (dateString) {
      date = new Date(dateString.split("-"));
    }
    var transaction = {
      title: e.target.title.value,
      amount: e.target.amount.value,
      createdAt: date,
      budgetId: this._id,
      ownerId: Meteor.userId(),
    };
    Meteor.call("addTransaction", transaction);
    e.target.reset();
    return false;
  }
});
