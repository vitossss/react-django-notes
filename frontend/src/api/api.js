import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const NoteAPI = {
  async getNotes() {
    const response = await instance.get("/notes/");
    return response;
  },

  async getNote(id) {
    const response = await instance.get(`/notes/${id}`);
    return response;
  },

  async createNote(note, getAllNotes) {
    const response = await instance.post(`/notes/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: note.body,
    });
    if (response.status === 200) {
      await getAllNotes();
    }
  },

  async updateNote(id, note, getAllNotes) {
    const response = await instance.put(`/notes/${id}/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: note.body,
    });
    if (response.status === 200) {
      await getAllNotes();
    }
  },

  async deleteNote(id, getAllNotes) {
    const response = await instance.delete(`/notes/${id}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      await getAllNotes();
    }
  },
};
