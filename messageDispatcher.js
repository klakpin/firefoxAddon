browser.browserAction.onClicked.addListener(openMyPage);

// browser.runtime.onMessage.addListener(onMessage);

function openMyPage() {
    browser.tabs.create({
        "url": "/innoMetricsIndex.html"
    });
}


function onMessage(message) {
    console.log("New message: " + message.type);
    switch (message.type) {
        case "searchQuery":
            processSearchQuery(message);
            break;
            case "clipboardEvent":
            processClipboardEvent(message);
            break;
    }
}

function processClipboardEvent(message) {
    delete message.type;
    
    let stackoverflowClipboardHistory = browser.storage.local.get("stackoverflowClipboardHistory");
    stackoverflowClipboardHistory.then(function (items) {
        let records = items.stackoverflowClipboardHistory;
        if (records === undefined) {
            records = [];
        }
        records.push(message);

        let dbRecord = {
            "stackoverflowClipboardHistory": records
        };

        browser.storage.local.set(dbRecord).catch(function (error) {
            console.log("Error while setting local storage data (stackoverflowClipboardHistory), " + error);
        });
        }
        , function (error) {
            console.log("Error while getting local storage data (stackoverflowClipboardHistory), " + error);
        })
}

/**
 * Receive message about new search query and proceed it.
 * @param message - information about search query
 */
function processSearchQuery(message) {
    delete message.type;
    let queries = browser.storage.local.get("searchQueries");

    queries.then(function (items) {
            let searchQueries = items.searchQueries;
            if (searchQueries === undefined) {
                searchQueries = [];
            }
            searchQueries.push(message);

            let dbRecord = {
                "searchQueries": searchQueries
            };

            browser.storage.local.set(dbRecord).catch(function (error) {
                console.log("Error while setting local storage data, " + error);
            });
        }
        , function (error) {
            console.log("Error while getting local storage data (searchQueries), " + error);
        })
}

