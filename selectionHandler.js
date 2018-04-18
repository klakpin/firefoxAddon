function sendMessage(selectionText) {
    let message = {};
    message.type = "clipboardEvent";
    message.selection = selectionText.toString();
    message.url = (new URL(document.location)).toString();
    let currentDate = new Date();
    message.date = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
    message.time = `${currentDate.getUTCHours()}-${currentDate.getUTCMinutes()}-${currentDate.getUTCSeconds()}`;

    console.log("Sending message: " + message.selection);

    // noinspection JSUnresolvedFunction
    let sending = browser.runtime.sendMessage(message);
    sending.catch(function (error) {
        console.log("Error");
        let obj = JSON.parse(JSON.stringify(error));
        console.log(obj);
    });
}

document.addEventListener('copy', function () {
    let clipboardText = document.getSelection();
    console.log("ClipText: " + clipboardText);
    sendMessage(clipboardText);
});
