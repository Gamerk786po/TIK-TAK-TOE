// Global varibles
const winning_patterns=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn = true;
let gameover = false;
let winner = null;
let player_1_score = 0;
let player_2_score = 0;
let name_1 = "Player-1";
let name_2 = "Player-2";
// Querry selectors
const buttons = document.querySelectorAll(".buttons");
// querry selectors for scoreboard
let score_1 = document.querySelector("#player_1_score");
let score_2 = document.querySelector("#player_2_score");
// querry seletor for reset button
const reset_button = document.querySelector("#reset_button");
// querry selectors for change name
// For player name 1
let player_1_name = document.querySelector("#player_1_name");
const change_name_button_1 = document.querySelector("#change_player_1");
// for player name 2
let player_2_name = document.querySelector("#player_2_name");
const change_name_button_2 = document.querySelector("#change_player_2");
//  Functions
// Check winner checks the winner of game
const checkWinner = () => {
    // Using for of loop to iterate over winning patterns
    for(let pattern of winning_patterns){
        let val_1 = buttons[pattern[0]].textContent;
        let val_2 = buttons[pattern[1]].textContent;
        let val_3 = buttons[pattern[2]].textContent;
        let box_1 = buttons[pattern[0]];
        let box_2 = buttons[pattern[1]];
        let box_3 = buttons[pattern[2]];
        // Conditions
        // checks if values are empty or not
        if(val_1 !== "" && val_2 !== "" && val_3 !== "" )
            // contditon to check winner
            if(val_1 === val_2 && val_2 === val_3){
                winner = val_1;
                gameover = true;
                box_1.style.backgroundColor = "Blue";
                box_2.style.backgroundColor = "Blue";
                box_3.style.backgroundColor = "Blue";
                setTimeout(() => {
                    alertWinner()
                    updateScore()
                    reset()        
                    return true;
                }, 100)
            }
    }
    return null;
}
// Function to check if game is a tie or not
const checkDraw = () => {
    // To check if all the button are filled and no winner is found
    if([...buttons].every(button => button.textContent !== "")){
        winner = null;
        gameover = true
        setTimeout(() => {
            alert("It is draw");
            reset();
            return;
        }, 100)
    }
    return null
}
// Function to reset a game after a win or a draw
const reset = () => {
    if(gameover === true){
        buttons.forEach(btn => {
            btn.textContent = "";
            btn.style.backgroundColor = "#a2d2ff";
            btn.disabled = false;
            turn = true;
        })
    }
}
// Function to update the score of each player
const updateScore = () => {
    // Conditions to check for a winner and then updation
    if(winner === "X"){
        player_1_score++;
        score_1.textContent = player_1_score;
    }
    else if(winner === "O"){
        player_2_score++;
        score_2.textContent = player_2_score;
    }
    else{
        return null
    }
}
// Function that will annouce the winner
const alertWinner = () => {
    // Condtion to check who is winner
    if(winner === "X"){
        alert(`${name_1} have won the match..`)
    }
    else if(winner === "O"){
        alert(`${name_2} have won the match..`)
    }
    else{
        return null
    }
}
// Event listeners
// Main event listener
buttons.forEach(btn => {
    // Conditions
    btn.addEventListener("click", () => {
        if(turn === true){
            btn.textContent = "X"
            btn.style.color = "red";
            btn.style.fontSize = "40px";
            turn = false;
        }
        else if(turn === false){
            btn.textContent = "O"
            btn.style.color = "#219ebc";
            btn.style.fontSize = "40px";
            turn = true;          
        }
        btn.disabled = true;
        if(!checkWinner()){
            if(!gameover) {
                checkDraw();
            }}
    })
})
// Reset button event listener
reset_button.addEventListener("click", () => {
    player_1_score = 0;
    score_1.textContent = player_1_score;
    player_2_score = 0;
    score_2.textContent = player_2_score;
    buttons.forEach(btn => {
        btn.textContent = "";
        btn.disabled = false;
    })
    turn = true
    gameover = false;
    winner = null;
})
// Change name for player 1 event listener
change_name_button_1.addEventListener("click", ()=>{
    let new_name_1 = prompt("Enter the new name for Player-1: ");
    name_1 = new_name_1;
    player_1_name.textContent = name_1;
})
// Change name for player 2 event listener
change_name_button_2.addEventListener("click", () =>{
    let new_name_2 = prompt("Enter the new name for Player-1: ");
    name_2 = new_name_2;
    player_2_name.textContent = name_2;
})
