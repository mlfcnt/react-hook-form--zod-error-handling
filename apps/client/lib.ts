export const handleFormValidationError = (
  error: any,
  setFormError: (fieldname: string, {}) => void
) => {
  if (isValidationError(error.message)) {
    const zodErrors = error.message.validationError.issues;
    for (const zodError of zodErrors) {
      setFormError(zodError.path[0], {
        type: "server",
        message: zodError.message,
      });
    }
  }
};

const isValidationError = (error: any) => !!error.validationError;
