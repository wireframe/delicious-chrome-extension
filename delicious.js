/*
post new bookmark to delicious

see http://gist.github.com/7516
*/
$(function() {
  
  function displayMessage(string) {
    alert(string);
  }
  chrome.tabs.getSelected(null, function(tab) {
    $('#url').val(tab.url);
 		$('#description').val(tab.title);
 	});

  var submit = $('#submit');
  $('#form').submit(function() {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: "https://api.del.icio.us/v1/posts/add",
      data: $(this).serialize(),
      beforeSend: function() {
        submit.attr('disabled', 'disabled').text('Saving');
      },
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
      },
      complete: function() {
        submit.removeAttr('disabled').text('Save');
      }
    });

    return false;
  });
});


/*
intercept user creating chrome bookmark
http://code.google.com/chrome/extensions/bookmarks.html
*/