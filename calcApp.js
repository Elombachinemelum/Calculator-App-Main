//  ******************************************BRIEFING*******************************************************

// 1. appendNumber() handles the places of numbers that clicked to the screen. it also has the ability to clear screen before doing so.

// 2. handleOperation() does the job of moving the entered operand up to the answer output screen. in cases of chaining events
// it handles the complexity. chinging the operation, calling compute() setting the current operand.

// 3. compute() when called upon captures the value on the lower screen as the current operand, captures the operation being
// performed and then spits out the answer to the answer screen. if the value in the current operand does not make sense 
// it does not run at all.

// 4. del() this method simply deletes the current operand one character at a time. If its a single number. when the  screen
// contains an expression or chain of operation it acts as the reset() method and resets the whole process.
// it also does the job of removing characters appended to history = "" anytime its called upon.
// the history = "" gets its values from appendNumber() and handleOperation().

// 5. showHistory()  this methods only job when called is to display the history = "" on the screen ..its called in
// methods like compute() and appendNumber()

// 6. reset() does exactly what it says. resets the whole process to default. it also clears the history ="";

class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
    }
    
    toggleTheme(){
        if(currentTheme == "1"){
            document.querySelector(".one").click();
            currentTheme = 2;
        }else if(currentTheme == "2"){
            document.querySelector(".two").click();
            currentTheme = 3;
        }else if(currentTheme == "3"){
            document.querySelector(".three").click();
            currentTheme = 1;
        }
    }

    appendNumber(clickedNumber){  //settled
        if(outputScreen.value.includes(".") && clickedNumber === ".") return
            //this just stops the function from running any other line.....
        
        if(outputScreen.value.includes("+") || outputScreen.value.includes("/") || outputScreen.value.includes("*")){
            // codes here will atleast need the screen to contain an operator(this only occurs when .showHistory() is activated)
            if(end == true){  //the only time is ever true is when you click equals to manually. once the operators are click end == false again
                this.reset() //reset and start afresh
                outputScreen.value = outputScreen.value + (clickedNumber.toString());
                // history = history + (clickedNumber.toString());  //adds this to our history....
            }else{
                // this only occurs when we are chaining operations...
                outputScreen.value = "";
                outputScreen.value = outputScreen.value + (clickedNumber.toString());
                // history = history + (clickedNumber.toString());  //adds this to our history....
            }
            outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
        }else if(outputScreen.value.includes("-")){ //SPECIAL CASES NEED SPECIAL ATTENTION...
            // let first = outputScreen.value.slice(0, 1);...not needed
            let second = outputScreen.value.slice(1);

            // we must check that after the first charater there are no more operators. if this is true then the display
            // must be a single negative number
            if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
                if(end == true){  //the only time is ever true is when you click equals to manually. once the operators are click end == false again
                    this.reset() //reset and start afresh
                    outputScreen.value = outputScreen.value + (clickedNumber.toString());
                    // history = history + (clickedNumber.toString());  //adds this to our history....
                }else{
                    // this only occurs when we are chaining operations...
                    outputScreen.value = "";
                    outputScreen.value = outputScreen.value + (clickedNumber.toString());
                    // history = history + (clickedNumber.toString());  //adds this to our history....
                }
                outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
            }else{
                // IF INDEED ITS A SINGLE NEGATIVE NUMBER...
                // code here will run when the screen contains (-) but nothing else as it would in a negative number...
                outputScreen.value = outputScreen.value + (clickedNumber.toString());
                // history = history + (clickedNumber.toString());  //adds this to our history....
                outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
            }
        }else{
            // code here will run when ever the screen is clear by default. so @ the begining when not even an operator is on the screen...
            outputScreen.value = outputScreen.value + (clickedNumber.toString());
            // history = history + (clickedNumber.toString());  //adds this to our history....
            outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
        } 
    }

    handleOperation(operator){
        
        if(outputScreen.value.includes("-") && outputScreen.value.length == "1") return //so if the only element on screen is not a number..
        
        if(outputScreen.value === "" && outputScreenUpper.value != ""){
            //if last operator is /...
            if(outputScreenUpper.value.slice(-1) === "/"){
                if(operator === "X"){
                    // replace in history
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    operator = "*";
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  // no need to add what is there already. unless "-"
                    this.operation = "*"; //the computer reasons not on its own hence if we dont set this the operation remains the old value "/"
                    return
                }
                if(operator ==="+"){
                    // replace in history
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  //add to our history the new operator..
                    this.operation = operator; //the computer reasons not on its own hence if we dont set this the operation remains the old value "/"
                    return
                }

                if(operator === "-"){
                    // adding to history(rather just to screen)
                    if(outputScreen.value.includes("-")) return
                    outputScreen.value = outputScreen.value + operator;
                    // removed code from old file (adding to history command)
                    return
                }
            }
            // if last operator is "*"
            if(outputScreenUpper.value.slice(-1) === "*"){
                // replacing in history
                if(operator === "+"){
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  // no need to add what is there already. unless "-" 
                    this.operation = operator; //the computer reasons not on its own hence if we dont set this the operation remains the old value "*"
                    return
                }
                if(operator ==="/"){
                    // replace in history
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  // no need to add what is there already. unless "-"  
                    this.operation = operator; //the computer reasons not on its own hence if we dont set this the operation remains the old value "*"
                    return
                }

                if(operator === "-"){
                    // adding to history..
                    outputScreen.value = outputScreen.value + operator;
                    // removed code from old file (adding to history command) 
                    return
                }
            }
            // if last operator is "+".....
            if(outputScreenUpper.value.slice(-1) === "+"){
                if(operator === "/" || operator ==="X"){
                    if(operator ==="X"){
                        operator = "*";
                        // replace in history
                        history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                        outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                        this.operation = operator;
                        if(history.slice(-1) === operator){
                            if(operator === "-"){
                                history = history + operator;
                            }
                        }else{
                            history = history + operator;
                        }  // no need to add what is there already. unless "-"
                        return
                    }
                    if(operator =="/"){
                        // FOR WHEN WE CLICK "/"...
                        // replace in history
                        history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                        outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                        this.operation = operator;
                        if(history.slice(-1) === operator){
                            if(operator === "-"){
                                history = history + operator;
                            }
                        }else{
                            history = history + operator;
                        }  // no need to add what is there already. unless "-"
                        return
                    }
                    
                }
            }
            // if last character is "-"
            if(outputScreenUpper.value.slice(-1) === "-"){
                // changing X to "*"
                if(operator ==="X"){
                    operator = "*";
                    // replace in history
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    this.operation = operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  // no need to add what is there already. unless "-"
                    return
                }
                if(operator ==="/" || operator === "+"){
                    // replace in history
                    history = history.slice(0, (history.length - 1)) //we remove the previous operator to replace it @the buttom
                    outputScreenUpper.value = outputScreenUpper.value.slice(0, (outputScreenUpper.value.length - 1)) + operator;
                    if(history.slice(-1) === operator){
                        if(operator === "-"){
                            history = history + operator;
                        }
                    }else{
                        history = history + operator;
                    }  // no need to add what is there already. unless "-"  
                    this.operation = operator; //the computer reasons not on its own hence if we dont set this the operation remains the old value "*"
                    return
                }

                if(operator === "-"){
                    // adding to history..(not anymore)
                    outputScreen.value = outputScreen.value + operator;
                    // removed code from old file (adding to history command) 
                    return
                }
            }

        }
        if(outputScreen.value === "" && outputScreenUpper.value ===""){
            if(operator != "X" && operator != "/" && operator != "+"){
                outputScreen.value = outputScreen.value + operator; 
                // removed code from old file (adding to history command) 
                return
            } //once the condition is true the rest of the function does not run...after we append the operator to screen
        }else if(outputScreen.value === "" && outputScreenUpper.value !=""){
            if(operator != "X" && operator != "/" && operator != "+"){
                outputScreen.value = outputScreen.value + operator; 
                // removed code from old file (adding to history command) 
                return
            }
        } //once the condition is true the rest of the function does not run...after we append the operator to screen
        
        
        //1. implementing working behaviour one (when outputupper is empty).......
        if(outputScreenUpper.value === ""){ 
            if(outputScreen.value.length === 0) return //because we dont want to enter an operand first. except(+ & -)
            //turning X into *
            if(operator =="X"){
                operator = "*";
                
                // once called upper screen takes the value of lower screen..
                outputScreenUpper.value = outputScreen.value + " " + operator; 

                //be sure to get rid of any ","
                this.previousOperand = outputScreen.value.replace(/,/gi,"");  //effectively .previousOPerand is a property of our calculator object when created
                history = history + outputScreen.value; //add formatted value to history
                // cant add what is already there only "-"
                if(history.slice(-1) === operator){
                    if(operator === "-"){
                        history = history + operator;
                    }
                }else{
                    history = history + operator;
                }  //add to our history..
                this.operation = operator;  //the innerText of the operator that was clicked
                outputScreen.value = "";  //clear lower O/P to allow new entry...
            }else{
                this.previousOperand = outputScreen.value.replace(/,/gi, "");  //effectively .previousOPerand is a property of our calculator object when created
                outputScreenUpper.value = outputScreen.value + " " + operator;
                history = history + outputScreen.value; //add formatted value to history
                // cant add what is already there only "-"
                if(history.slice(-1) === operator){
                    if(operator === "-"){
                        history = history + operator;
                    }
                }else{
                    history = history + operator;
                } 
                this.operation = operator;  //the innerText of the operator that was clicked
                outputScreen.value = "";  //clear lower O/P to allow new entry...
            }
        }
        
        //2. Implementing working behaviour two (When neigther lower or upper screen is empty is they both have values)..............
        if(outputScreen.value != "" && outputScreenUpper.value != ""){
            
            //a way to change operations on the fly.....
            if(isNaN(outputScreen.value.slice(-1))){
                if(outputScreenUpper.value.slice(-1) === "+" || outputScreenUpper.value.slice(-1) === "-"){
                    
                    // changing X to "*"......
                    if(operator === "X"){
                        // replace operator....
                        // remove from history to replace later..
                        history = history.slice(0, (history.length-1));
                        operator = "*";
                        outputScreen.value = outputScreen.value.slice(0, outputScreen.value.length-1) + operator;
                        outputScreenUpper.value = outputScreenUpper.value.slice(0, outputScreenUpper.value.length-1) + operator;
                        this.operation = operator;
                        // cant add what is already there only "-"
                        if(history.slice(-1) === operator){
                            if(operator === "-"){
                                history = history + operator;
                            }
                        }else{
                            history = history + operator;
                        }
                        return
                    }
                    if(operator !="-"){
                        // remove from history to replace later..
                        history = history.slice(0, (history.length-1));
                        outputScreen.value = outputScreen.value.slice(0, outputScreen.value.length-1) + operator;
                        outputScreenUpper.value = outputScreenUpper.value.slice(0, outputScreenUpper.value.length-1) + operator;
                        this.operation = operator;
                        // rule for adding operator to history ....
                        // cant add what is already there only "-"
                        if(history.slice(-1) === operator){
                            if(operator === "-"){
                                history = history + operator;
                            }
                        }else{
                            history = history + operator;
                        }
                        return
                    }
                    if(operator === "-"){
                        // adding to screen here...
                        outputScreen.value = "";
                        if(outputScreen.value.slice(-1) != "-"){
                            outputScreen.value = outputScreen.value + operator;
                        }
                        // removed code from old file (adding to history command)
                        return
                    }
               }else if(outputScreenUpper.value.slice(-1) === "*" || outputScreenUpper.value.slice(-1) === "/"){
                   if(operator != "-"){
                        // changing X to "*"......
                        if(operator === "X"){
                            operator = "*";
                            // remove from history to replace later..
                            history = history.slice(0, (history.length-1))
                            outputScreen.value = outputScreen.value.slice(0, outputScreen.value.length-1) + operator;
                            outputScreenUpper.value = outputScreenUpper.value.slice(0, outputScreenUpper.value.length-1) + operator;
                            this.operation = operator;
                            // cant add what is already there only "-"
                            if(history.slice(-1) === operator){
                                if(operator === "-"){
                                    history = history + operator;
                                }
                            }else{
                                history = history + operator;
                            }
                            return
                        }else{

                            // remove from history to replace later..
                            history = history.slice(0, (history.length-1))
                            outputScreen.value = outputScreen.value.slice(0, outputScreen.value.length-1) + operator;
                            outputScreenUpper.value = outputScreenUpper.value.slice(0, outputScreenUpper.value.length-1) + operator;
                            this.operation = operator;
                            // cant add what is already there only "-"
                            if(history.slice(-1) === operator){
                                if(operator === "-"){
                                    history = history + operator;
                                }
                            }else{
                                history = history + operator;
                            }
                            return
                        }
                        
                   }else{
                        outputScreen.value = ""; //clear screen...
                        outputScreen.value = outputScreen.value + operator; //append operator to a now empty screen..
                        // removed code from old file (adding to history command)
                        return
                   }
               }
            }
            //turning X into *
            if(operator =="X"){
                operator = "*";
                
                // in this case we'd like to click the equality button first then proceed to do other things....
                equalityButton.click();
                this.previousOperand = outputScreenUpper.value.replace(/,/gi, "")  //this also alse be needed by compute()
                // cant add what is already there only "-"
                if(history.slice(-1) === operator){
                    if(operator === "-"){
                        history = history + operator;
                    }
                }else{
                    history = history + operator;
                }  //add to our history..
                outputScreenUpper.value = outputScreenUpper.value + " " + operator;  //update the answer display to append the selected operator to result from compute()
                this.operation = operator;  //this will be needed by the compute() since its set as undefined once the fnction runs..
                
            }else{
                // in this case we'd like to click the equality button first then proceed to do other things....
                equalityButton.click();
                this.previousOperand = outputScreenUpper.value.replace(/,/gi, "")  //this also alse be needed by compute()
                // cant add what is already there only "-"
                if(history.slice(-1) === operator){
                    if(operator === "-"){
                        history = history + operator;
                    }
                }else{
                    history = history + operator;
                }  //add to our history..
                outputScreenUpper.value = outputScreenUpper.value + " " + operator; //update the answer display to append the selected operator to result from compute()
                this.operation = operator;  //this will be needed by the compute() since its set as undefined once the fnction runs..
            }
            // we only need to this in mode 2 so that the screen is updated to enable appendNumber(); work properly
            this.showHistory(history);  //to update display...
        }
        end = false; // this is at the end here to counter the effect of compute();
        // we call handleOperator() function and it calls compute() depending on the conditions. however @ end of code flow
        // we want it back on. so the operation can only ever end when we click equal manually
        //and hence we can use this value to reset the calc when we try to click a number

        // console.log(this.previousOperand)  //which logs the current value in the lower output screen........
        
        // remember that the value of this is representing the object name to be created using this class. 
        // in our case is the calculator object....
    }

    compute(operation){  //we click the equality button and it triggers this...
        if(outputScreenUpper.value === "") return //single value is always equal to the same thing
        if(isNaN(parseFloat(outputScreen.value.slice(-1)))) return; //simply stops compute() from running when you are yet to enter currentOperand
        // console.log(operation + " is..."); for debugging
        // when we click our equality sign we need to be able to take the previous and current numbers and perform the operation
        this.currentOperand = outputScreen.value.replace(/,/gi, ""); //this gets the new value after the wipe occured  in .handleOperation() ..
        
        //1. EVALUATING TO MAKE SURE A NUMBER RATHER THAN AN EXPRESSION GETS ADDED TO THE HISTORY...
        //2. THIS BIT OF LOGIC IS THE ULTIMATE(TEST TO TELL A NUMBER APART FROM EXPRESSIONS). HAS BEEN USED IN DIFFERENT PARTS OF THIS CODE..
        // this test is necessary because when the upper and lower screens have content in them. the handleOperator()
        // clicks the equality which fires the compute(). then the compute tries to add the content of the lower screen
        // which may or may not be an expression. hence the check
        if(outputScreen.value.includes("+") || outputScreen.value.includes("/") || outputScreen.value.includes("*")){
            // codes here will atleast need the screen to contain an operator(this only occurs when .showHistory() is activated)
            return
        }else if(outputScreen.value.includes("-")){ //SPECIAL CASES NEED SPECIAL ATTENTION...
            let second = outputScreen.value.slice(1);

            // we must check that after the first charater there are no more operators. if this is true then the display
            // must be a single negative number
            if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
            //    do nothing again...
            return
            }else{
                // IF INDEED ITS A SINGLE NEGATIVE NUMBER...
                // code here will run when the screen contains (-) but nothing else as it would in a negative number...
                history = history + outputScreen.value //add formatted value to history..
            }
        }else{
            // code here will run when ever the screen just has a single non negative number...
            history = history + outputScreen.value //add formatted value to history..
        } //   END OF EVALUATION...
        let prev = parseFloat(this.previousOperand); 
        let curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return //in the case wr you type noting or havnt type anything before. function stops
        // now lets use the switch to deside which computation to do depending on what the operation is....
        switch (operation) {
            case "+":
                outputScreenUpper.value = (prev + curr);  //using toFixed() in any of these would be limiting answers
                break;
            case "-":
                outputScreenUpper.value = (prev - curr);
                break;
            case "*":
                outputScreenUpper.value = (prev * curr);
                break;
            case "/":
                outputScreenUpper.value = (prev / curr);
                break;
            default:
            break;
        }
        
        outputScreenUpper.value = this.formatDisplay(outputScreenUpper.value)// we format our display..
        lastAnswer = outputScreenUpper.value //the formatted gets saved in the lastAnswer. info in this string is never reset.
        // however it does not store more than one previous answer...
        this.showHistory(history);
        end = true;  // meaning any number that is clicked will reset our imput
        
        this.currentOperand = undefined;  //since we are done computing at this point...
        this.operation = undefined; //this is so because after we compute results we do not have a set operation anymore
        
    }
    del(anyString){
        if(anyString === "") return //no need to run when the display is empty
        // here i have added the latter condition to make sure this occurs only when compute() is activated
        if(anyString.length == "1" && anyString == history){  //NB .length returns number format. hence use (==) to compare not (===)
            outputScreen.value = anyString.slice(0, (anyString.length-1));
            if(history.slice(-1) === outputScreen.value.slice(-1)){
                history = history.slice(0, (history.length-1));
            } //remove also from our history..
            this.reset(); return //some neat logic. once length is one it does the function and then resets...
        }
        
        if(outputScreen.value.includes("-") || outputScreen.value.includes("+") || outputScreen.value.includes("/") || outputScreen.value.includes("*")){ //SPECIAL CASES NEED SPECIAL ATTENTION...
            
            let second = outputScreen.value.slice(1); //slice from second charecter till end..

            // we must check that after the first charater there are no more operators. if this is true then the display
            // must be a single negative number
            if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
                this.reset(); return
            }else{
                // IF INDEED ITS A SINGLE NEGATIVE NUMBER...
                // code here will run when the screen contains (-) but nothing else as it would in a negative number...
                outputScreen.value = anyString.slice(0, (anyString.length-1));
                if(history.slice(-1) === outputScreen.value.slice(-1)){
                    history = history.slice(0, (history.length-1));
                } //remove also from our history..
                outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
            }
        }else{
            // code here will run when ever the screen is clear by default. so @ the begining when not even an operator is on the screen...
            // we want to slice any string and cut of the last character each time....
            // this simple line could have been implemented in the delbutton callback function. but we want a complete calculator class.
            // that uses methods on the object.
            outputScreen.value = anyString.slice(0, (anyString.length-1));
            if(history.slice(-1) === outputScreen.value.slice(-1)){
                history = history.slice(0, (history.length-1));
            } //remove also from our history..
            outputScreen.value = this.formatDisplay(outputScreen.value)// we format our display..
        }
     
    }

    returnSquareRoot(aString){
        // astring refers to a string to be converted to number befrore we compute the square root..
        if(aString.includes(".") && aString.length == "1"){
            return aString //we dont want to compute square root of "." alone. so we return aString as it is
            // we cant just write return because we are passing the outputScreen.value to the output of this function
            // when thr function returns nothing then the outputScreen.value in turn becomes undefined 
        } 

        let notFormattedAString = aString.replace(/,/gi, "");
        if(outputScreen.value.includes("-") || outputScreen.value.includes("+") || outputScreen.value.includes("/") || outputScreen.value.includes("*")){
            if(outputScreenUpper.value != ""){  //verify that an answer is actually displayed on screen..
                if(isNaN(outputScreen.value.slice(-1)) == false){
                    // so its a number...and we are not chaining operations..
                    // now we slice from the second character to see if we find any operator...
                    let second = outputScreen.value.slice(1);
                    if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
                        // if this returns true then its safe to say we have the answer on display and below is the history.
                        this.reset();
                        if(parseFloat(lastAnswer.replace(/,/gi, "")) >= 0){
                            // ie if its positive
                            let noneFormat = lastAnswer.replace(/,/gi, "")
                            return this.formatDisplay(Math.pow(noneFormat, 0.5));
                        }else{
                            // if it is negative..
                            // we slice it up and get the square root of +ve part..
                            let noneFormat = lastAnswer.replace(/,/gi, "");
                            let first = noneFormat.slice(0,1);  //should be "-"
                            let second = noneFormat.slice(1); // the positive part..
                            return this.formatDisplay(first + Math.pow(second, 0.5));  //concactenate result and format..
                        }
                    }
                    
                }
            }  
        }
        if(notFormattedAString.includes("-") || notFormattedAString.includes("+") || notFormattedAString.includes("/") || notFormattedAString.includes("*")){ //SPECIAL CASES NEED SPECIAL ATTENTION...
            let first = notFormattedAString.slice(0,1) //keep the first part..
            let second = notFormattedAString.slice(1); //slice from second charecter till end..

            // we must check that after the first charater there are no more operators. if this is true then the display
            // must be a single negative number
            if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
                return aString //we cant have squareroot of an expression.
            }else{
                // IF INDEED ITS A SINGLE NEGATIVE NUMBER...
                // code here will run when the screen contains (-) but nothing else as it would in a negative number...
                // Math.pow already changes the string to a number hence we dont have to....
                let finalResult = this.formatDisplay(first + Math.pow(second, 0.5)) // pass in concactenated values in for formatting
                return finalResult; //we pass only the second none negative part into Math.pow() then we return the formatted result
            }
        }else{
            // code here will run when ever the screen has no operator, either empty or filled with positive integers...
            // in this event we simply want to return the squareroot.
            // Math.pow already changes the string to a number hence we dont have to....
            let finalResult = this.formatDisplay(Math.pow(notFormattedAString, 0.5))
            return finalResult //the formatted value
        }
    }

    fetchPreviousAnswer(aPreviousAnswer){
        if(outputScreen.value === aPreviousAnswer){
            outputScreen.value = ""; //instead of having to wipe the digits one at a time...
            return
        }
        
        if(outputScreen.value.includes("-") || outputScreen.value.includes("+") || outputScreen.value.includes("/") || outputScreen.value.includes("*")){ //SPECIAL CASES NEED SPECIAL ATTENTION...
            // then we have to confirm that the only character on display is operator is "-"
            if(outputScreen.value.slice(-1) === "-" && outputScreen.value.length == "1"){
                // if this is true then we just want to also see if the first character in aPreviousAnswer is "-"..
                if(aPreviousAnswer.slice(0,1) === "-"){
                    // if so then we simply change the display to show the previews answer..
                    outputScreen.value = aPreviousAnswer.slice(1);
                    return //to stop function from checking other rules which may also return true
                }
            }
            // if the above is not the case..
            let second = outputScreen.value.slice(1); //slice from second charecter till end..

            // we must check that after the first charater there are no more operators. if this is true then the display
            // must be a single negative number
            if(second.includes("-") || second.includes("+") || second.includes("/") || second.includes("*")){
                // if the condition is satisfied then we have an expression on the screen...
                // this means the previous answer is already on the upper screen...
                if(isNaN(parseFloat(outputScreen.value.slice(-1)))){
                    // this is to confirm that we are chaining commands... 
                    // in this case we want to change the value of the screen to display the previous answer..
                    outputScreen.value = aPreviousAnswer;
                }
            }else{
                if(outputScreen.value.length == "1"){
                    // IF INDEED ITS A SINGLE NEGATIVE NUMBER...
                    // code here will run when the screen contains (-) but nothing else...
                    // in this case we want to append the previous answer to the "-"
                    outputScreen.value = outputScreen.value + aPreviousAnswer;
                }
            } 
        }else{
            // code here will run when ever the screen is empty...
            if(outputScreen.value === ""){
                // in this case we simply want to change the display value to show the previous answer....
                outputScreen.value = aPreviousAnswer;
            }
        }
    }

    showHistory(stringOfChoice){
        outputScreen.value = stringOfChoice; //updates the screen to show history.
    }

    formatDisplay(someValue){
        // lets make sure our value is a string
        const stringSomeValue = someValue.toString();
        if (stringSomeValue === "-" || stringSomeValue ===""){
            return someValue
        }
        if(stringSomeValue.includes(".")){
            // parseFloat(stringSomeValue.split(".") splits our value into some 2 character array[] before and after the decimal point.
            // this is to avoid the parseFloat() rejecting "." so we delimit the integer part and concactenate it to the decimals
            const integerPartOFSomeString = parseFloat(stringSomeValue.split(".")[0].replace(/,/gi, ""))
            let wholeNumberInteger = integerPartOFSomeString.toLocaleString("en", {maximumFractionDigits:0});
            const decimalPartOfSomeString = stringSomeValue.split(".")[1]
            if(isNaN(integerPartOFSomeString)){
                return someValue //no formatting needed
            }else{
                let formatedSomeValue = wholeNumberInteger + "." + decimalPartOfSomeString;
                return formatedSomeValue;
            }
            
        }else{
            // because we have to parseFloat() this value above. when its 4,500 parseFloat() will return 4 and this is because 
            // "," is not supported by parseFloat() hence we have to replace all "," with "" then parseFloat them again
            let formatedSomeValue = parseFloat(stringSomeValue.replace(/,/gi, "")).toLocaleString("en", {maximumFractionDigits:0});
            // we want to call this function anytime we append numbers to screen.. since it has an output...
            // also when we delete them from screen
            return formatedSomeValue;
        }
        
    }
    updateTime(){
        return new Date().toLocaleTimeString("en-GB");
    }

    // convertToExponence(baseNumber,power){
    //     // we'd use this to compute the square roots
    //     inversePower = 1/power;
    //     floatBaseNumber = parseFloat(baseNumber.toString());
    //     floatInversePower = parseFloat(inversePower.toString());
    //     return Math.pow(floatBaseNumber, floatInversePower);
    // }

    reset(){
        outputScreen.value = "";
        outputScreenUpper.value = "";
        history = "";  //clear history too.....
    }
}
// some counting variables....
let history = ""; //for storing operation sequence
let end = false; // this is false when the compute(); function is not yet run.
let currentTheme = 2; //by default..when toggle is used it moves to next theme.
let lastAnswer = ""; // for storing prevoius answer...

