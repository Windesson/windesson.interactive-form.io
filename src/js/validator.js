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