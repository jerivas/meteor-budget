Router.route("/budgets", {
  action: function () {
    // Redirect to the first Budget if it exists
    if (Budgets.find().count() > 0) {
      Router.go("budgetDashboard", Budgets.findOne());
    // Render the dashboard without context if no Budgets exist
    } else {
      this.render("budgetDashboard");
    }
  }
});
Router.route("/budgets/:_id", {
  name: "budgetDashboard",
  data: function () {
    return Budgets.findOne({_id: this.params._id});
  },
  action: function () {
    this.render();
  }
});
