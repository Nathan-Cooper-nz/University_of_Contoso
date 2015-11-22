document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);

    if (controller === "courses") {
        CourseModule.getCourseById(id, function (course) {
            document.getElementById("loadingmsg").style.display = "none";
            showDetails(course);
            showCourseAssements(course);
        });
    } else if (controller === "students") {
        StudentModule.getStudentById(id, function (student) {
            document.getElementById("loadingmsg").style.display = "none";
            showDetails(student);
            showStudentTasks(student);
        });
    }

});

function showDetails(obj) {
    // Load details
    for (var key in obj) {
        if (key.toLowerCase().indexOf("id") ==-1) {
            var infoelement = document.getElementById(key);
            infoelement.innerHTML = obj[key];
        }
    }
}

function getUrlParameters(parameter, staticURL, decode) {
    /*
     Function: getUrlParameters
     Description: Get the value of URL parameters either from 
                  current URL or static URL
     Author: Tirumal
     URL: www.code-tricks.com
    */
    var currLocation = (staticURL.length) ? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool) return false;
}

function showStudentTasks(student) {
    TaskModule.getTasks(function (tasksList) {
        setupTasksTable(tasksList,student);
    });
}

function setupTasksTable(tasks, student) {
    var tasksTable = document.getElementById("tbltaskcontent");
    for (var i = 0; i != tasks.length; i++) {
        if (tasks[i].StudentID === student.StudentID) {
            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", tasks[i].TaskID);

            // Create columns
            var titlecol = document.createElement('td');
            titlecol.innerHTML = tasks[i].Title;
            row.appendChild(titlecol);

            var desccol = document.createElement('td');
            if (tasks[i].Description == null || tasks[i].Description == "") {
                desccol.innerHTML = "No description given";
            } else {
                desccol.innerHTML = tasks[i].Description;
            }
            row.appendChild(desccol);

            var importanceccol = document.createElement('td');
            switch(tasks[i].Importance){
                case 0:
                    importanceccol.innerHTML = "High"
                    break;
                case 1:
                    importanceccol.innerHTML = "Medium"
                    break;
                case 2:
                    importanceccol.innerHTML = "Low"
                    break;
            }
            row.appendChild(importanceccol);

            //Add buttons to remaining cols
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";
            editbtn.setAttribute("data-id", tasks[i].CourseID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", tasks[i].CourseID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            tasksTable.appendChild(row);
        }
    }
    document.getElementById("tbltask").classList.remove("hidden");
    document.getElementById("loadingmsgTasks").style.display = "none";


    // Event delegation
    tasksTable.addEventListener('click', function (e) {
        var target = e.target;

        // Bubble up to tbody - need to bubble the event up because the click occurs in 
        // the td cells but the data-id attribute is in the row (for going to more detail page)
        while (target.nodeName.toLowerCase() !== "tbody") {

            // For all these cases we use the data-id stored in either the cell or the row to keep context
            // between seperate pages

            // Edit - Button
            if (target.getAttribute("data-btntype") === "edit") {
                window.location.href = 'Task_edit.html' + '?type=' + controller + '&id=' + target.getAttribute("data-id");
                return;

            // Delete - Button
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

function showCourseAssements(course) {
    
    AssessmentModule.getAssessments(function (assessmentsList) {
        setupAssessmentsTable(assessmentsList, course);
    });
}

function setupAssessmentsTable(assessments, course) {
    var assessmentsTable = document.getElementById("tblassessmentcontent");
    for (var i = 0; i != assessments.length; i++) {
        if (assessments[i].CourseID === course.CourseID) {
            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", assessments[i].AssessmentID);

            // Create columns
            var titlecol = document.createElement('td');
            titlecol.innerHTML = assessments[i].AssessmentName;
            row.appendChild(titlecol);

            var instructcol = document.createElement('td');
            if (assessments[i].Instructions == null || assessments[i].Instructions == "") {
                instructcol.innerHTML = "No instructions available"
            }
            else {
                instructcol.innerHTML = assessments[i].Instructions;
            }
            row.appendChild(instructcol);

            var typecol = document.createElement('td');
            switch (assessments[i].Type) {
                case 0:
                    typecol.innerHTML = "Test";
                    break;
                case 1:
                    typecol.innerHTML = "Assignment";
                    break;
                case 2:
                    typecol.innerHTML = "LabProject";
                    break;
            }
            row.appendChild(typecol);

            var coursevaluecol = document.createElement('td');
            coursevaluecol.innerHTML = assessments[i].CourseWeight+'%';
            row.appendChild(coursevaluecol);

            var duedatecol = document.createElement('td');
            duedatecol.innerHTML = assessments[i].DueDate;
            row.appendChild(duedatecol);

            assessmentsTable.appendChild(row);
        }
    }
    document.getElementById("tblassessment").classList.remove("hidden");
    document.getElementById("loadingmsgAssessments").style.display = "none";
}