// now lets create some glabal variables...............
const numberButtons = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelector("[data-del]");
const resetButton = document.querySelector("[data-reset]");
const equalityButton = document.querySelector("[data-equality]");
const outputScreen = document.querySelector("[data-output]");
const outputScreenUpper = document.querySelector("[data-upper-output]");
let buttons = document.querySelectorAll(".white-buttons");  //just the white buttons....
const squareRootButton = document.querySelector("[data-squareroot]");
const previousAnswer = document.querySelector("[data-answer]");
const activeTheme = document.querySelector("[data-active-theme]");
let resets = document.querySelectorAll(".reset");
let equals = document.querySelectorAll(".equality");
let timeOutput = document.getElementById("time-display");


document.querySelector(".one").addEventListener("click", ()=>{
    // we remove theme 2 and three...........
    document.querySelector(".active-theme").classList.remove("active-theme3", "active-theme2");
    document.querySelector(".container").classList.remove("container3", "container2");
    document.querySelector(".theme-ball").classList.remove("theme-ball3", "theme-ball2");
    document.querySelector(".output").classList.remove("output3", "output2");
    document.querySelector(".bottom").classList.remove("bottom3", "bottom2");
    document.querySelector(".del").classList.remove("del-reset3", "del-reset2");
    // document.querySelector(".reset").classList.remove("del-reset3", "del-reset2");
    document.querySelector(".upper-output").classList.remove("upper-output3", "upper-output2");
    buttons.forEach(button=>{
        button.classList.remove("white-buttons3", "white-buttons2");
    });

    document.querySelectorAll(".equality").forEach(equal=>{
        equal.classList.remove("equality3", "equality2");
    })

    resets.forEach(reset=>{
        reset.classList.remove("del-reset3", "del-reset2");
    });
    // document.querySelector(".equality").classList.remove("equality3", "equality2");
    document.querySelector(".label-section").classList.remove("label-section3", "label-section2");
    currentTheme = 2;
})

