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

export const InvalidateTag = (id, typeTag) => {
  return [{type: typeTag, id}];
};

export function providesTagList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        {type: tagType, id: 'LIST'},
        ...resultsWithIds?.map(({id}) => ({type: tagType, id})),
      ]
    : [{type: tagType, id: 'LIST'}];
}
