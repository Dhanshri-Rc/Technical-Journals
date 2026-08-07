export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isRequired = (v) => v !== undefined && v !== null && String(v).trim().length > 0;
export const minLength = (v, n) => String(v || "").trim().length >= n;

export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, checks]) => {
    for (const check of checks) {
      const result = check.test(values[field], values);
      if (!result) {
        errors[field] = check.message;
        break;
      }
    }
  });
  return errors;
}

export const rules = {
  required: (message = "This field is required.") => ({
    test: (v) => isRequired(v),
    message,
  }),
  email: (message = "Enter a valid email address.") => ({
    test: (v) => !v || isEmail(v),
    message,
  }),
  min: (n, message = `Must be at least ${n} characters.`) => ({
    test: (v) => !v || minLength(v, n),
    message,
  }),
  matches: (field, message = "Fields do not match.") => ({
    test: (v, all) => v === all[field],
    message,
  }),
};