document.querySelector(".two").addEventListener("click", ()=>{
    // we clear theme three first then add theme two in................
    $(".active-theme").removeClass("active-theme3").addClass("active-theme2");
    $(".container").removeClass("container3").addClass("container2");
    $(".theme-ball").removeClass("theme-ball3").addClass("theme-ball2");
    $(".output").removeClass("output3").addClass("output2");
    $(".bottom").removeClass("bottom3").addClass("bottom2");
    $(".del").removeClass("del-reset3").addClass("del-reset2");
    // $(".reset").removeClass("del-reset3").addClass("del-reset2");
    $(".white-buttons").removeClass("white-buttons3").addClass("white-buttons2");
    equals.forEach(equal=>{
        equal.classList.remove("equality3");
        equal.classList.add("equality2");
    });
    resets.forEach(reset=>{
        reset.classList.remove("del-reset3");
        reset.classList.add("del-reset2");
    });
    // $(".equality").removeClass("equality3").addClass("equality2");
    $(".label-section").removeClass("label-section3").addClass("label-section2");
    $(".upper-output").removeClass("upper-output3").addClass("upper-output2");
    currentTheme = 3;
});

document.querySelector(".three").addEventListener("click", ()=>{
    $(".active-theme").addClass("active-theme3");
    $(".container").addClass("container3");
    $(".theme-ball").addClass("theme-ball3");
    $(".output").addClass("output3");
    $(".bottom").addClass("bottom3");
    $(".del").addClass("del-reset3");
    // $(".reset").addClass("del-reset3");
    $(".white-buttons").addClass("white-buttons3");
    equals.forEach(equal=>{
        equal.classList.add("equality3"); //mixing javascript and jquery..not in the same line.
    });
    resets.forEach(reset=>{
        reset.classList.add("del-reset3"); //mixing javascript and jquery..not in the same line..
    });
    // $(".equality").addClass("equality3");
    $(".label-section").addClass("label-section3");
    $(".upper-output").addClass("upper-output3");
    currentTheme = 1;
});

