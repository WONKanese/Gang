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
        try {
            parseInt(strButInt);
            return true;
        } catch (error) {
            return false;
        }
    }

    function error(msg) {
        output.innerHTML += msg;
    }
    function loopWords(words) {
        let printstack = "";
        if (words.length === 0) {
            // Do nothing for empty line
        } else if (words[0][0] === "$") {
            // Do nothing cause comment
        } else if (words[0] === "YO") {
            if (words[1] === "RAP") {
                //printing
                for (let i = 2; i < words.length; i++) {
                    let toPrint = words[i];
                    if (toPrint[0] === '$') { //should swap word for variable value?
                        toPrint = glocks[toPrint.slice(1)];
                    }
                    toPrint = toPrint.toString();
                    if (printstack !== "") {
                        printstack += " " + toPrint;
                    } else {
                        printstack += toPrint;
                    }
                }
            } else if (words[1] === "GOT" && words[2] === "GLOCK" && can_convert(words[4])) {
                //create int var
                glocks[words[3]] = parseInt(words[4]);
            } 
            else if (words[1] == "SPIN" && words[2] == "DA" && words[3] == "BLOCK" && can_convert(words[4]) && can_convert(words[5])) {
                //looping
                loopamount = parseInt(words[4]) - 1 
                looplines = parseInt(words[5])
                maxloop = looplines
                startloop = line + 1
                return;
            } 
            else if (words[1] == "BIG" && words[2] in glocks) {
                if (can_convert(words[3])) {
                    glocks[words[2]] += parseInt(words[3]);
                }
                else if (words[3][0] == "$") {
                    if (words[3].slice(1) in glocks) {
                        glocks[words[2]] += glocks[words[3].slice(1)];
                    }
                }
            }
            else if (words[1] == "IS" && words[4] == "DA") {
                let if1 = 0;
                let if2 = 0;
                if (words[3][0] == "$") {
                    if(words[3].slice(1) in glocks) {
                        if1 = glocks[words[3].slice(1)];
                    }
                }
                else {
                    if1 = words[3];
                }

                if (words[2][0] == "$") {
                    if(words[2].slice(1) in glocks) {
                        if2 = glocks[words[2].slice(1)];
                    }
                }
                else {
                    if2 = words[2];
                }

                let toskip = 0
                if (can_convert(words[5])) {
                    toskip = parseInt(words[5]);
                }
                else if (words[5][0] == "$") {
                    if (words[5].slice(1) in glocks) {
                        toskip = glocks[words[5].slice(1)];
                    }
                }

                if (if1 != if2) {
                    line += toskip;
                }
            }
            else {
                error("SMOKE CAUGHT: GOOFY WORD AFTER YO!");
            }
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
