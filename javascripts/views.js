(function() {
  var tf = window.tf || {};
  window.tf = tf;

  var views = tf.views = {};

  // tpl is a helper function to simplify binding to a Underscore template.
  // --------------------------------------------------------------------------
  var tpl = function(id) {
    return _.template($("#" + id).html());
  }

  // views.TweetItemView represents an individual tweet in a list of tweets.
  // --------------------------------------------------------------------------
  // In the case of this example app, the list representation of our tweets
  // is simply the user's profile picture and a link that allows display the
  // current tweet in the content panel of the application.
  views.TweetItemView = Backbone.View.extend({
    el: 'li',
    template: tpl('tweet-item-tpl'),
    render: function() {
      this.el = this.template(this.model.toJSON());
      return this;
    }
  });


  // views.Tweets represents the view that is the list of tweets (a ul)
  // --------------------------------------------------------------------------
  // The underlying element for this view is bound by the main App router
  // when this view is instantiated.
  views.Tweets = Backbone.View.extend({
    // Override a simple constructor for this view so that we can listen
    // for changes on our underlying model.  In this case, we expect
    // the model will be a tf.models.Tweets collection instance.
    initialize: function(options) {
      // Note that we use underscore's _.bind(fn, scope) to ensure
      // that this function is called in the scope of this view.
      // If we didn't do that, "this" inside the reset function would
      // not represent this view.
      this.model.bind("fetch", _.bind(this.reset, this));
      this.model.bind("reset", _.bind(this.reset, this));
    },
    // Reset the list of tweets in the sidebar whenever the Tweets
    // model instance notifies of a change.
    reset: function(model) {
      this.$el.children().remove();
      var addTweet = _.bind(this.addTweet, this);
      model.each(addTweet);
    },
    // Helper method to create a TweetItemView and append it to our UL.
    addTweet: function(tweet) {
      var view = new views.TweetItemView({model: tweet});
      this.$el.append(view.render().el);
    },
  });

  // views.TweetView represents a Tweet's detail.
  // --------------------------------------------------------------------------
  views.TweetView = Backbone.View.extend({
    template: tpl('tweet-tpl'),
    render: function() {
      this.el = this.template(this.model.toJSON());
      return this;
    }
  });

  // views.Filter binds to the filter form so that we can handle form events.
  // --------------------------------------------------------------------------
  views.Filter = Backbone.View.extend({
    // The events property allows us to specify <event> <selectors> we would
    // like to bind.  The selectors are relative to this.el.  Any event you can
    // jQuery.bind(<event>, can be reached via this mechanism.
    events: {
      'change .filter': 'filterChanged',
      'submit': 'formSubmitted'
    },
    // Listen for a change event on the .filter input element and then trigger
    // a custom event so that our parent View can respond to changes in the
    // Twitter search filter.
    filterChanged: function(e) {
      var filter = $(e.target).val();
      this.trigger('filterChanged', filter);
    },
    formSubmitted: function(e) {
      e.preventDefault();
      return false;
    }
  });

})();
