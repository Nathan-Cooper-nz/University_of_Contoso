document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-controller");
    if (controller === "students") {
        // this stuff is working
        loadStudentTable(controller);
    }
});

// This starts loading the table
function loadStudentTable(controller) {
    StudentModule.getStudents(function (studentsList) {
        setupStudentTable(studentsList);
    });
}

// parameter students is a list
function setupStudentTable(students) {
    var studentTable = document.getElementById("studentTable");

    for (i = 0; i < students.length; i++) {
        var row = document.createElement("tr");

        var col_lastname = document.createElement("td");
        var col_firstname = document.createElement("td");

        col_lastname.innerHTML = students[i].LastName;
        col_firstname.innerHTML = students[i].FirstName;

        row.appendChild(col_lastname);
        row.appendChild(col_firstname);

        studentTable.appendChild(row);

    }
    // Show table after it's all loaded
    // The "hidden" class is part of bootstrap
    document.getElementById("studentTable").classList.remove("hidden");
    document.getElementById("loadingmsg").style.display = "none";
}