// ...........................LISTENING ON OUR CONSTANSTS AND CALLING THEIR METHOD...........................  

// we create our calculator object with our constructor.....
const calculator = new Calculator(outputScreenUpper.value, outputScreen.value);

setInterval(()=>{
    timeOutput.innerText = calculator.updateTime();
},1000)


// lets add event listener to the toggle....
activeTheme.addEventListener("click", ()=>{
    calculator.toggleTheme();
})

// add listeners to all the number buttons.........
numberButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.appendNumber(button.innerText);
    })
})

// we add event listeners to our operator buttons......
operators.forEach(operator=>{
    operator.addEventListener("click", ()=>{
        calculator.handleOperation(operator.innerText);  //call the method on our calc object
        // console.log("previous Operand is " + calculator.previousOperand + " ..."); //this is to test out the value of the property on the calculator
    })
});


// add eventlistener to  the equality sign...

equalityButton.addEventListener("click", ()=>{
    calculator.compute(calculator.operation);  // calculator.operation is the value of the operator ie the innerTExt of the clicked operator
});

// add eventlister to squareroot buttons..
squareRootButton.addEventListener("click", ()=>{
    outputScreen.value = calculator.returnSquareRoot(outputScreen.value);
});

// add event listener to the previous answer button.....
previousAnswer.addEventListener("click", ()=>{
    calculator.fetchPreviousAnswer(lastAnswer);
});

// to enable reset button to work..............
resetButton.addEventListener("click", ()=>{
    calculator.reset();
});

// add eventListener to  delete button....
deleteButton.addEventListener("click", ()=>{
    calculator.del(outputScreen.value);
});
