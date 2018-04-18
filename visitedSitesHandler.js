let visits = 0;

if (visits === 0) {
    visits++;
    let currentUrl = new URL(document.location);
    let uri = currentUrl.toString();

    if (uri !== "") {

        let message = {};

        let currentDate = new Date();
        message.date = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
        message.time = `${currentDate.getUTCHours()}-${currentDate.getUTCMinutes()}-${currentDate.getUTCSeconds()}`;
        message.href = uri;
        message.type = "visitedSites";

        console.log("message: " + JSON.stringify(message));
        browser.runtime.sendMessage(message);
    }
}

