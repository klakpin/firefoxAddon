DEBUG = true;


browser.browserAction.onClicked.addListener(openMyPage);


browser.runtime.onMessage.addListener(onMessage);

function openMyPage() {


    browser.tabs.create({
        "url": "homepage/index.html"
    });
}

function onMessage(message, sender, sendResponce) {

    if (DEBUG) {
        console.log("New message: " + message.type);
    }

    switch (message.type) {
        case "searchQuery":
            processSearchQuery(message);
            break;
        case "clipboardEvent":
            processClipboardEvent(message, sendResponce);
            break;
        case "deleteRecord":
            deleteRecord(message);
            break;
    }
}

/**
 * Deletes specified record
 * @param message - JSON describing record
 * @param sendResponce - function for sending response to caller
 */
function deleteRecord(message, sendResponce) {
    if (DEBUG) {
        console.log("Deleting record: " + message.type + ", " + message.hash);
    }

    let dbRequest = browser.storage.local.get(message.type);

    dbRequest.then(function (items) {
            items[message].forEach(function (item) {
                if (item.hash === message.hash) {
                    //TODO make deletion of record
                }
            });
        }
        , function (error) {
            sendResponce(error);
        });
}

/**
 * Receive message about new stackoverflow selection and proceed it.
 * @param message - JSON with information about search query
 */
function processClipboardEvent(message) {


    if (DEBUG) {
        console.log("Processing clipboardEvent: " + message.selection);
    }

    delete message.type;
    message.hash = hashCode(message.date + message.type);


    let stackoverflowClipboardHistory = browser.storage.local.get("clipboardEvent");
    stackoverflowClipboardHistory.then(function (items) {

            let records = items.stackoverflowClipboardHistory;
            if (records === undefined) {
                records = [];
            }
            records.push(message);

            let dbRecord = {
                "clipboardEvent": records
            };


            browser.storage.local.set(dbRecord).catch(function (error) {
                console.log("Error while setting local storage data (clipboardEvent), " + error);
            });
        }
        , function (error) {
            console.log("Error while getting local storage data (clipboardEvent), " + error);
        })
}

/**
 * Receive message about new search query and proceed it.
 * @param message - JSON with information about search query
 */
function processSearchQuery(message) {
    if (DEBUG) {
        console.log("Processing search query: " + message);
    }

    delete message.type;
    message.hash = hashCode(message.date + message.type);

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

function hashCode(str) {
    len = str.length;

    hash = 0;
    for (i = 1; i <= len; i++) {
        char = str.charCodeAt((i - 1));
        hash += char * Math.pow(31, (len - i));
        hash = hash & hash; //javascript limitation to force to 32 bits
    }

    return hash;
}


