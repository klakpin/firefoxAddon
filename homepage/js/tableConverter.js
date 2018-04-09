function convertToTable(data) {
    let resultText = "";

    let keys = Object.keys(data[0]);

    resultText += "<table class=\"table\">\n" +
        "    <thead>\n" +
        "    <tr>";

    keys.forEach(function (element) {
        resultText += `<th>${element.toString()}</th>`;
    });

    resultText += "    </tr>" +
        "    </thead>\n" +
        "    <tbody>";

    data.forEach(function (element) {
        resultText += "    <tr>";
        let values = Object.values(element);
        values.forEach(function (element) {
            resultText += `        <td>${element.toString()}</td>`;
        });
        resultText += "    </tr>";
    });

    resultText += "</tbody></table>";

    return resultText;
}

