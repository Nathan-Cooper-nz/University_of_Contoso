document.addEventListener("DOMContentLoaded", function () {
    var controller = document.body.getAttribute("data-controller");
    if (controller === "students") {
        setupStudentSubmit();
    } else if (controller === "courses") {
        setupCourseSubmit();
    }
    setupReturn();
});

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
            firstname: document.getElementById("FirstNameinput").value
        }
        
        // Take me back home when done!
        StudentModule.addStudent(newStudent, function () {
            window.location.href = "index.html";
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

// Add event listener, cancel button will take you back to home page
function setupReturn() {
    document.getElementById('btncancel').addEventListener('click', function () {
        window.location.href = window.history.back();
    });
}