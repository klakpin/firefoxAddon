let searchHistoryDiv = document.getElementById("searchHistory");
let stackOverflowSelectionHistoryDiv = document.getElementById("stackOverflowSelectionHistory");


let clearLocalStorageButton = document.getElementById("clearStorageButton");
clearLocalStorageButton.onclick(function () {
    browser.storage.local.clear()
});

browser.storage.local.get("searchQueries").then(function (item) {
    searchHistoryDiv.innerHTML = "Your history is:<br />" + JSON.stringify(item).replace(/},{/g, "},<br /> {");
}, function (error) {
    searchHistoryDiv.innerHTML= "Error! " + error;
});




browser.storage.local.get("stackoverflowClipboardHistory").then(function (item) {
	if (item !== {}) {
    searchHistoryDiv.innerHTML = "Your stackoverflow clipboard heistory is:<br />" + JSON.stringify(item).replace(/},{/g, "},<br /> {");
	}
}, function (error) {
    searchHistoryDiv.innerHTML= "Error! " + error;
});
