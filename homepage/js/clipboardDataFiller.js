let clipboardHistory;
let clipboardHistoryDiv = document.getElementById("clipboardQueries");


browser.storage.local.get("clipboardEvent").then(function (item) {
    clipboardHistory = item;
    onSearchQueriesFound();
}, function (error) {
    clipboardHistoryDiv.innerHTML = "Error! " + error;
});

function onSearchQueriesFound() {
    if (clipboardHistory.hasOwnProperty("clipboardEvent")) {
        clipboardHistoryDiv.innerHTML = convertToTable(clipboardHistory.clipboardEvent);
    } else {
        clipboardHistoryDiv.innerHTML = "Nothing yet.";
    }
}