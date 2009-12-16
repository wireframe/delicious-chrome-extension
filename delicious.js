/*
api for interacting with delicious
see see http://delicious.com/help/api
*/
var delicious;
if (!delicious) {
  delicious = {};
}

delicious.request = function(options) {
  var defaults = {
    type: "GET",
    dataType: "xml",
    beforeSend: function(request) {
      var auth = 'Basic ' + btoa(localStorage['username'] + ':' + localStorage['password']);
      request.setRequestHeader('Authorization', auth);
    },
    error: function(request, status) {
      console.error("Error connecting to delicious: " + status);
    }
  };
  var opts = $.extend({}, defaults, options);
  $.ajax(opts);
};

/*
save a new bookmark to delicious.
if bookmark already exists for this url, the existing one will be updated
see http://delicious.com/help/api#posts_add
*/
delicious.saveBookmark = function(params, options) {
  var defaults = {
    url: "https://api.del.icio.us/v1/posts/add",
    data: params,
    success: function(xml) {
      var result = $(xml).find("result");
      var code = result.attr("code");

      if (code == "done") {
        console.log("Bookmark saved to delicious!");
      } else {
        console.error("Error saving bookmark to delicious: " + code);
      }
    }
  };
  var opts = $.extend({}, defaults, options);
  delicious.request(opts);
};

/*
remove an existing bookmark from delicious
see http://delicious.com/help/api#posts_delete
*/
delicious.removeBookmark = function(url) {
  var defaults = {
    url: "https://api.del.icio.us/v1/posts/add",
    data: {url: url},
    success: function(xml) {
      var result = $(xml).find("result");
      var code = result.attr("code");

      if (code == "done") {
        console.log("Bookmark removed from delicious.");
      } else {
        console.error("Error removing bookmark from delicious: " + code);
      }
    }
  };
  var opts = $.extend({}, defaults, options);
  delicious.request(opts);
};
