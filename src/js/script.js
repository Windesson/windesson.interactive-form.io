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
const $creditCardInformationDiv = $("div[id='credit-card']");
const $paymentMethodSelected = $("select[id=payment]");

function main() {
    ////Set focus on the first text field
    $("input[type=text]").first().focus();    

    //reset t-shirt color to default 'Please select a T-shirt theme'
    $tshirtCurrentColorOption.html($tshirtDefaultColorOption);

    //hide creditcard payment information
    $creditCardInformationDiv.hide();
}


//validate form on submition
$submitButton.on("click", (event) => {

    //valid individual fields
    executeValidator(isValidUsername, $userNameInput);
    executeValidator(isValidEmail, $userEmailInput);
    executeValidator(isValidActivities, $activitiesInput);
    executeValidator(isValidPayment, $paymentSelected);

    //If any invalid field found. set focus on first occurance.
    if (!isFormValid()) {
        event.preventDefault();
        $(window).scrollTop(0);
    }
});

//user name listener
$userNameInput.on("input blur", createListener(isValidUsername));

//email listner
$userEmailInput.on("input blur", createListener(isValidEmail));

//Job Role section - display optional field for 'other' job title
$jobTitleSelected.on("input", () => {
    $jobTitleSelected.val() === 'other' ? $otherTitle.show() : $otherTitle.hide();
});

//”T-Shirt Info” section - display mathing t-shirt color on design.
$tShirtUserDesign.on("input", () => {
    let designSelected = $tShirtUserDesign.children("option:selected").text().toLowerCase();
    designSelected = designSelected.replace(/Theme\s*-\s*(\w)/i, '$1');
    const $colors = $('<select></select>');

    //find colors matching selected t-shirt design
    $tshirtOriginalColorOption.each(function () {
        const currColor = $(this).text().toLowerCase();
        if (currColor.includes(designSelected)) $colors.append($(this));
    });

    //no color found display 'Please select a T-shirt theme'
    if ($colors.children().length === 0 )
        $tshirtCurrentColorOption.html($tshirtDefaultColorOption);
    //One or more color found display option colors
    else
        $tshirtCurrentColorOption.html($colors.children());

});

//call main once content is loaded.
document.addEventListener('DOMContentLoaded', () => { main(); });


//Register for ativities - resolve conflicts


//Payment Information - hide/display credit card field and validate
$paymentMethodSelected.on("input", () => {
    $paymentMethodSelected.val() === 'Credit Card' ? $creditCardInformationDiv.show() : $creditCardInformationDiv.hide();
});