$(function() {
  var tf = window.tf || {};
  window.tf = tf;

  // tf.App is a root level Backbone router that organizes this app's views.
  // --------------------------------------------------------------------------
  var App = tf.App = Backbone.Router.extend({
    // Listen for changes in the URL #status/<tweet-id>.  We will then
    // re-render the DOM node under content to display the tweet identified
    // by that ID.
    routes: {
      'status/:id': 'viewStatus'
    },
    // Override the initialize function to create instances of our Tweets
    // collection and wire it up to instances of our views.
    initialize: function() {
      this.tweets = new tf.models.Tweets();
      this.tweetsView = new tf.views.Tweets({
        el: $("#tweets"),
        model: this.tweets
      });
      this.filterView = new tf.views.Filter({
        el: $("#header form")
      });
      this.filterView.bind('filterChanged', _.bind(this.filterChanged, this));
      this.contentView = new Backbone.View({el: $("#content")});
      this.tweets.bind('fetch', _.bind(this.tweetsRefreshed, this));
      this.tweets.bind('reset', _.bind(this.tweetsRefreshed, this));
    },
    tweetsRefreshed: function(model) {
      this.viewStatus(model.models[0].id);
    },
    filterChanged: function(f) {
      this.tweets.query = f;
      this.tweets.fetch(); // execute an underlying GET against Twitter's search.
    },
    // Whenever the hash changes in the URL matching the route defined
    // in routes, we'll extract the ID and display the underlying tweet.
    // This code is intentionally simple, but brittle for real world use.
    viewStatus: function(id) {
      var tweet = this.tweets.get(Number(id));
      var view = new tf.views.TweetView({model: tweet});
      this.contentView.$el.html(view.render().el)
    }
  });

  // Wire up the root instances of our app.  We'll create an instance of our
  // app router, and then tell the underlying Tweets collection instance
  // to fetch its date.  We could have also called app.tweets.reset( <json list>)
  // if this template were rendered with an initial JSON value.
  // --------------------------------------------------------------------------
  var app = tf.app = new App();

  app.tweets.fetch();

  // Begin listening for changes in the URL hash.
  Backbone.history.start();
});
