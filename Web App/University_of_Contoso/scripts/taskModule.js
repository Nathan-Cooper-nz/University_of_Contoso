var TaskModule = (function () {

    return {
        getTasks: function (callback) {

            var xhttp = new XMLHttpRequest();

            //This gets triggered when the state of the xhttp object changes
            xhttp.onreadystatechange = function () {
                // 4 - repsonse is ready, 200 success code
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedtasks();
                }
            }

            // Build up our request and send it - true for async
            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Tasks", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(null);

            // Parse and send the tasklist data back to index.js
            function loadedtasks() {
                var tasksList = JSON.parse(xhttp.responseText);
                callback(tasksList);
                return tasksList;
            }
        },

        getTaskById: function (id, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    loadedtask();
                }
            }

            xhttp.open("GET", "http://nathancooper-contosouniversity.azurewebsites.net/api/Tasks/" + id, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();

            function loadedtask() {
                var task = JSON.parse(xhttp.responseText);
                callback(task);
                return task;
            }
        },

        addTask: function (task, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 201) {
                    callback();
                }
            }

            xhttp.open("POST", "http://nathancooper-contosouniversity.azurewebsites.net/api/Tasks", true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(task));

        },

        updateTask: function (taskid, task, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 204) {
                    callback();
                }
            }

            xhttp.open("PUT", "http://nathancooper-contosouniversity.azurewebsites.net/api/Tasks/" + taskid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send(JSON.stringify(task));
        },

        deleteTask: function (taskid, callback) {

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    callback();
                }
            }

            xhttp.open("DELETE", "http://nathancooper-contosouniversity.azurewebsites.net/api/Tasks/" + taskid, true);
            xhttp.setRequestHeader("Content-type", "application/json");

            xhttp.send();
        }
    };

}());