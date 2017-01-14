$(document).ready(function() {
    $(".button").click(function(e) {
        e = $(e.target);
        keyPressed(e.html());
    });
});

var total = 0;
var operatorPressed = false;

function keyPressed(num) {

    var current = $("#screen").html()

    if (num == "AC") {
        $("#screen").html("0");
        return;
    }

    if (num == "*") {
        total = current;
        $("#screen").html("0");
        operatorPressed = !operatorPressed;
        return;
    }

    current = (current == 0) ? num : current + num;
    $("#screen").html(current);
}
