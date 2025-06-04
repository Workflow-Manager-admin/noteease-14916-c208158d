import { Note, NoteFormData } from "~/types/note";

// Temporary in-memory storage
let notes: Note[] = [];

export function getAllNotes(): Note[] {
  return notes;
}

export function getNoteById(id: string): Note | undefined {
  return notes.find(note => note.id === id);
}

export function createNote(noteData: NoteFormData): Note {
  const newNote: Note = {
    id: Math.random().toString(36).substring(2, 9),
    ...noteData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  notes.push(newNote);
  return newNote;
}

export function updateNote(id: string, noteData: NoteFormData): Note | null {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex === -1) return null;

  const updatedNote: Note = {
    ...notes[noteIndex],
    ...noteData,
    updatedAt: new Date(),
  };
  notes[noteIndex] = updatedNote;
  return updatedNote;
}

export function deleteNote(id: string): boolean {
  const initialLength = notes.length;
  notes = notes.filter(note => note.id !== id);
  return notes.length < initialLength;
}

export function searchNotes(query: string, category?: string): Note[] {
  return notes.filter(note => {
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

export function getCategories(): string[] {
  const categories = new Set(notes.map(note => note.category).filter(Boolean));
  return Array.from(categories);
}
