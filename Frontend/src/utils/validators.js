// Name: only letters & spaces, min 3 chars
export const isValidName = (name) =>
  /^[A-Za-z ]{3,}$/.test(name);

// Email: standard email format
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Password:
// min 8 chars, 1 uppercase, 1 number, 1 special char
export const isValidPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
