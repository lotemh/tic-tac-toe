var ticTacToe = {};

ticTacToe.init = function () {
    ticTacToe.currentPlayer = "red";
    ticTacToe.playerIndicator = $(".current-player-indicator");
    ticTacToe.playerIndicator.addClass(ticTacToe.currentPlayer);
    ticTacToe.boxes = $(".box");
    ticTacToe.boxes.on("click", ticTacToe.boxClicked);
};

ticTacToe.boxClicked = function (){
    $(this).addClass(ticTacToe.currentPlayer);
};

$(document).ready(function () {
    ticTacToe.init();
});