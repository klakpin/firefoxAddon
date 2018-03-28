let searchHistoryDiv = document.getElementById("searchHistory");

browser.storage.local.get("searchQueries").then(function (item) {
    searchHistoryDiv.innerHTML = "Your history is:<br />" + JSON.stringify(item).replace(/},{/g, "},<br /> {");
}, function (error) {
    searchHistoryDiv.innerHTML= "Error! " + error;
});


let clearLocalStorageButton = document.getElementById("clearStorageButton");
clearLocalStorageButton.onclick(function () {
    browser.storage.local.clear()
});
