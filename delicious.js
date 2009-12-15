var delicious;
if (!delicious) {
  delicious = {};
}

/*
post new bookmark to delicious
see http://gist.github.com/7516
*/
delicious.saveBookmark = function(params, options) {
  var defaults = {
    type: "GET",
    dataType: "xml",
    url: "https://api.del.icio.us/v1/posts/add",
    data: params,
    beforeSend: function(request) {
      var auth = 'Basic ' + btoa(localStorage['username'] + ':' + localStorage['password']);
      request.setRequestHeader('Authorization', auth);
    },
    error: function(request, status) {
      console.error("Error saving bookmark to delicious: " + status);
    },
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
  options = $.extend({}, defaults, options);
  $.ajax(options);
};