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

//valid payment info is selected 
isValidPayment = ($paymentSelected) => {
    return $paymentSelected.val() !== "none";
};

isFormValid = () => {
    return $(".error").length === 0;
};

executeValidator = (validator, $input) => {
    validator($input) ? resetError($input) : registerError($input);
};

resetError = ($input) => {
    $input.removeClass("error");
};

registerError = ($input) => {
    $input.addClass("error");
};

//create event listener to be call validator dynamically
 createListener = (validator)  => {
    return event => {
        const $input = $(event.target);
        if ($input.val().trim() === "") resetError($input);
        else executeValidator(validator, $input);
    };
}