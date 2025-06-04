import { useState } from "react";
import { Combobox } from "@headlessui/react";
import type { Note, NoteFormData } from "~/types/note";

interface NoteFormProps {
  initialData?: Note;
  categories: string[];
  onSubmit: (data: NoteFormData) => void;
  onCancel: () => void;
}

export default function NoteForm({ initialData, categories, onSubmit, onCancel }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          required
        />
      </div>

      <div className="relative">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Combobox
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
        >
          <div className="relative mt-1">
            <Combobox.Input
              className="form-input w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              onChange={(event) => setFormData({ ...formData, category: event.target.value })}
              displayValue={(category: string) => category}
              placeholder="Select or type a category"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Combobox.Button>
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((category) => (
                <Combobox.Option
                  key={category}
                  value={category}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? 'bg-primary-500 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {category}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 resize-none"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors duration-200"
        >
          {initialData ? "Update" : "Create"} Note
        </button>
      </div>
    </form>
  );
}
