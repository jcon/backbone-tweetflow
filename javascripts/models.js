(function() {
  var tf = window.tf || {};
  window.tf = tf;

  tf.models = {};

  tf.models.Tweet = Backbone.Model.extend({
    defaults: {
      from_user: "tweetflow",
      from_user_name: "TweetFlow",
      text: "Test Tweet"
    }
  });

  tf.models.Tweets = Backbone.Collection.extend({
    model: tf.models.Tweet,
    initialize: function(options) {
      this.query = 'bcAlbany';
    },
    url: function() {
      return 'http://search.twitter.com/search.json?callback=?&q=' + this.query;
    },
    parse: function(response) {
      return response.results;
    }
  });

})();
