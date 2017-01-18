$(document).ready(function() {
    $(".button").click(function(e) {
        e = $(e.target);
        keyPressed(e.html());
    });
});

var prev = 0;
var now = 0;
var operatorPressed = undefined;
var opEngaged = false;

function keyPressed(key) {
    var current = getScreen("str");
    switch (key) {
    case "C":
        opEngaged = false;
        prev = 0;
        now = 0;
        operatorPressed = undefined;
        $("#screen").html("0");
        break;
    case "+":
    case "*":
    case "/":
    case "-":
        handleOpPressed(key);
        break;
    case "=":
        opEngaged = false;
        handleEqualPressed(current);
        break;
    default:
        current = (current == 0 || opEngaged) ? key : current + key;
        $("#screen").html(current);
        now = current;
        opEngaged = false;
        resetColors();
        break;
    }
}

var stringified = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "+": "plus",
    "-": "minus",
    "*": "multiply",
    "/": "divide"
};

// Handle Operator Pressed
function handleOpPressed(op) {
    var id = "#" + stringified[op];
    var color = (operatorPressed) ? "red" : "blue";
    $(id).css("background-color", color);
    // If operator is already pressed, disable it.
    if (operatorPressed) {
        handleEqualPressed();
    }

    operatorPressed = (operatorPressed) ? undefined : op;
    opEngaged = (operatorPressed) ? true : false;

    // Do math
    prev = getScreen("num");
}

function handleEqualPressed() {
    var op = operatorPressed;
    var id = "#" + stringified[op];
    $(id).css("background-color", "red");
    var results = 0;
    now = getScreen("num");
    prev = Number(prev);
    switch (op) {
    case "+":
        results = prev + now;
        break;
    case "-":
        results = prev - now;
        break;
    case "*":
        results = prev * now;
        break;
    case "/":
        results = prev / now;
        break;
    }

    prev = results;
    $("#screen").html(results);
    operatorPressed = undefined;
}

function getScreen(type) {
    // Return screen contents as number or string.
    return (type == "num") ? Number($("#screen").html()) : $("#screen").html();
}

function resetColors() {
    var color = "red";
    var prop = "background-color";
    $("#" + stringified["+"]).css(prop, color);
    $("#" + stringified["-"]).css(prop, color);
    $("#" + stringified["*"]).css(prop, color);
    $("#" + stringified["/"]).css(prop, color);
    // operatorPressed = undefined;
}
