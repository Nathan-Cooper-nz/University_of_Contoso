var StudentModule = (function () {
    return {
        getStudents: function (callback) {
            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedStudents();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Students", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the studentlist data back to index.js
            function loadedStudents() {
                var studentsList = JSON.parse(xhttp.responseText);
                callback(studentsList);
                return studentsList;
            }
        },

        getStudentById: function (id, callback){

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedStudent();
                }
            }

            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Students" + id, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedStudent() {
                var student = JSON.parse(xhttp.responseText);
                callback(student);
                return student;
            }
        }
    }
}

()

);