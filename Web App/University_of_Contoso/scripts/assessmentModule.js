var AssessmentModule = (function () {

    return {
        getAssessments: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedassessments();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Assessments", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the assessmentlist data back to index.js
            function loadedassessments() {
                var assessmentsList = JSON.parse(xhttp.responseText);
                callback(assessmentsList);
                return assessmentsList;
            }
        },

        getAssessmentById: function (id, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedassessment();
                }
            }

            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Assessments/" + id, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedassessment() {
                var assessment = JSON.parse(xhttp.responseText);
                callback(assessment);
                return assessment;
            }
        },

        addAssessment: function (assessment, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", "http://nathancooper-contosouniversity.azurewebsites.net/api/Assessments", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(assessment));

        },

        updateAssessment: function (assessmentid, assessment, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", "http://nathancooper-contosouniversity.azurewebsites.net/api/Assessments/" + assessmentid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(assessment));
        },

        deleteAssessment: function (assessmentid, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", "http://nathancooper-contosouniversity.azurewebsites.net/api/Assessments/" + assessmentid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        }
    };

}());