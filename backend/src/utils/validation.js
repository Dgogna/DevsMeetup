
const validator = require("validator");

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;


    if (firstName.length < 4 || firstName.length > 50 || lastName.length < 4 || lastName.length > 50) {
        throw new Error("Names length should be between 4 and 50");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Email id should be valid format");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password should be strong");
    }


}

const validateProfileEditRequest = (req) => {
    const editableProfileFields = ["firstName", "lastName", "emailId", "gender", "age", "photoUrl", "about", "skills"];

    const isProfileEditable = Object.keys(req.body).every((field) => {
        return editableProfileFields.includes(field);
    });
    if (!isProfileEditable) {
        throw new Error("Please check the fields you want to edit");
    }
    return true;

}

module.exports = { validateSignUpData, validateProfileEditRequest };
