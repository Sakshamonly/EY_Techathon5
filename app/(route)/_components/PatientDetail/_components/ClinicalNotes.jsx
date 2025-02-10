import React, { useState } from 'react';
import { Search, Plus, Tag } from 'lucide-react';

function ClinicalNotes({ notes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Clinical Notes</h2>
        <div className="flex space-x-2">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg p-2"
          />
          <Plus className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{note.date}</span>
              <span className="text-sm text-gray-600">{note.provider}</span>
            </div>
            <div className="mt-2">
              <Tag className="w-4 h-4 text-gray-500 inline-block" />
              <span className="ml-2 text-sm text-gray-600">{note.category}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {note.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClinicalNotes;
