(function() {
  var tf = window.tf || {};
  window.tf = tf;

  tf.models = {};

  // tf.models.Tweet represents a Tweet from Twitter.
  // ----------------------------------------------------------
  // We've used the defaults property to specify some suitable
  // defaults for a Tweet in the event the API did not provide this
  // data.  These defaults also represent the fields coming from
  // Twitters JSON representation of a Tweet that we will use in
  // our templates.
  tf.models.Tweet = Backbone.Model.extend({
    defaults: {
      from_user: "tweetflow",
      from_user_name: "TweetFlow",
      text: "Test Tweet"
    }
  });

  // tf.models.Tweets represents a Collection of Tweet model instances.
  // ----------------------------------------------------------
  // This collection is doing quite a bit for us behind the scenes:
  // - Using its url() function, tf.models.Tweet#fetch() is able to
  //   GET the latest 15 tweets matching our query.
  // - The parse function allows us to massage the results from Twitter
  //   so that each Tweet JSON object can be used to populate a given
  //   Tweet model instance.
  tf.models.Tweets = Backbone.Collection.extend({
    model: tf.models.Tweet,
    initialize: function(options) {
      this.query = 'bcAlbany';
    },
    url: function() {
      // note that we're using a jQuery callback query parameter to allow
      // this example to run without a server.
      return 'http://search.twitter.com/search.json?callback=?&q=' + this.query;
    },
    parse: function(response) {
      return response.results;
    }
  });

})();
