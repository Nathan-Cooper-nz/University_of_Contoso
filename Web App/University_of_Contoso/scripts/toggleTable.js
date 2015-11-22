$(document).ready(function () {
    $('#ShowTable').hide();

    $("#HideTable").click(function () {
        $('#TableSection').slideUp(750, "swing");
        $('#HideTable').hide();
        $('#ShowTable').show();
    });
    $("#ShowTable").click(function () {
        $('#TableSection').slideDown(750, "swing");
        $('#ShowTable').hide();
        $('#HideTable').show();
    });
});