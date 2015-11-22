document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-controller");
    if (controller === "students") {
        loadStudentsTable(controller);
    } else if (controller === "courses") {
        loadCourseTable(controller);
    }
});

function loadStudentsTable(controller) {

    var studentsTable = document.getElementById("tblstudentcontent");
    StudentModule.getStudents(function (studentsList) {
        setupStudentsTable(studentsList);
    });

    function setupStudentsTable(students) {

        // Loop through list of students
        for (i = 0; i < students.length; i++) {

            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", students[i].StudentID);

            // Create columns
            var lastnamecol = document.createElement('td');
            lastnamecol.innerHTML = students[i].LastName;
            row.appendChild(lastnamecol);

            var firstnamecol = document.createElement('td');
            firstnamecol.innerHTML = students[i].FirstName;
            row.appendChild(firstnamecol);

            
            // Create edit, details and delete buttons
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";
            editbtn.setAttribute("data-id", students[i].StudentID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var detailscol = document.createElement('td');
            var detailsbtn = document.createElement('button');
            detailsbtn.className = "btn btn-default";
            detailsbtn.innerHTML = "Details";
            detailsbtn.setAttribute("data-id", students[i].StudentID);
            detailsbtn.setAttribute("data-btntype", "detail");

            detailscol.appendChild(detailsbtn);
            row.appendChild(detailscol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", students[i].StudentID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            // Add newly created row to the table
            studentsTable.appendChild(row);
        }

        // Show table after it's all loaded
        // The "hidden" class is part of bootstrap
        document.getElementById("tblstudent").classList.remove("hidden");
        document.getElementById("loadingmsg").style.display = "none";

        // Event delegation
        studentsTable.addEventListener('click', function (e) {
            var target = e.target;

            // Bubble up to tbody - need to bubble the event up because the click occurs in 
            // the td cells but the data-id attribute is in the row (for going to more detail page)
            while (target.nodeName.toLowerCase() !== "tbody") {
                
                // For all these cases we use the data-id stored in either the cell or the row to keep context
                // between seperate pages
                
                // Edit - Button
                if (target.getAttribute("data-btntype") === "edit") {
                    window.location.href = 'Student_edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;

                    // Details - Button
                } else if (target.getAttribute("data-btntype") === "detail") {
                    window.location.href = 'Student_detail.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;

                    // Delete - Button
                } else if (target.getAttribute("data-btntype") === "delete") {
                    StudentModule.deleteStudent(target.getAttribute("data-id"), function () {
                        window.location.reload(true);
                    });
                    return;

                    // Detail - Click on Row
                } else if (target.nodeName.toLowerCase() === "tr") {
                    window.location.href = 'Student_detail.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;
                }
                
                // Keep bubbling the event up through the DOM
                target = target.parentNode;
            }
        });
    }

};

function loadCourseTable(controller) {
    var coursesTable = document.getElementById("tblcoursecontent");
    CourseModule.getCourses(function (coursesList) {
        setupCoursesTable(coursesList);
    });

    function setupCoursesTable(courses) {
        //Fill table with data from courses
        for (var i = 0; i != courses.length; i++) {

            //Create Row
            var row = document.createElement("tr");
            row.setAttribute("data-id", courses[i].CourseID);

            //Fill Row with data
            var titlecol = document.createElement("td");
            titlecol.innerHTML = courses[i].Title;
            row.appendChild(titlecol);

            var creditcol = document.createElement('td');
            creditcol.innerHTML = courses[i].Credits;
            row.appendChild(creditcol);

            //Add buttons to remaining cols
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";
            editbtn.setAttribute("data-id", courses[i].CourseID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var detailscol = document.createElement('td');
            var detailsbtn = document.createElement('button');
            detailsbtn.className = "btn btn-default";
            detailsbtn.innerHTML = "Details";
            detailsbtn.setAttribute("data-id", courses[i].CourseID);
            detailsbtn.setAttribute("data-btntype", "detail");

            detailscol.appendChild(detailsbtn);
            row.appendChild(detailscol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", courses[i].CourseID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            coursesTable.appendChild(row);
        }

        document.getElementById("tblcourse").classList.remove("hidden");
        document.getElementById("loadingmsg").style.display = "none";

        // Event delegation
        coursesTable.addEventListener('click', function (e) {
            var target = e.target;

            // Bubble up to tbody - need to bubble the event up because the click occurs in 
            // the td cells but the data-id attribute is in the row (for going to more detail page)
            while (target.nodeName.toLowerCase() !== "tbody") {

                // For all these cases we use the data-id stored in either the cell or the row to keep context
                // between seperate pages
                // Edit - Button
                if (target.getAttribute("data-btntype") === "edit") {
                    window.location.href = 'Course_edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;

                    // Details - Button
                } else if (target.getAttribute("data-btntype") === "detail") {
                    window.location.href = 'Course_detail.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;

                    // Delete - Button
                } else if (target.getAttribute("data-btntype") === "delete") {
                    CourseModule.deleteCourse(target.getAttribute("data-id"), function () {
                        window.location.reload(true);
                    });
                    return;

                    // Detail - Click on Row
                } else if (target.nodeName.toLowerCase() === "tr") {
                    window.location.href = 'Course_detail.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                    return;
                }

                // Keep bubbling the event up through the DOM
                target = target.parentNode;
            }
        });
    }
};