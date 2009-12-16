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
  var opts = {
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
  delicious.request(opts);
};

/*
recommends tags for a given url
see http://delicious.com/help/api#posts_delete
*/
delicious.suggestions = function(url, callback) {
  var opts = {
    url: "https://api.del.icio.us/v1/posts/suggest",
    data: {url: url},
    success: function(xml) {
      var suggestions = [];
      $(xml).find("popular,recommended").map(function() {
        suggestions.push($(this).text());
      });
      callback(suggestions.unique());
    }
  };
  delicious.request(opts);
};

// Array.unique( strict ) - Remove duplicate values
//see http://4umi.com/web/javascript/array.php#unique
Array.prototype.unique = function(b) {
 var a = [], i, l = this.length;
 for( i=0; i<l; i++ ) {
  if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
 }
 return a;
};
