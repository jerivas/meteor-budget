Router.route("/budgets", {
  action: function () {
    // Redirect to the first Budget if it exists
    if (Budgets.find().count() > 0) {
      Router.go("budgetDashboard", Budgets.findOne());
    // Render the dashboard without context if no Budgets exist
    } else {
      this.render("budgetDashboard");
    }
  },
  onAfterAction: function () {
    if (!Meteor.isClient) {
      return;
    }
    SEO.set({title: "Create a budget - " + Meteor.App.NAME});
  }
});
Router.route("/budgets/:_id", {
  name: "budgetDashboard",
  data: function () {
    return Budgets.findOne({_id: this.params._id});
  },
  action: function () {
    this.render();
  },
  onAfterAction: function () {
    if (!Meteor.isClient) {
      return;
    }
    var budget = this.data();
    if (budget) {
      SEO.set({title: budget.title + " - " + Meteor.App.NAME});
    }
  }
});
