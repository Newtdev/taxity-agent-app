export function getFormikFieldProps(formik, name) {
  const fieldProps = formik.getFieldProps(name);
  return {
    id: name,
    name,
    value: fieldProps?.value || '',
    onChangeText: formik.handleChange(`${name}`),
    onBlur: formik.handleBlur(`${name}`),
    error: !!formik.errors[name] && !!formik.touched[name],
    errorMessage: formik.errors[name],
  };
}
