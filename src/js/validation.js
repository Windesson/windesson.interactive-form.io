// Name field can't be blank
isValidUsername = ($userName) => {
    return $userName.val().trim().length > 0;
};

//valid formatted e-mail address
isValidEmail = ($email) => {
    return /^\w+@\w+\.\w+/.test($email.val());
};

//At least one checkbox checked
isValidActivities = ($activitiesInputList) => {
    return $activitiesInputList.is(":checked");
};

isFormValid = () => {
    return $(".error").length === 0;
};

isValidCreditCardnumber = ($input) => {
    return /^\d{13,16}$/.test($input.val());
};

isValidZipCode = ($input) => {
    return /^\d{5}$/.test($input.val());
};

isValidCVV = ($input) => {
    return /^\d{3}$/.test($input.val());
};

inputExecuteValidator = (validator, $input) => {
    const show = !validator($input);
    showOrHideTip(show, $input);
};

checkBoxExecuteValidator = (validator, $activities) => {

    const $options = $($activities[0].querySelectorAll('input'));
    const show = !validator($options);
    const $legend = $($activities[0].querySelector('legend'));
    showOrHideTip(show, $legend);
};


//soure https://teamtreehouse.com/library/validating-a-username
showOrHideTip = (show, $element) => {
    // show element when show is true, hide when false
    const $tip = $element.next(".js-tip");
    const isTypeInput = $element.is('INPUT');
    if (show) {
        isTypeInput ? $element.addClass("error") : $element.css('color', 'red');
        if ($tip) $tip.show();
    } else {
        isTypeInput ? $element.removeClass("error") : $element.css('color', 'black');
        if ($tip) $tip.hide();
    }
};

//create event listener to be call validator dynamically
inputCreateListener = (validator) => {
    return event => {
        const $input = $(event.target);

        if ($input.val() === "") { showOrHideTip(false, $input); return; }
        inputExecuteValidator(validator, $input);
    };
};
