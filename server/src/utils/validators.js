export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const re = /[^@\s]+@[^@\s]+\.[^@\s]+/;
  return re.test(email.trim());
}

export function isStrongPassword(password) {
  if (typeof password !== 'string') return false;
  // Min 8 chars, at least one letter and one number
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-={}\[\]|;:'",.<>/?`~]{8,}$/.test(password);
}


