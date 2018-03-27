browser.runtime.onMessage.addListener(onMessage);

function onMessage(message) {

    switch (message.type) {
        case "searchQuery":
            processSearchQuery(message);
    }
}

/**
 * Receive message about new search query and proceed it.
 * @param message - information about search query
 */
function processSearchQuery(message) {

    let queries = browser.storage.local.get("searchQueries");
    queries.then(function (item) {
        if (item === null) {
            browser.local.storage.set(JSON.parse(`searchQueries:[$message]`));
        } else {
            item.push(message);
            browser.local.storage.set(item);

        }
    }, function (error) {

    })
}