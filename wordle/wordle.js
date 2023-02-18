window.onload = function(){
   
    main();
    
}


function checkWord(i,correctWord){
    
    const myTable = document.getElementById('myTable');
    stringUser = "";

    for (let cell = 0; cell < myTable.rows.length; cell++) {
    stringUser += myTable.rows[i].cells[cell].innerHTML}

    correctWord = correctWord.toLowerCase();
    stringUser = stringUser.toLowerCase();

    for (let cell = 0; cell < myTable.rows.length; cell++) {
        let check = correctWord.indexOf(stringUser[cell])

        if(check == -1){
            myTable.rows[i].cells[cell].style.backgroundColor = "grey";
        }
        else{
            indexCorrectChar = correctWord.indexOf(stringUser[cell])
            indexCorrectLastChar = correctWord.indexOf(stringUser[cell],[indexCorrectChar+1])

            if(cell == indexCorrectChar || cell == indexCorrectLastChar ){
                myTable.rows[i].cells[cell].style.backgroundColor = "green";
            }

            else{myTable.rows[i].cells[cell].style.backgroundColor = "yellow";}
        }
    }

    if(stringUser == correctWord ){
        for (let cell = 0; cell < myTable.rows.length; cell++) {
            myTable.rows[i].cells[cell].style.backgroundColor = "green";
        }
        return true;
    }

    return false;    
}



async function fetchDictionary() {
    const apiKey = "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv";
    const endpoint = "https://api.masoudkf.com/v1/wordle";

    const res = await fetch(endpoint, {
        headers: {
        "x-api-key": apiKey,
        },
    });
    const data = await res.json();
    return data.dictionary;
}




async function main(){

    const myTable = document.getElementById('myTable');
    var i = 0;
    var j = 0;
    guessedCorrect = false
    lost = false
    myTable.rows[0].cells[0].style.border ="2px solid red" ;
    let dark = false;
    let image = false
    let correctWord;
    let correctHint;
    
    const dic =  await fetchDictionary();

    const dict = JSON.parse(JSON.stringify(dic));
    
    
    let randomIndex = Math.floor(Math.random() * dict.length);

    
    correctWord = JSON.stringify(dict[randomIndex].word)
    correctHint = JSON.stringify(dict[randomIndex].hint)

    correctWord = correctWord.replace(/['"]/g, "");

    

    

    document.getElementById("StartOverButton").onclick = function(){

        for (row = 0;row<4;row++){
            for (col = 0;col<4;col++){
                myTable.rows[row].cells[col].innerHTML = ""
                myTable.rows[row].cells[col].style.backgroundColor = "antiquewhite";
                myTable.rows[row].cells[col].style.border ="0px solid red" ;


            }
        }

        i = 0
        j = 0
        document.getElementById("hint").innerHTML = ""

        if(lost){
            document.getElementById("lost").innerHTML = ""
        }


        indexValue = Number.parseInt(Math.random() * (dict.length))
        
        correctWord = JSON.stringify(dict[indexValue].word);
        correctHint = JSON.stringify(dict[indexValue].hint);
        correctWord = correctWord.replace(/['"]/g, "");


        myTable.rows[0].cells[0].style.border ="2px solid red" ;
        

        if(guessedCorrect){

        imgDelete = document.querySelector('img');
        imgDelete.remove(); 
        document.getElementById("mainWithoutRestart").style.display = "block";

        }

        guessedCorrect = false;
        alert(correctWord)

        
    }


    document.getElementById("darkButton").onclick = function(){
        if(!dark){
            document.body.style.backgroundColor = "Black";
            document.getElementById("myNav").style.backgroundColor = "black";
            document.getElementById("hint").style.color = "white";

            dark = true;
        }
        else if(dark){
            document.body.style.backgroundColor = "white";
            document.getElementById("myNav").style.backgroundColor = "white";
            document.getElementById("hint").style.color = "black";

            dark = false;
        }
    }

    
    document.getElementById("hintButton").onclick = function(){

        document.getElementById("hint").innerHTML = correctHint        
    }


    document.getElementById("infoButton").onclick = function(){

        if(!image){
            document.getElementById("main").style.display = "none";
            var img = document.createElement("img"); 
            img.src = "howToPlay.png"; 
            var src = document.body; 
            src.appendChild(img); 
            image = true;
        }
        else if(image){
            const imgDelete = document.querySelector('img');
            imgDelete.remove(); 
            document.getElementById("main").style.display = "block";
            image = false;
        }
        
        
    }
    




    document.addEventListener("keyup", (k) =>{


        if (guessedCorrect){
            alert("You Won")
            document.getElementById("mainWithoutRestart").style.display = "none";

            var imgWin = document.createElement("img"); 
            imgWin.src = "win.png"; 
            var src = document.body; 
            src.appendChild(imgWin); 

        }

        else if(i>3){
            alert("You Lost")
            lost = true
            loser = "You lost, the word was "
            lostText = loser.concat(correctWord)
            document.getElementById("lost").innerHTML = lostText
            document.getElementById("lost").style.backgroundColor = "red"

        }
    


    if (k.code === 'Enter' || k.code === 'Return' ){
        
        if (j == 4){

            guessedCorrect = checkWord(i,correctWord);
            
            myTable.rows[i].cells[3].style.border ="0px solid black" ;
            i = i + 1;
            j = 0;
            myTable.rows[i].cells[j].style.border ="2px solid red";

        }
        else{
            alert("Add more Letters")
        }
       
    }



    if (k.code === 'Backspace'){


        if(j == 4){
            
            myTable.rows[i].cells[3].innerHTML = ""
            myTable.rows[i].cells[3].style.border ="0px solid black" ;
            j = 2
            
            myTable.rows[i].cells[j].style.border ="2px solid red";
    
        }

        else if(j == 0){
            
            myTable.rows[i].cells[0].innerHTML = ""
            j = 0
            
            myTable.rows[i].cells[0].style.border ="2px solid red";
    
        }

        else if(j != 0){
            myTable.rows[i].cells[j].innerHTML = ""
            myTable.rows[i].cells[j].style.border ="0px solid black" ;
    
            j = j-1
            myTable.rows[i].cells[j].style.border ="2px solid red";
    
        }           

    }


    if ("KeyA" <= k.code && k.code <= "KeyZ"){


        if(j==3){
            myTable.rows[i].cells[j].innerHTML = k.key.toUpperCase();
            myTable.rows[i].cells[j].style.border ="0px solid black" ;
        
            j = j+1
            myTable.rows[i].cells[3].style.border ="2px solid red";
        }
        else{

            
            myTable.rows[i].cells[j].innerHTML = k.key.toUpperCase();
            myTable.rows[i].cells[j].style.border ="0px solid red" ;
        
            j = j+1
            myTable.rows[i].cells[j].style.border ="2px solid red";

        }
        


    }


    })

    
}




