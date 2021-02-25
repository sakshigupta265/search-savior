console.log("execute fore");

var treeName;

//listen for page loaded: projectName is a variable is saved when project button is clicked in foreground-home
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("projectName", function (result) {
    treeName = Object.entries(result)[0][1];
    loadDoc();
  });
});

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

// reload page
var counter = 1;
var auto_refresh = setInterval(function () {
  var newcontent = " <h4>Your Search Tree</h4>";
  $("#divID").html(newcontent);
  counter++;
}, 1000);

// NOT USING now, might need if we make a page with all urls
// get all keys in storage.sync to put in search.html
function getKeys() {
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    for (i in allKeys) {
      if (document.getElementById(allKeys[i]) === null && allKeys[i] !== "z") {
        treeName = allKeys[i];
        loadDoc();
      }
    }
  });
}

// load search.html page with urls for a particular project
function loadDoc() {
  if (treeName === undefined) {
    chrome.storage.local.get(projectName, function (data) {
      treeName = Object.entries(result)[0][1];
    });
  }
  chrome.storage.sync.get(treeName, function (data) {
    var responseText = Object.values(data);
    var keys = Object.keys(data);

    if (treeName !== "z") {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 0) {
          for (i in keys) {
            for (j in responseText[i]) {
              if (
                !document.getElementById("demo").innerHTML.includes(keys[i]) &&
                responseText[i][j].value !== ""
              ) {
                if (
                  document.getElementById("demo").innerHTML ===
                  "<h2>New Tree Here</h2>"
                ) {
                  document.getElementById("demo").innerHTML =
                    '<ul id="tree"><li><span class="caret"><a href="' +
                    responseText[i][j].value +
                    '">' +
                    responseText[i][j].value +
                    '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                    responseText[i][j].descendants +
                    '">' +
                    responseText[i][j].descendants +
                    "</a></span></ul></li></li></ul>";
                } else {
                  document.getElementById("demo").innerHTML +=
                    '<ul id="tree"><li><span class="caret"><a href="' +
                    responseText[i][j].value +
                    '">' +
                    responseText[i][j].value +
                    '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                    responseText[i][j].descendants +
                    '">' +
                    responseText[i][j].descendants +
                    "</a></span></ul></li></li></ul>";
                }
              }
            }
          }
        }
      };
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    }
  });
}
