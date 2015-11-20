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
        setupStudentTable(studentsList, controller);
    });
}

// parameter students is a list
function setupStudentTable(students, controller) {
    var studentTable = document.getElementById("studentTable");

    for (i = 0; i < students.length; i++) {
        var row = document.createElement("tr");

        var col_lastname = document.createElement("td");
        var col_firstname = document.createElement("td");

        col_lastname.innerHTML = students[i].LastName;
        col_firstname.innerHTML = students[i].FirstName;

        row.appendChild(col_lastname);
        row.appendChild(col_firstname);

        //Setup Buttons to get in the remaining columns of this row

        var col_edit = document.createElement('td');
        var btn_edit = document.createElement('button');
        btn_edit.className = "btn btn-default";
        btn_edit.innerHTML = "Edit";
        btn_edit.setAttribute("data-id", students[i].StudentID);
        btn_edit.setAttribute("data-btntype", "edit");

        col_edit.appendChild(btn_edit);
        row.appendChild(col_edit);

        var col_details = document.createElement('td');
        var btn_details = document.createElement('button');
        btn_details.className = "btn btn-default";
        btn_details.innerHTML = "Details";
        btn_details.setAttribute("data-id", students[i].StudentID);
        btn_details.setAttribute("data-btntype", "details");

        col_details.appendChild(btn_details);
        row.appendChild(col_details);

        var col_delete = document.createElement('td');
        var btn_delete = document.createElement('button');
        btn_delete.className = "btn btn-default";
        btn_delete.innerHTML = "Delete";
        btn_delete.setAttribute("data-id", students[i].StudentID);
        btn_delete.setAttribute("data-btntype", "delete");

        col_delete.appendChild(btn_delete);
        row.appendChild(col_delete);

        studentTable.appendChild(row);

    }
    // Show table after it's all loaded
    // The "hidden" class is part of bootstrap
    document.getElementById("studentTable").classList.remove("hidden");
    document.getElementById("loadingmsg").style.display = "none";


    // Event handler
    studentTable.addEventListener('click', function (e) {
        var target = e.target;
        while (target.nodeName.toLowerCase() !== "tbody") {

            // For all these cases we use the data-id stored in either the cell or the row to keep context
            // between seperate pages

            // Edit
            if (target.getAttribute("data-btntype") === "edit") {
                window.location.href = 'edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                return;

                // Details
            } else if (target.getAttribute("data-btntype") === "details") {
                window.location.href = 'student_details.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                return;

                // Delete
            } else if (target.getAttribute("data-btntype") === "delete") {

                StudentModule.deleteStudent(target.getAttribute("data-id"), function () {
                    window.location.reload(true);
                });
                return;
            }

            // Keep bubbling the event up through the DOM
            target = target.parentNode;
        }
    });
}