function isValidEmail(email: string): boolean{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPassword(password: string): boolean{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function isValidUsername(username: string): boolean{
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
}

export { isValidEmail, isValidPassword, isValidUsername };