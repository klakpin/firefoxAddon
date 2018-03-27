/**
 * Reads value of search query and send it to background script.
 */

let currentHref = window.location.href;
let hrefParams = currentHref.searchParams;

// Search page is new, i.e. user did not went to page 2 of search
if (hrefParams.get("start") === null) {
    let searchQueryEncoded = hrefParams.get("q");
    let searchQuery = decodeURI(searchQueryEncoded);

    let message = {};

    let currentDate = new Date();
    message.date = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
    message.time = `${currentDate.getUTCHours()}-${currentDate.getUTCMinutes()}-${currentDate.getUTCSeconds()}`;
    message.query = searchQuery;
    message.type = "searchQuery";

    browser.runtime.sendMessage(message);
}