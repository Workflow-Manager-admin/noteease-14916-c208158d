import { useState, useEffect, useMemo } from "react";
import type { MetaFunction } from "@remix-run/node";
import NoteCard from "~/components/NoteCard";
import NoteForm from "~/components/NoteForm";
import SearchBar from "~/components/SearchBar";
import { NotesStore } from "~/utils/notes.client";
import type { Note, NoteFormData } from "~/types/note";

export const meta: MetaFunction = () => {
  return [
    { title: "NoteEase - Your Personal Notes" },
    { name: "description", content: "A simple and intuitive notes application" },
  ];
};

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Memoize the store instance to prevent unnecessary re-renders
  const notesStore = useMemo(() => NotesStore.getInstance(), []);

  useEffect(() => {
    const fetchNotes = () => {
      const filteredNotes = searchQuery || selectedCategory
        ? notesStore.searchNotes(searchQuery, selectedCategory)
        : notesStore.getAllNotes();
      setNotes(filteredNotes);
      setCategories(notesStore.getCategories());
    };

    fetchNotes();
  }, [searchQuery, selectedCategory, notesStore]);

  const handleCreateNote = (noteData: NoteFormData) => {
    notesStore.createNote(noteData);
    setNotes(notesStore.getAllNotes());
    setCategories(notesStore.getCategories());
    setIsFormOpen(false);
  };

  const handleUpdateNote = (noteData: NoteFormData) => {
    if (editingNote) {
      notesStore.updateNote(editingNote.id, noteData);
      setNotes(notesStore.getAllNotes());
      setCategories(notesStore.getCategories());
      setEditingNote(null);
    }
  };

  const handleDeleteNote = (id: string) => {
    notesStore.deleteNote(id);
    setNotes(notesStore.getAllNotes());
    setCategories(notesStore.getCategories());
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Notes</h1>
          <SearchBar
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />
        </header>

        <main>
          {(isFormOpen || editingNote) && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <NoteForm
                initialData={editingNote || undefined}
                categories={categories}
                onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingNote(null);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={(id) => {
                  const noteToEdit = notes.find((n) => n.id === id);
                  if (noteToEdit) setEditingNote(noteToEdit);
                }}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>

          {!isFormOpen && !editingNote && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="fixed bottom-8 right-8 bg-primary-500 text-white rounded-full p-4 shadow-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-xl hover:scale-110"
              aria-label="Add new note"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
