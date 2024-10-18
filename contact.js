document.addEventListener("DOMContentLoaded", function() {
    const ResponseInput = document.getElementById("response");
    const nameInput = document.getElementById("name");
    const DisplayResult = document.getElementById("resultPlaceholder");

    /*
    Here I am taking the response inputs and incrementing them by 5 based on the order
    they appear. If the name starts with a b however it multiplies the total by 5.
    */
    function calculateResult() {
        const ResponseInput_Value = ResponseInput.value;
        
        const nameValue = nameInput.value;
        const check_for_b = nameValue.toLowerCase().startsWith("b");

        let result = 0;
        if (ResponseInput_Value === "Issue with store?") {
            result += 5;
        } else if (ResponseInput_Value === "Recieved wrong candy from delivery?") {
            result += 10;
        } else if (ResponseInput_Value === "Candy quality was not to the standard promised?") {
            result += 15;
        }

        if (check_for_b) {
            result = result * 5;
        }

        DisplayResult.innerText = `Price Total: $${result}`;
    }

    ResponseInput.addEventListener("change", calculateResult);
    nameInput.addEventListener("change", calculateResult);

});