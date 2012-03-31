(function() {
  var tf = window.tf || {};
  window.tf = tf;

  var views = tf.views = {};

  var tpl = function(id) {
    return _.template($("#" + id).html());
  }

  views.TweetItemView = Backbone.View.extend({
    el: 'li',
    template: tpl('tweet-item-tpl'),
    render: function() {
      this.el = this.template(this.model.toJSON());
      return this;
    }
  });

  views.Tweets = Backbone.View.extend({
    initialize: function(options) {
      this.model.bind("fetch", _.bind(this.reset, this));
      this.model.bind("reset", _.bind(this.reset, this));
    },
    reset: function(model) {
      this.$el.children().remove();
      var addTweet = _.bind(this.addTweet, this);
      model.each(addTweet);
    },
    addTweet: function(tweet) {
      var view = new views.TweetItemView({model: tweet});
      this.$el.append(view.render().el);
    },
  });

  views.TweetView = Backbone.View.extend({
    template: tpl('tweet-tpl'),
    render: function() {
      this.el = this.template(this.model.toJSON());
      return this;
    }
  });

  views.Filter = Backbone.View.extend({
    events: {
      'change .filter': 'filterChanged',
      'submit': 'formSubmitted'
    },
    filterChanged: function(e) {
      var filter = $(e.target).val();
      this.trigger('filterChanged', filter);
    },
    formSubmitted: function(e) {
      e.preventDefault();
      return false;
    }
  });

  views.ContentView = Backbone.View.extend({

  });
})();
