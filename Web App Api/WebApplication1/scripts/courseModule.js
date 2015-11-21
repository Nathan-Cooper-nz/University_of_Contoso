var CourseModule = (function () {

    return {
        getCourses: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedCourses();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Courses", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the courselist data back to index.js
            function loadedCourses() {
                var coursesList = JSON.parse(xhttp.responseText);
                callback(coursesList);
                return coursesList;
            }
        },

        getCourseById: function (id, callback) {
            alert("ID got: " + id);
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedCourse();
                }
            }

            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Courses/" + id, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedCourse() {
                var course = JSON.parse(xhttp.responseText);
                callback(course);
                return course;
            }
        },

        addCourse: function (course, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", "http://nathancooper-contosouniversity.azurewebsites.net/api/Courses", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(course));

        },

        updateCourse: function (courseid, course, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", "http://nathancooper-contosouniversity.azurewebsites.net/api/Courses/" + courseid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(course));
        },

        deleteCourse: function (courseid, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", "http://nathancooper-contosouniversity.azurewebsites.net/api/Courses/" + courseid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        }
    };

}());