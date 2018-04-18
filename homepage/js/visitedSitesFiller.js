let visitedSites;
let visitedSitesDiv = document.getElementById("visitedSites");


browser.storage.local.get("visitedSites").then(function (item) {
    visitedSites = item;
    onSearchQueriesFound();
}, function (error) {
    visitedSitesDiv.innerHTML = "Error! " + error;
});

function onSearchQueriesFound() {
    if (visitedSites.hasOwnProperty("visitedSites")) {
        visitedSitesDiv.innerHTML = convertToTable(visitedSites.visitedSites        );
    } else {
        visitedSitesDiv.innerHTML = "Nothing yet.";
    }
}
