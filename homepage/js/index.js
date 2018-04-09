let clearLocalStorageButton = document.getElementById("clearStorageButton");
clearLocalStorageButton.onclick = function () {
    browser.storage.local.clear();
    location.reload();
};