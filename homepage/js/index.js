let clearLocalStorageButton = document.getElementById("clearStorageButton");

clearLocalStorageButton.onclick = function () {

    browser.storage.local.clear();
    location.reload();
};

let setIdButton = document.getElementById("setId");
setIdButton.onclick = function () {
    let id = document.getElementById("inputId");
    let message = {
        "identificator": id.value
    };
    browser.storage.local.set(message).catch(function (error) {
        alert("Error while saving id " + error.toString());
    });
    location.reload();
};

let id = browser.storage.local.get("identificator");
let outputContainer = document.getElementById("identificator-output-container");
let inputContainer = document.getElementById("identificator-input-container");

id.then(function (result) {
    if (result.hasOwnProperty("identificator")) {
        inputContainer.setAttribute('style', 'visibility:hidden');
        let idContainer = document.getElementById("identificator-alert");
        idContainer.innerText = "Your id is: " + result.identificator.toString();
    } else {
        outputContainer.setAttribute('style', 'visibility:hidden');
    }
}, function (error) {
    outputContainer.setAttribute('style', 'visibility:hidden');
    inputContainer.setAttribute('style', 'visibility:hidden');
    alert("Error while getting id: " + error.toString());
});
