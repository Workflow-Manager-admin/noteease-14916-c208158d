import type { Note } from "~/types/note";

interface NoteCardProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      {note.category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
          {note.category}
        </span>
      )}
      <p className="text-gray-600 line-clamp-3">{note.content}</p>
      <div className="text-xs text-gray-400 mt-2">
        Updated: {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
