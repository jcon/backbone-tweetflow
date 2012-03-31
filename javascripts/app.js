$(function() {
  var tf = window.tf || {};
  window.tf = tf;

  var App = tf.App = Backbone.Router.extend({
    routes: {
      'status/:id': 'viewStatus'
    },
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
      this.tweets.fetch();
    },
    viewStatus: function(id) {
      var tweet = this.tweets.get(Number(id));
      var view = new tf.views.TweetView({model: tweet});
      this.contentView.$el.html(view.render().el)
    }
  });

  var app = tf.app = new App();

  app.tweets.fetch();

  Backbone.history.start();//{pushState: true});

});
