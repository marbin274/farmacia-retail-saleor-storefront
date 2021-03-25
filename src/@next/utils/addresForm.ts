
export const getName = (firstName: string, lastName: string) => {
    return firstName.replace(/^\w/, (c: any) => c.toUpperCase()) +
        " " +
        lastName.replace(/^\w/, (c: any) => c.toUpperCase());
}

export const removeCountryCodeInPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.substring(phoneNumber.length - 9);
}
