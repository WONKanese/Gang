document.addEventListener("DOMContentLoaded", function() {
    const codeInput = document.getElementById("codeInput");
    const runButton = document.getElementById("runButton");
    const output = document.getElementById("output");
    let lines = [];
    let line = 0;
    let glocks = {};
    
    //yucky ew looping
    let loopamount = 0
    let looplines = -1
    let maxloop = 0
    let startloop = 0

    function can_convert(strButInt) {
        const parsedInt = parseInt(strButInt);
        return !isNaN(parsedInt);
    }
    function isVar(str) {
        if (can_convert(str)) {
            return false;
        }
        else if (str in glocks) {
            return true;
        }
        else {
            error("GOOFY WORD FOR " + str);
        }
    }
    function check(check1, check2, amount, type) {
        let if1 = isVar(check2) ? glocks[check2] : check2;
        let if2 = isVar(check1) ? glocks[check1] : check1;

        let toskip = isVar(amount) ? glocks[amount] : parseInt(amount);
        if(toskip == 0) {
            error("YO FOOL THAT IS NOT GUD ZERO FOOL");
            return true;
        }
        if(type == 1 && if1 == if2) {
            return true;
        }
        else if (type == 2 && if1 > if2) {
            return true;
        }
        else if (type == 3 && if1 < if2) {
            return true;
        }
        else {
            line += toskip;
            return false;
        }
    }
    function error(msg) {
        output.innerHTML += "SMOKE CAUGHT!!! At Hood " + (line + 1) + "<br>" + msg + "<br>";
    }
    function loopWords(words) {
        let printstack = "";
        if (words.length === 0 || words[0].length < 1) {
            // Do nothing for empty line
        } else if (words[0][0] === "$") {
            // Do nothing cause comment
        } else if (words[0] === "YO") {
            if (words[1] === "RAP") {
                //printing
                for (let i = 2; i < words.length; i++) {
                    let toPrint = words[i];
                    if (toPrint[0] === '$' && toPrint.slice(1) in glocks) { //should swap word for variable value?
                        toPrint = glocks[toPrint.slice(1)];
                    }
                    toPrint = toPrint.toString();
                    if (printstack !== "") {
                        printstack += " " + toPrint;
                    } else {
                        printstack += toPrint;
                    }
                }
            } else if (words[1] === "GOT") {
                if(words.length != 5) {
                    error("MAN YOU AIN'T HAVE RIGHT ENOUGH WORDS FOR MAKING DAT");
                }
                if (words[2] !== "GLOCK") {
                    error("MAN YOU AIN'T GOT A GLOCK NEXT TO GOT FOOL");
                }
                if (can_convert(words[3])) {
                    error("GOOFY NAME FOR GLOCK " + words[3]);
                }

                //create int var
                if (can_convert(words[4])) {
                    glocks[words[3]] = parseInt(words[4]);
                }
                else if (words[4] in glocks) {
                    //set var to var
                    glocks[words[3]] = parseInt(glocks[words[4]]);
                }
                else {
                    error("GOOFY FOOL YOU PUT NO VARIABLE OR NUMBA FOR VALUE");
                }
                
                
            } 
            else if (words[1] == "SPIN" && words[2] == "DA" && words[3] == "BLOCK") {
                //looping
                loopamount = isVar(words[4]) ? glocks[words[4]] - 1 : parseInt(words[4]) - 1;
                console.log(loopamount);
                looplines = isVar(words[5]) ? glocks[words[5]] : parseInt(words[5]);
                maxloop = looplines
                startloop = line + 1
                return;
            } 
            else if (words[1] == "BIG") {
                if (words.length != 4) {
                    error("YO FOOL THAT IS NOT ENOUGH WORDS BEFORE YOU GET SMOKED");
                }
                if(words[2] in glocks){
                    glocks[words[2]] += isVar(words[3]) ? glocks[words[3]] : parseInt(words[3]);
                }
                else {
                    error("YO MAN " + words[2] + " ISNT IT FOOL YOU GOOF");
                }
            }
            else if (words[1] == "IS" && words[2] == "IT" && words[5] == "THEN") {
                check(words[4], words[3], words[6], 1);
            }
            else if (words[1] == "IS" && words[2] == "BIG" && words[5] == "THEN") {
                check(words[4], words[3], words[6], 2);
            }
            else if (words[1] == "IS" && words[2] == "LIL" && words[5] == "THEN") {
                check(words[4], words[3], words[6], 3);
            }
            else if (words[1] == "SPRAY" && words[2] in glocks) {
                if (words.length != 4) {
                    error("YO FOOL THAT IS NOT ENOUGH WORDS BEFORE YOU GET SMOKED");
                }
                if(words[2] in glocks){
                    glocks[words[2]] *= isVar(words[3]) ? glocks[words[3]] : parseInt(words[3]);
                }
                else {
                    error("YO MAN " + words[2] + " ISNT IT FOOL YOU GOOF");
                }
            }
            else if (words[1] == "LIL" && words[2] in glocks) {
                if (words.length != 4) {
                    error("YO FOOL THAT IS NOT ENOUGH WORDS BEFORE YOU GET SMOKED");
                }
                if(words[2] in glocks){
                    glocks[words[2]] -= isVar(words[3]) ? glocks[words[3]] : parseInt(words[3]);
                }
                else {
                    error("YO MAN " + words[2] + " ISNT IT FOOL YOU GOOF");
                }
            }
            else if (words[1] == "BANG" && words[2] in glocks) {
                if (words.length != 4) {
                    error("YO FOOL THAT IS NOT ENOUGH WORDS BEFORE YOU GET SMOKED");
                }
                if(words[2] in glocks){
                    glocks[words[2]] = isVar(words[3]) ? glocks[words[3]] : parseInt(words[3]);
                }
                else {
                    error("YO MAN " + words[2] + " ISNT IT FOOL YOU GOOF");
                }
            }
            else if (words[1] == "SMOKE" && words[2] in glocks) {
                if (words.length != 4) {
                    error("YO FOOL THAT IS NOT ENOUGH WORDS BEFORE YOU GET SMOKED");
                }
                if(words[2] in glocks){
                    glocks[words[2]] = isVar(words[3]) ? Math.sqrt(glocks[words[3]]) : Math.sqrt(parseInt(words[3]));
                    glocks[words[2]] = Math.round(glocks[words[2]]);
                }
                else {
                    error("YO MAN " + words[2] + " ISNT IT FOOL YOU GOOF");
                }
            }
            else {
                error("GOOFY WORD: " + words[1]);
            }
        }
        else {
            error("GOOFY WORD: " + words[0]);
        }

        if (printstack !== "") { //if this line prints to output then output
            output.innerHTML += printstack + "<br>";
            console.log(printstack);
        }

        if (looplines > 0) {
            looplines -= 1
        }
        
    
        if (looplines == 0) {
            //repeat lines that looped if still has to loop
            looplines = maxloop
            if (loopamount > 0){
                loopamount -= 1;
                line = startloop;
                loopWords(lines[line].split(' '));
            }
        }
    }

    runButton.addEventListener("click", function() {
        // Clear any previous output
        output.innerHTML = "";

        // Get the code from the textarea
        const code = codeInput.value;

        // Split the code into lines
        lines = code.split('\n');
        
        // Reset variables
        line = 0;
        glocks = {};
        loopamount = 0
        looplines = -1
        maxloop = 0
        startloop = 0

        while (line < lines.length) {
            //loop through lines
            let lineTXT = lines[line];
            let words = lineTXT.split(' ');
            loopWords(words);
            line += 1;
        }
    });
});
