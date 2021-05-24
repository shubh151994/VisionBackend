export function phoneNumberValidator(phone_number) {
    if (!phone_number) return "Phone number can't be empty."
    if (phone_number.length < 10) return 'Phone number must be at least 10 characters long.'
    return ''
  }