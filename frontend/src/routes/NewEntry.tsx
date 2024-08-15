import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", scheduled: new Date(), created_at: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-500 p-8 rounded-md">
      <input
        className="p-3 rounded-md dark:text-white dark:placeholder-white dark:bg-gray-400"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md dark:text-white dark:placeholder-white dark:bg-gray-400"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <div className="relative inline-block group">
        <input
          className="p-3 rounded-md dark:text-white dark:bg-gray-400 w-full"
          type="date"
          name="scheduled"
          value={new Date(newEntry.scheduled).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <p className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-full p-1 text-center text-sm text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Date Scheduled
        </p>
      </div>
      <div className="relative inline-block group">
        <input
          className="p-3 rounded-md dark:text-white dark:bg-gray-400 w-full"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <p className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-full p-1 text-center text-sm text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Date Created
        </p>
      </div>
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
