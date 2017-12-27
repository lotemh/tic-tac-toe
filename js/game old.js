var ticTacToe = {};

ticTacToe.init = function () {
    ticTacToe.boxes = $('.box');
    ticTacToe.matrix = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    for(var i=0;i<ticTacToe.matrix.length;i++){
        for(var j=0;j<ticTacToe.matrix[i].length;j++){
            ticTacToe.boxes.eq(i*3+j)
                .data("i",i)
                .data("j",j);
        }
    }
    ticTacToe.currentPlayer = 'red';  // We start from red, and than switch over to blue
    ticTacToe.playerIndicator = $('.current-player-indicator');
    ticTacToe.playerIndicator.addClass(ticTacToe.currentPlayer);
    ticTacToe.boxes.on('click', ticTacToe.clickOnBoxes);
};
ticTacToe.clickOnBoxes = function(){
    var boxClicked = $(this);
    if(ticTacToe.matrix[boxClicked.data('i')][boxClicked.data('j')] !== ""){
        return;
    }
    ticTacToe.matrix[boxClicked.data('i')][boxClicked.data('j')] = ticTacToe.currentPlayer;
    ticTacToe.renderBoard();

    if (ticTacToe.didPlayerWin(ticTacToe.currentPlayer)) {
        $('.result').text(ticTacToe.getName(ticTacToe.currentPlayer) + ' has won!');
        ticTacToe.resetMatrix();
    }
    else{
        if(!ticTacToe.checkIfGameShouldGoOn()){
            $('.result').text('This is a tie');
            ticTacToe.resetMatrix();
        }
    }
    ticTacToe.playerIndicator.removeClass(ticTacToe.currentPlayer);

    if (ticTacToe.currentPlayer === 'red') {
        ticTacToe.currentPlayer = 'blue';
    } else {
        ticTacToe.currentPlayer = 'red';
    }
    ticTacToe.playerIndicator.addClass(ticTacToe.currentPlayer);

};
ticTacToe.renderBoard = function () {
    ticTacToe.boxes
        .removeClass("blue")
        .removeClass("red");

    for(var i=0;i<ticTacToe.matrix.length;i++){
        for(var j=0; j<ticTacToe.matrix[i].length;j++) {
            ticTacToe.boxes.eq(i*3+j).addClass(ticTacToe.matrix[i][j]);
        }
    }
};
ticTacToe.resetMatrix = function () {
    for(var i=0;i<ticTacToe.matrix.length;i++){
        for(var j=0; j<ticTacToe.matrix[i].length;j++) {
            ticTacToe.matrix[i][j] = "";
        }
    }
    ticTacToe.renderBoard();
};
ticTacToe.didPlayerWin = function (player) {
    var rows = (ticTacToe.matrix[0][0] === player && ticTacToe.matrix[0][1] === player && ticTacToe.matrix[0][2] === player)
        || (ticTacToe.matrix[1][0] === player && ticTacToe.matrix[1][1] === player && ticTacToe.matrix[1][2] === player)
        || (ticTacToe.matrix[2][0] === player && ticTacToe.matrix[2][1] === player && ticTacToe.matrix[2][2] === player);
    var cols = (ticTacToe.matrix[0][1] === player && ticTacToe.matrix[1][0] === player && ticTacToe.matrix[2][0] === player)
        || (ticTacToe.matrix[0][1] === player && ticTacToe.matrix[1][1] === player && ticTacToe.matrix[2][1] === player)
        || (ticTacToe.matrix[0][2] === player && ticTacToe.matrix[1][2] === player && ticTacToe.matrix[2][2] === player);
    var diag = (ticTacToe.matrix[0][0] === player && ticTacToe.matrix[1][1] === player && ticTacToe.matrix[2][2] === player)
        || (ticTacToe.matrix[0][2] === player && ticTacToe.matrix[1][1] === player && ticTacToe.matrix[2][0] === player);
    return rows || cols || diag;
};
ticTacToe.checkIfGameShouldGoOn = function () {
    for(var i=0;i<ticTacToe.matrix.length;i++){
        for(var j=0; j<ticTacToe.matrix[i].length;j++) {
            if(ticTacToe.matrix[i][j] === "")
                return true;
        }
    }
    return false;
};
ticTacToe.setNames = function () {
    var button = $('.btn-start-game');
    //add event listener to the click of each box
    button.on('click', function () {
        var name1 = $('input.player1').val();
        var name2 = $('input.player2').val();

        if (name1 && name2) {
            $('span.player1').text(name1);
            $('span.player2').text(name2);
        }
    });
};
ticTacToe.getName = function(player){

    var name1 = $('input.player1').val();
    var name2 = $('input.player2').val();

    if (player === "red"){
        return name1 ? name1 : "red";
    }
    else{
        return name2 ? name2 : "blue";
    }
};

$(document).ready(function () {
    ticTacToe.init();
    ticTacToe.renderBoard();
    ticTacToe.setNames();
});



