document.addEventListener('copy', function(element) {
	let clipboardText = document.getSelection();
	console.log("ClipText: " + clipboardText);

	let message = {};

    let currentDate = new Date();
    message.date = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth() + 1}-${currentDate.getUTCDate()}`;
    message.time = `${currentDate.getUTCHours()}-${currentDate.getUTCMinutes()}-${currentDate.getUTCSeconds()}`;
    message.selection = clipboardText;
    message.type = "clipboardEvent";

    browser.runtime.sendMessage(message);
});