import {create} from "zustand";
import {persist} from "zustand/middleware";

const useLogbookStore = create(
    persist(
    (set) => ({
    entries: [],
    
    addEntry: (entry) => set((state) => ({
        entries: [...state.entries, entry]
    })),

    editEntry: (index, updatedEntry) => set((state) =>{
        const updatedEntries = [...state.entries];
        updatedEntries[index] = updatedEntry;
        return { entries: updatedEntries };
    }),

    deleteEntry: (index) => set((state) => ({
        entries: state.entries.filter((_,i) => i !== index)
    }))
    }),
    {
    name: "logbook-storage", // name of the item in the storage (must be unique)
    }
))

export default useLogbookStore;