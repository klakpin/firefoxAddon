let navBarDiv = document.getElementById("navBar");
let navBarClasses = navBarDiv.classList;

//You can add more pages here
let pages = [
    {"id": "index", "title": "Home", "link": "/homepage/index.html"},
    {"id": "googleSearchQueries", "title": "Google search queries", "link": "/homepage/metrics/searchQueries.html"},
    {"id": "clipboardQueries", "title": "Clipboard savings history", "link": "/homepage/metrics/clipboardData.html"}
];

let html = "";

// html += "<ul class=\"nav nav-pills\">";

pages.forEach(function (element) {
    let mid = false;
    if (navBarClasses.contains(element.id)) {
        mid = true;
    }
    html += "<li class=\"nav-item\">";

    if (mid) {
        html += `<a class="nav-link active" href="${element.link}">${element.title}</a>`;
    } else {
        html += `<a class="nav-link" href="${element.link}">${element.title}</a>`;
    }

    html += "</li>";

});

// html += "</ul>";

navBarDiv.innerHTML = html;