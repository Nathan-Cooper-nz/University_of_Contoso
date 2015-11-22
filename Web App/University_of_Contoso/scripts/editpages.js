﻿document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);

    if (controller === "courses") {
        CourseModule.getCourseById(id, function (course) {
            loadForm(course);
        });
        setupCourseSubmit(id);
    } else if (controller === "students") {
        StudentModule.getStudentById(id, function (student) {
            loadForm(student);
        });
        setupStudentSubmit(id);
    } else if (controller === 'tasks') {
        TaskModule.getTaskById(id, function (task) {
            loadForm(task);
            setupTaskSubmit(task);
        })
    }

    setupReturn(controller);

});

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
};

function loadForm(obj) {

    // Prefill form with details
    for (var key in obj) {
        if (key.toLowerCase().indexOf("id") == -1) {
            var value = key + 'input';
            var forminput = document.getElementById(key + 'input');
            forminput.value = obj[key];
            
        }
    }

    //show form after loaded
    document.forms.edit.classList.remove("hidden");
};

function setupStudentSubmit(id) {
   
    //Creating student from form and update db
    var form = document.forms.edit;
    form.onsubmit = function (e) {
        e.preventDefault();

        var newStudent = {
            studentid: id,
            lastname: document.getElementById("LastNameinput").value,
            firstname: document.getElementById("FirstNameinput").value,
            email: document.getElementById("Emailinput").value
        }

        StudentModule.updateStudent(id, newStudent, function () {
            window.location.href = "Student_Index.html";
        });
    }
};

function setupCourseSubmit(id) {

    var form = document.forms.edit;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newCourse = {
            courseid : id,
            title: document.getElementById("Titleinput").value,
            credits: document.getElementById("Creditsinput").value
        }
        
        CourseModule.updateCourse(id,newCourse, function () {
            window.location.href = "Course_Index.html";
        });
    }


};

function setupTaskSubmit(task) {
    var taskID = null;
    var studentID = null;

    for (var key in task) {
        if (key.toLowerCase().indexOf("id") != -1) {
            if (taskID == null) {
                taskID = task[key];
            } else {
                studentID = task[key];
            }
        }
    }


    var form = document.forms.edit;
    forms.onsubmit = function (e) {
        e.preventDefault();
        var newTask = {
            TaskID: taskID,
            StudentID: studentID,
            Title: document.getElementById('Titleinput').value,
            Description: document.getElementById('Descriptioninput').value,
            Importance: document.getElementById('Importanceinput').value
        }

        TaskModule.updateTask(id, newTask, function () {
            window.location.href = "Student_detail.html?type=students&id="+studentID;
        });
    }
}
//Go back to home without saving changes
function setupReturn(controller) {
    document.getElementById('btncancel').addEventListener('click', function () {
        if (controller === "courses") {
            window.location.href = "course_index.html";
        } else if (controller === "students") {
            window.location.href = "student_index.html";
        } else {
            window.location.href = history.back();
        }
    });
}