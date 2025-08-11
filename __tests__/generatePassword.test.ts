import generatePassword from '@/utils/generatePassword'

describe('generatePassword', () => {
  const symbolClass = /[!@#$%^&*()_+\[\]{}|;:,.<>?]/

  describe('basic behavior', () => {
    it('returns a string with the requested length', () => {
      expect(generatePassword(5)).toHaveLength(5)
      expect(generatePassword(8)).toHaveLength(8)
      expect(generatePassword(10)).toHaveLength(10)
    })

    it('is lowercase-only by default', () => {
      const p = generatePassword(12)
      expect(p).toMatch(/^[a-z]+$/)
    })

    it('is lowercase-only when options is an empty object', () => {
      const p = generatePassword(12, {})
      expect(p).toHaveLength(12)
      expect(p).toMatch(/^[a-z]+$/)
    })

    it('returns different passwords for multiple calls (same length)', () => {
      const a = generatePassword(12)
      const b = generatePassword(12)
      expect(a).not.toEqual(b)
    })
  })

  describe('single-option behavior', () => {
    it('includes at least one uppercase when { uppercase: true } and uses only letters', () => {
      const p = generatePassword(10, { uppercase: true })
      expect(p).toHaveLength(10)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(/^[a-zA-Z]+$/)
    })

    it('includes at least one number when { numbers: true } and contains only lowercase+digits', () => {
      const p = generatePassword(10, { numbers: true })
      expect(p).toHaveLength(10)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(/^[a-z0-9]+$/)
    })

    it('includes at least one symbol when { symbols: true } and contains only lowercase+symbols', () => {
      const p = generatePassword(10, { symbols: true })
      expect(p).toHaveLength(10)
      expect(p).toMatch(symbolClass)
      expect(p).toMatch(/^[a-z!@#$%^&*()_+\[\]{}|;:,.<>?]+$/)
    })
  })

  describe('combined-options behavior', () => {
    it('includes uppercase and numbers when { uppercase: true, numbers: true }', () => {
      const p = generatePassword(12, { uppercase: true, numbers: true })
      expect(p).toHaveLength(12)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(/^[a-zA-Z0-9]+$/)
    })

    it('includes uppercase and symbols when { uppercase: true, symbols: true }', () => {
      const p = generatePassword(12, { uppercase: true, symbols: true })
      expect(p).toHaveLength(12)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(symbolClass)
      expect(p).toMatch(/^[a-zA-Z!@#$%^&*()_+\[\]{}|;:,.<>?]+$/)
    })

    it('includes numbers and symbols when { numbers: true, symbols: true }', () => {
      const p = generatePassword(12, { numbers: true, symbols: true })
      expect(p).toHaveLength(12)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(symbolClass)
      expect(p).toMatch(/^[a-z0-9!@#$%^&*()_+\[\]{}|;:,.<>?]+$/)
    })

    it('includes lowercase, uppercase, numbers and symbols when all options are true', () => {
      const p = generatePassword(20, {
        uppercase: true,
        numbers: true,
        symbols: true,
      })
      expect(p).toHaveLength(20)
      expect(p).toMatch(/[a-z]/)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(symbolClass)
      expect(p).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+\[\]{}|;:,.<>?]+$/)
    })
  })

  describe('edge / invalid inputs (TDD: write failing tests to drive implementation)', () => {
    it('returns empty string for length 0 with no options', () => {
      expect(generatePassword(0)).toBe('')
    })

    it('allows length === number of required categories and still includes each required char', () => {
      const p = generatePassword(3, {
        uppercase: true,
        numbers: true,
        symbols: true,
      })
      expect(p).toHaveLength(3)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(symbolClass)
    })

    it('throws when length < number of requested categories', () => {
      expect(() =>
        generatePassword(1, { uppercase: true, numbers: true })
      ).toThrow()
      expect(() => generatePassword(0, { symbols: true })).toThrow()
    })

    it('throws for negative lengths', () => {
      expect(() => generatePassword(-1)).toThrow()
    })

    it('handles very large length efficiently', () => {
      const p = generatePassword(1000, {
        uppercase: true,
        numbers: true,
        symbols: true,
      })
      expect(p).toHaveLength(1000)
      expect(p).toMatch(/[A-Z]/)
      expect(p).toMatch(/\d/)
      expect(p).toMatch(symbolClass)
    })
  })
})
