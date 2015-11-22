document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-controller");
    if (controller === "students") {
        setupStudentSubmit();
    } else if (controller === "courses") {
        setupCourseSubmit();
    } else if (controller === 'tasks') {
        var studentID = getUrlParameters("id", "", true);
        setupTaskSubmit(studentID);
    }
    setupReturn();
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
}

function setupStudentSubmit() {
    //Creating student from form parameters

    var form = document.forms.create;
    // Need to add our own custom event for form submission
    form.onsubmit = function (e) {
        // ... and prevent the default action from occuring
        e.preventDefault();
        
        //Creating student from form parameters
        var newStudent = {
            // Access the data in the fields with .value 
            lastname: document.getElementById("LastNameinput").value,
            firstname: document.getElementById("FirstNameinput").value,
            email: document.getElementById("Emailinput").value
        }
        
        // Take me back home when done!
        StudentModule.addStudent(newStudent, function () {
            window.location.href = "Student_Index.html";
        });
    }

};

function setupCourseSubmit() {

    var form = document.forms.create;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newCourse = {
            title: document.getElementById("Titleinput").value,
            credits: document.getElementById("Creditsinput").value
        }
        
        CourseModule.addCourse(newCourse, function () {
            window.location.href = "Course_Index.html";
        });
    }
};

function setupTaskSubmit(student) {

    var form = document.forms.create;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newTask = {
            StudentID: student,
            title: document.getElementById("Titleinput").value,
            Description: "nothinbg",
            Importance: 0
        }

        TaskModule.addTask(newTask, function () {
            window.location.href = "Course_Index.html";
        });
    }
   
};

// Add event listener, cancel button will take you back to home page
function setupReturn() {
    document.getElementById('btncancel').addEventListener('click', function () {
        window.location.href = window.history.back();
    });
}