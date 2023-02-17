window.onload = function(){
   
    main();
    
}



const dict = [
    {
        "word": "Pain",
        "hint": "Attending any class other than ENSF 381 gives you ____"
    },
    {
        "word": "Nerd",
        "hint": "You may be considered one, if you like Star Trek"
    },
    {
        "word": "Main",
        "hint": "Name of the function that starts a program in Golang and Java"
    },
    {
        "word": "Rick",
        "hint": "Lord of all memes"
    },
    {
        "word": "Data",
        "hint": "A USS Enterprise officer"
    },
    {
        "word": "Byte",
        "hint": "8 bits"
    },
    {
        "word": "HTML",
        "hint": "A markup language"
    },
    {
        "word": "Snow",
        "hint": "Bastards' last name in Game of Thrones"
    },
    {
        "word": "Borg",
        "hint": "An alien group in the Star Trek Universe"
    },
    {
        "word": "Yoda",
        "hint": "A true master, he is"
    },
    {
        "word": "Code",
        "hint": "As a softwae engineer, we need to do this a lot"
    },
    {
        "word": "Time",
        "hint": "It flies when you're in ENSF 381"
    },
    {
        "word": "Lame",
        "hint": "Compared to ENSF 381, your other courses are pretty ___"
    },
    {
        "word": "Xbox",
        "hint": "Like PS5, but worse"
    },
    {
        "word": "Bash",
        "hint": "Default shell on Ubuntu"
    },
    {
        "word": "curl",
        "hint": "A command-line tool for fetching data from the Internet"
    },
    {
        "word": "wget",
        "hint": "A command-line tool for downloading files from the Internet"
    },
    {
        "word": "tail",
        "hint": "A command-line tool for viewing the last part of a file"
    },
    {
        "word": "JSON",
        "hint": "A popular data-interchange format"
    },
    {
        "word": "Arya",
        "hint": "A character on Game of Thrones"
    },
    {
        "word": "Ross",
        "hint": "Pivot! Pivot!"
    }
]






function checkWord(i,correctWord){
    const myTable = document.getElementById('myTable');

    userWord = []
    
    for (cell = 0;cell<4;cell++){
        userWord.push(myTable.rows[i].cells[cell].innerHTML);
    }

    let stringUser = "";
    for (let p = 0; p < userWord.length; p++) {
        stringUser += userWord[p];
    }

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

            else{
                myTable.rows[i].cells[cell].style.backgroundColor = "yellow";

            }
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




function main(){

    const myTable = document.getElementById('myTable');
    var i = 0;
    var j = 0;
    guessedCorrect = false
    myTable.rows[0].cells[0].style.border ="2px solid red" ;
    let dark = false;
    let image = false

    indexValue = Number.parseInt(Math.random() * (dict.length))
    correctWord = dict[4].word.toLowerCase();
    correctHint = dict[4].hint;

    

    document.getElementById("StartOverButton").onclick = function(){

        for (row = 0;row<4;row++){
            for (col = 0;col<4;col++){
                myTable.rows[row].cells[col].innerHTML = ""
                myTable.rows[row].cells[col].style.backgroundColor = "grey";
                myTable.rows[row].cells[col].style.border ="0px solid red" ;


            }
        }

        i = 0
        j = 0
        document.getElementById("hint").innerHTML = ""

        indexValue = Number.parseInt(Math.random() * (dict.length))
        correctWord = dict[indexValue].word;
        correctHint = dict[indexValue].hint;
        myTable.rows[0].cells[0].style.border ="2px solid red" ;

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


    if (k.code === 'Enter'){
        
        if (j == 4){

            guessedCorrect = checkWord(i,correctWord);
                if (guessedCorrect){
                    alert("You Won")
                }
            
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




