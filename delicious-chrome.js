chrome.bookmarks.onCreated.addListener(function(id, BookmarkTreeNode bookmark) {
  alert('here');
  if (bookmark.url) {
    var data = {
      url: bookmark.url,
      description: bookmark.title
    };
    
    function displayMessage(string) {
      alert(string);
    }
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: "https://api.del.icio.us/v1/posts/add",
      data: data,
      error: function() {
        displayMessage("Error saving bookmark to delicious");
      },
      success: function(xml) {
        var result = $(xml).find("result");
        var code = result.attr("code");

        if (code == "done") {
          displayMessage("Bookmark saved to delicious!");
        } else {
          displayMessage("Error saving bookmark to delicious: " + code);
        }
      }
    });
  }
});
