import type { Note, NoteFormData } from "~/types/note";

export class NotesStore {
  private static instance: NotesStore;
  private notes: Note[] = [];

  private constructor() {}

  static getInstance(): NotesStore {
    if (!NotesStore.instance) {
      NotesStore.instance = new NotesStore();
    }
    return NotesStore.instance;
  }

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: string): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  createNote(noteData: NoteFormData): Note {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  updateNote(id: string, noteData: NoteFormData): Note | null {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return null;

    const updatedNote: Note = {
      ...this.notes[noteIndex],
      ...noteData,
      updatedAt: new Date(),
    };
    this.notes[noteIndex] = updatedNote;
    return updatedNote;
  }

  deleteNote(id: string): boolean {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter(note => note.id !== id);
    return this.notes.length < initialLength;
  }

  searchNotes(query: string, category?: string): Note[] {
    return this.notes.filter(note => {
      const matchesQuery = query
        ? note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.content.toLowerCase().includes(query.toLowerCase())
        : true;
      
      const matchesCategory = category
        ? note.category === category
        : true;

      return matchesQuery && matchesCategory;
    });
  }

  getCategories(): string[] {
    const categories = new Set(this.notes.map(note => note.category).filter(Boolean));
    return Array.from(categories);
  }
}
