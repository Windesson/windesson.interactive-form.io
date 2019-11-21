const $userNameInput = $("input[id=name]");
const $userEmailInput = $("input[id=email]");
const $activitiesInput = $(".activities input");
const $paymentInformation = $("select[id=payment]");
const $submitButton = $("button[type=submit]");

function main() {
    //Set focus on the first text field
    $("input[type=text]").first().focus();
    
}

function executeValidator(validator,$input) {
    validator($input) ? resetError($input) : registerError($input); 
}

function resetError($input) {
    $input.removeClass("error");
}

function registerError($input) {
    $input.addClass("error");
}

function createListener(validator) {
    return event => {
        const $input = $(event.target);
        if ($input.val().trim() === "") resetError($input);
        else executeValidator(validator, $input);
    };
}

//Form validation
$submitButton.on("click", (event) => {

    executeValidator(isValidUsername, $userNameInput);
    executeValidator(isValidEmail, $userEmailInput);
    executeValidator(isValidActivities, $activitiesInput);
    executeValidator(isValidPayment, $paymentInformation);

    if (!isFormValid()) {
        event.preventDefault();
        $(window).scrollTop(0);
    }
});

$userNameInput.on("input blur", createListener(isValidUsername));
$userEmailInput.on("input blur", createListener(isValidEmail));

document.addEventListener('DOMContentLoaded', () => { main(); });

