const generatePassword = (
  length: number,
  options?: { uppercase?: boolean; numbers?: boolean; symbols?: boolean }
) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

  if (length < 0) {
    throw new Error('Password length cannot be negative')
  }

  const requiredCategories = [
    options?.uppercase,
    options?.numbers,
    options?.symbols,
  ].filter(Boolean).length

  if (length < requiredCategories) {
    throw new Error(
      'Password length is too short for the number of required character categories'
    )
  }

  let chars = lowercase
  const requiredChars: string[] = []

  // Add at least one uppercase if specified
  if (options?.uppercase) {
    chars += uppercase
    requiredChars.push(uppercase[Math.floor(Math.random() * uppercase.length)])
  }

  // Add at least one number if specified
  if (options?.numbers) {
    chars += numbers
    requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)])
  }

  // Add at least one symbol if specified
  if (options?.symbols) {
    chars += symbols
    requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)])
  }

  // Fill the rest of the password
  while (requiredChars.length < length) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    requiredChars.push(chars[randomIndex])
  }

  // Shuffle the password so required chars aren’t always at the start
  for (let i = requiredChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]]
  }

  return requiredChars.join('')
}

export default generatePassword
