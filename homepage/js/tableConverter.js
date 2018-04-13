function convertToTable(data) {
    let resultText = "";

    let keys = Object.keys(data[0]);

    let typeKeys = Object.keys(data);
    let type = typeKeys[0];

    resultText += "<table class=\"table\">\n" +
        "    <thead>\n" +
        "    <tr>";

    keys.forEach(function (element) {
        resultText += `<th>${element.toString()}</th>`;
    });

    resultText += "<th>Delete record</th>";

    resultText += "    </tr>" +
        "    </thead>\n" +
        "    <tbody>";

    data.forEach(function (element) {
        resultText += "    <tr>";
        let values = Object.values(element);
        values.forEach(function (element) {
            resultText += `        <td>${element.toString()}</td>`;
        });
        resultText += `<td><a class="badge badge-danger" onclick="sendDeletionRequest(${type}, ${element.hash})">delete</a></td>`;
        resultText += "    </tr>";
    });

    resultText += "</tbody></table>";

    return resultText;
}

function sendDeletionRequest(type, hash) {
    console.log("Sending deletion request");

    let message = {
        "type": type,
        "hash": hash
    };

    let sending = browser.runtime.sendMessage(message);
    sending.then(function (result) {
        if (result.status === "ok") {
            location.reload();
        }
    }, function (error) {
        alert("Deletion unsuccessful " + error.toString())
    });
}

