let searchQueries;
let searchHistoryDiv = document.getElementById("searchHistory");


browser.storage.local.get("searchQueries").then(function (item) {
    searchQueries = item;
    onSearchQueriesFound();
}, function (error) {
    searchHistoryDiv.innerHTML = "Error! " + error;
});

function onSearchQueriesFound() {
    if (searchQueries.hasOwnProperty("searchQueries")) {
        console.log(JSON.stringify(searchQueries));
        searchHistoryDiv.innerHTML = convertToTable(searchQueries.searchQueries);
    } else {
        searchHistoryDiv.innerHTML = "Nothing yet.";
    }
}
