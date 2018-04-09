function sendMessage(selectionText) {
	let message = {};
	message.type = "clipboardEvent";
	message.selection = selectionText.toString();
	message.url = (new URL(document.location)).toString();

	console.log("Sending message: " + message.selection);
	var sending = browser.runtime.sendMessage(message);
sending.catch(function(error) {
	console.log("Error");
obj = JSON.parse(JSON.stringify(error));
	console.log(obj);
});
}

document.addEventListener('copy', function(element){
	let clipboardText = document.getSelection();
	console.log("ClipText: " + clipboardText);
	sendMessage(clipboardText);
});
