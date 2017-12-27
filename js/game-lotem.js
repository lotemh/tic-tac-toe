var ticTacToe = {};

ticTacToe.init = function () {
    ticTacToe.currentPlayer = 'red';  // We start from red, and than switch over to blue
    ticTacToe.playerIndicator = $('.current-player-indicator');
    ticTacToe.playerIndicator.addClass(ticTacToe.currentPlayer);
    ticTacToe.boxes = $('.box');
    ticTacToe.boxes.on('click', ticTacToe.clickOnBoxes);
    ticTacToe.initBoard();
    ticTacToe.assignPositionsToCells();
};
ticTacToe.assignPositionsToCells = function () {
    for (var i = 0; i < ticTacToe.matrix.length; i++) {
        for (var j = 0; j < ticTacToe.matrix[i].length; j++) {
            ticTacToe.boxes.eq(i * 3 + j)
                .data("i", i)
                .data("j", j);
        }
    }
};
ticTacToe.clickOnBoxes = function () {
    var boxClicked = $(this);
    boxClicked.addClass(ticTacToe.currentPlayer);
    var i = boxClicked.data('i');
    var j = boxClicked.data('j');
    ticTacToe.matrix[i][j] = ticTacToe.currentPlayer;
    if (ticTacToe.didPlayerWin(ticTacToe.currentPlayer)) {
        $('.result').text(ticTacToe.getName(ticTacToe.currentPlayer) + ' has won!');
        ticTacToe.resetGame();
    } else {
        if (!ticTacToe.checkIfGameShouldGoOn()) {
            $('.result').text('This is a tie');
            ticTacToe.resetGame();
        }
        ticTacToe.switchPlayer();
    }
};
ticTacToe.switchPlayer = function () {
    ticTacToe.currentPlayer = ticTacToe.currentPlayer === 'red' ? 'blue' : 'red';
    ticTacToe.playerIndicator.removeClass(ticTacToe.currentPlayer);
    ticTacToe.playerIndicator.addClass(ticTacToe.currentPlayer);
};
ticTacToe.initBoard = function () {
    ticTacToe.matrix = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
};
ticTacToe.resetGame = function () {
    ticTacToe.initBoard();
    ticTacToe.boxes.removeClass("red blue");
};
ticTacToe.didPlayerWin = function (player) {
    var rows = ticTacToe.matrix.find(arr => arr.filter(x => x === player).length === 3);
    var diag = [0, 1, 2].every(x => ticTacToe.matrix[x][x] === player) ||
        [0, 1, 2].every(x => ticTacToe.matrix[x][2 - x] === player);
    var cols = [0, 1, 2].find(x => [0, 1, 2].every(y => ticTacToe.matrix[y][x] === player));
    return rows || cols || diag;
};
ticTacToe.checkIfGameShouldGoOn = function () {
    // for(var i=0;i<ticTacToe.matrix.length;i++){
    //     for(var j=0; j<ticTacToe.matrix[i].length;j++) {
    //         if(ticTacToe.matrix[i][j] === "")
    //             return true;
    //     }
    // }
    var allCells = [];
    ticTacToe.matrix.forEach(element => {allCells = allCells.concat(element)});
    return allCells.includes("");
};
ticTacToe.setNames = function () {
    $('.btn-start-game').on('click', function () {
        var name1 = $('input.player1').val();
        var name2 = $('input.player2').val();

        if (name1 && name2) {
            $('span.player1').text(name1);
            $('span.player2').text(name2);
        }
    });
};
ticTacToe.getName = function (player) {
    if (player === "red") {
        return $('input.player1').val() || "red";
    }
    else {
        return $('input.player2').val() || "blue";
    }
};

$(document).ready(function () {
    ticTacToe.init();
    ticTacToe.setNames();
});



