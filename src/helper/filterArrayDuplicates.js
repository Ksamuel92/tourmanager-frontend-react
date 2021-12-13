export const filterArrayDuplicatesById = (array) => {
  return array.filter(
    (resource, index, self) =>
      self.findIndex((r) => r.id === resource.id) === index
  );
};
