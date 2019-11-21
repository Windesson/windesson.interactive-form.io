const $userNameInput = $("input[id=name]");
const $userEmailInput = $("input[id=email]");
const $activitiesInput = $(".activities input");
const $paymentSelected = $("select[id=payment]");
const $submitButton = $("button[type=submit]");
const $jobTitleSelected = $("select[id=title]");
const $otherTitle = $("input[id='other-title']");
const $tShirtUserDesign = $("select[id=design]");
const $tshirtCurrentColorOption = $("select[id=color]");
const $tshirtOriginalColorOption = $tshirtCurrentColorOption.children();
const $tshirtDefaultColorOption = $('<option>Please select a T-shirt theme</option>');


function main() {
    ////Set focus on the first text field
    $("input[type=text]").first().focus();    

    //
    $tshirtCurrentColorOption.html($tshirtDefaultColorOption);
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

    //valid each field
    executeValidator(isValidUsername, $userNameInput);
    executeValidator(isValidEmail, $userEmailInput);
    executeValidator(isValidActivities, $activitiesInput);
    executeValidator(isValidPayment, $paymentSelected);

    //If any invalid field. do not submit.
    if (!isFormValid()) {
        event.preventDefault();
        $(window).scrollTop(0);
    }
});

$userNameInput.on("input blur", createListener(isValidUsername));
$userEmailInput.on("input blur", createListener(isValidEmail));

$jobTitleSelected.on("input", () => {
    $jobTitleSelected.val() === 'other' ? $otherTitle.show() : $otherTitle.hide();
});

//”T-Shirt Info” section
$tShirtUserDesign.on("input", () => {
    let designSelected = $tShirtUserDesign.children("option:selected").text().toLowerCase();
    designSelected = designSelected.replace(/Theme\s*-\s*(\w)/i, '$1');
    const $colors = $('<select></select>');
    //find matching
    $tshirtOriginalColorOption.each(function () {
        const currColor = $(this).text().toLowerCase();
        if (currColor.includes(designSelected)) $colors.append($(this));
    });

    if ($colors.children().length === 0 )
        $tshirtCurrentColorOption.html($tshirtDefaultColorOption);
    else
        $tshirtCurrentColorOption.html($colors.children());

});

document.addEventListener('DOMContentLoaded', () => { main(); });