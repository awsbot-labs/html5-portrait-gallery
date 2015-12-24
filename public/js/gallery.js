var BUCKET_URL = 'http://gallery.cloudsarelies.com.s3-eu-west-1.amazonaws.com/portraits/';
jQuery(function($) {
  if (typeof BUCKET_URL != 'undefined') {
    var url = BUCKET_URL;
  } else {
    var url = location.protocol + '//' + location.hostname;
  }
  $.get(url)
    .done(function(data) {
      var xml = $(data);
      var files = $.map(xml.find('Contents'), function(item) {
        item = $(item);
        key = item.find('Key').text();
        if (key.match(/portraits/g)) {
          return {
            Key: key
          }
        }
      });
      //renderTable(files);
      console.log(files);
    })
    .fail(function(error) {
      alert('There was an error');
      console.log(error);
    });
});

function renderTable(files) {
  var cols = [ 45, 30, 15 ];
  var content = padRight('Last Modified', cols[1]) + '  ' + padRight('Size', cols[2]) + 'Key \n';
  content += new Array(cols[0] + cols[1] + cols[2] + 4).join('-') + '\n';
  $.each(files, function(idx, item) {
    var key = item.Key;
    var row = '';
    row += padRight(item.LastModified, cols[1]) + '  ';
    row += padRight(item.Size, cols[2]);
    row += '<a href="' + key + '">' + item.Key + '</a>';
    content += row + '\n';
  });

  document.getElementById('listing').innerHTML = '<pre>' + content + '</pre>';
}

function padRight(padString, length) {
  var str = padString.slice(0, length-3);
  if (padString.length > str.length) {
    str += '...';
  }
  while (str.length < length) {
    str = str + ' ';
  }
  return str;
}


// Set the placeholder of the name form to the portraitee,
// Or otherwise set it to "say my name"
var input = document.getElementById("name");
if (window.location.pathname !== "/") {
  input.setAttribute("placeholder", window.location.pathname.replace(/\/portraits\//g, "").replace(/\//g, "").replace(/_/g, " ") );
} else {
  input.setAttribute("placeholder", input.placeholder);
}

// When the name form is submitted, 
// Change the url to the name
$('#form').submit(function (evt) {
  evt.preventDefault();
  // replace spaces with underscores for url friendliness
  var value = $( "input" ).val().toLowerCase().replace(/ /g,"_") + "/";
  window.location.href = "/portraits/" + value;
});