class Validators {
    static validatePassword(password) {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passRegex.test(password);
    }
    static validateEmail(email){
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    }

    static validatePhoneNumber(phone){
        const phoneNumberRegex = /^01[0125][0-9]{8}$/;
        return phoneNumberRegex.test(phone);
    }
}

export default Validators;