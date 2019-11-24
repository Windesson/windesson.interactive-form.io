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
const $paypalInformation = $("div[id=paypal]");
const $bitcoinInformation = $("div[id=bitcoin]"); 
const $creditCardNumber = $('input[id="cc-num"]');
const $creditCardZip = $('input[id="zip"]');
const $creditCardCVV = $('input[id="cvv"]');

function main() {
    //Set focus on the first text field
    $("input[type=text]").first().focus();    

    //reset t-shirt color to default 'Please select a T-shirt theme'
    $tshirtCurrentColorOption.html($tshirtDefaultColorOption);

    //hide 'select payment' payment option.
    $("select option[value='none']").hide();

    //Select credit credit card as default payment option
    $paymentMethodSelected.val("Credit Card").change();

    //hide paypal/bitcoin information
    $paypalInformation.hide();
    $bitcoinInformation.hide();

    //Add total cost field
    $(".activities").append(`<label>Total Cost: <span id="js-data-total-cost">0<span><label>`);

}

//validate form on submition
$submitButton.on("click", (event) => {

    //valid individual fields
    inputExecuteValidator(isValidUsername, $userNameInput);
    inputExecuteValidator(isValidEmail, $userEmailInput);
    checkBoxExecuteValidator(isValidActivities, $(".activities"));

    //if payment is 'Credit Card'
    //must supplied a valid Credit Card number, a Zip Code, and a 3 number CVV value
    if ($paymentSelected.val().toLowerCase() === "credit card") {
        inputExecuteValidator(isValidCreditCardnumber, $creditCardNumber);
        inputExecuteValidator(isValidZipCode, $creditCardZip);
        inputExecuteValidator(isValidCVV, $creditCardCVV);
    }

    //If any invalid field found. set focus on first occurance.
    if (!isFormValid()) {
        event.preventDefault();
        $(window).scrollTop(0);
    }
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

//Register for Activities validation section
$activitiesInput.on("input", (event) => {
    const $selectedActivity = $(event.target);
    const isTargetActivityChecked = $selectedActivity.is(":Checked");

    //update total data cost
    let totalCost = 0;

    $activitiesInput.each(function () {

        let currentCost = parseInt($(this).attr("data-cost").replace(/\D*/g,""), 10);
        //do not validate check box already checked
        if ($(this).is(":Checked")) {
            totalCost += currentCost;
            return;
        } 

        //do not compare to itself
        if ($(this).attr("name") === $selectedActivity.attr("name")) return;

        let currentDate = $(this).attr("data-day-and-time");
        let selectedDate = $selectedActivity.attr("data-day-and-time");

        //not the same day
        if (currentDate !== selectedDate) return;

        // resolve conflicting activities
        $(this).prop("disabled", isTargetActivityChecked); 

    });

    //update total
    $("#js-data-total-cost").html(totalCost);
});

//Payment Information - hide/display credit card field and validate
$paymentMethodSelected.on("input", () => {
    const payment = $paymentMethodSelected.val();

    switch (payment) {
        case 'Credit Card':
            $creditCardInformationDiv.show();
            $paypalInformation.hide();
            $bitcoinInformation.hide();
            break;
        case 'PayPal':
            $paypalInformation.show();
            $bitcoinInformation.hide();
            $creditCardInformationDiv.hide();
            break;
        case 'Bitcoin':
            $bitcoinInformation.show();
            $paypalInformation.hide();
            $creditCardInformationDiv.hide();
            break;
        default:
            $bitcoinInformation.hide();
            $paypalInformation.hide();
            $creditCardInformationDiv.hide();
    }
});

//user name listener
$userNameInput.on("input blur", inputCreateListener(isValidUsername));

//email listener
$userEmailInput.on("input blur", inputCreateListener(isValidEmail));

//Job Role section - display optional field for 'other' job title
$jobTitleSelected.on("input", () => {
    $jobTitleSelected.val() === 'other' ? $otherTitle.show() : $otherTitle.hide();
});

//Reset credit card payment information 
$paymentMethodSelected.on("change", () => {
    if ($paymentSelected.val().toLowerCase() === "credit card") return;
   
    $creditCardNumber.val("");
    $creditCardZip.val("");
    $creditCardCVV.val("");

    for (let $input of [$creditCardNumber, $creditCardZip, $creditCardCVV]) {
        showOrHideTip(false,$input);
    }
   
});

//Credit card payment fields
$creditCardNumber.on("input blur", inputCreateListener(isValidCreditCardnumber));
$creditCardZip.on("input blur", inputCreateListener(isValidZipCode));
$creditCardCVV.on("input blur", inputCreateListener(isValidCVV));

//call main once content is loaded.
document.addEventListener('DOMContentLoaded', () => { main(); });