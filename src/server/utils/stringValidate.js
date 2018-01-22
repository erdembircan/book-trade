const validateStrings = (config) => {
  const errors = {};
  config.forEach((entry) => {
    const error = [];
    entry.rules.forEach((rule) => {
      if (!rule.checker(entry.value)) {
        error.push(rule.errorMessage);
      }
    });
    errors[entry.name] = error.join(', ');
  });


  return errors;
};

// [{name: 'name',value: '5967jkh' ,rules: [{checker: validator.isAlphanumeric, errorMessage: 'only alphanumeric chars are allowed'}]}]

export default validateStrings;
