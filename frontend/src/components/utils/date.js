export const getDate = (note) => {
  return new Date(note.update).toLocaleDateString();
};
