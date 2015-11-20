document.addEventListener("DomContentLoaded", function () {
    alert("hi")
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);
    alert("hi")
    if (controller == "students") {
        alert("gonna go find")
        StudentModule.getStudentByID(id, function (students) {
            document.getElementById("loadingmsg").style.display = "none";
            showDetails(student);
        })
    }
    alert("nought to find")
})

function showDetails(obj){
    //Load Details
    alert("Display")
    for(var key in obj){
        if (key.toLowerCase() !== "id") {
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
