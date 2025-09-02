import { useState, useRef, useEffect } from "react";
import { Calendar, Edit, Trash2 } from "lucide-react";
import useLogbookStore from "../../stores/logbookStore";

export default function Logbook() {
   const [displayModal, setdisplayModal ] = useState(false);
   const [editModal, setEditModal] = useState(false);
   
   const { entries, addEntry, editEntry, deleteEntry} = useLogbookStore();
   // Form State
   const [formData, setFormData] = useState({
      date: "",
      title: "",
      description : "",
    });
  
  // Logic to handle editing 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    title: "",
    description: "",
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(entries[index]);
    setEditModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    editEntry(editingIndex, editData);
    setEditingIndex(null);
    setEditData({
      date: "",
      title: "",
      description: "",
    });
    setEditModal(false);
  };
// logic to handle adding entries
    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormData({
        ...formData,
        [name] : value,
      })
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      addEntry(formData)
      setFormData({
        date: "",
        title: "",
        description : "",
      });
      setdisplayModal(false);

    }

    const handleDelete = (index) => {
      deleteEntry(index);
    }

  return (
    <>
      <div className=" p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold my-2">Logbook</h1>
            <p className="text-gray-600">
              Track your daily training activities and progress
            </p>
          </div>
          <button className="text-white text-semi-bold cursor-pointer p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800  transition duration-300 ease-in-out"
          onClick={() => setdisplayModal(true)}
          >
            + Add Entry
          </button>
        </div>
         {/* Entries section */}
         {displayModal && <EntriesForm
         onSubmit ={handleSubmit}
         onChange = {handleChange}
         displayModal={displayModal}
         formData={formData}
         closeModal={() => setdisplayModal(false)}
         />}
         {
          editModal && <EditEntryForm
          onEditSubmit={handleSave}
          editData={editData}
          editModal={editModal}
          onClose={() => setEditModal(false)}
          onEditChange={(e) => setEditData({...editData,[e.target.name]: e.target.value})}
          />
         }
        <div className="bg-white p-4 rounded-lg shadow-md mt-10">
         <h1 className="text-xl font-semibold mb-4">Logbook Entries</h1>
        { (entries.length === 0) ? (
          <p className="text-center text-slate-400">No entries yet. Add your first entry!</p>)
        :(
          <ul>
            {entries.map((entry, index) => (
              <li key={index} className=" py-2">
                <div className=" rounded-lg p-6 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors duration-300 flex flex-start">
                <div className="flex-1 flex flex-col gap-2 ">
                  <h2 className="text-lg font-semibold">{entry.title}</h2>
                  <p className="text-sm text-gray-800 ">{entry.description}</p>
                 <div className="text-gray-500 flex items-center">
                  <Calendar className = "inline cursor-pointer w-5 mr-2 "/>
                  <span>{entry.date}</span>
                 </div>
                </div>
                 <div className=" flex items-start gap-2">
                  <button className="px-2 rounded-lg bg-white hover:bg-blue-50 border border-blue-200 "
                  onClick={()=> handleEdit(index)}
                  >
                    <Edit className="inline cursor-pointer w-4 text-blue-500" />
                  </button>
                  <button className="px-2 rounded-lg bg-white hover:bg-red-50 border border-red-200 "
                  onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="inline cursor-pointer w-4 text-red-500" />
                  </button>
                                        
                  </div>
                </div>
            </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </>
  );
}

 function EntriesForm({onSubmit, onChange, formData, closeModal,displayModal}) {
      const modalRef = useRef(null);

      useEffect(()=>{
        function handleClickOutside(event){
          if(modalRef.current && !modalRef.current.contains(event.target)){
            closeModal();
          }
        
        }
        if(displayModal){
          document.addEventListener("mousedown", handleClickOutside);
        }
        else{
          document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [displayModal, closeModal]);
      return(
         <div className="absolute z-10 inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-75">
            <div ref={modalRef} className="bg-white rounded-2xl p-4 shadow-lg w-128 ">
            <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold ">Add New Logbook Entry</h1>
            <span className=" font-bold cursor-pointer hover:scale-120 transition-transform"
            onClick={closeModal}>X</span>
            </div>
            <form onSubmit={onSubmit}>
              <div>
               <span>Date</span>
               <input value={formData.date} onChange={onChange} name="date" type="date" className="border border-blue-300 p-2 rounded-lg w-full mt-2" />
              </div>
              <div>
               <span>Title</span>
               <input value={formData.title} onChange={onChange} name="title" type="text" className="border border-blue-300 p-2 rounded-lg w-full mt-2"
               placeholder="Brief title of task performed" />
              </div>
               <div>
               <span>Description</span>
               <textarea value={formData.description} onChange={onChange} name="description" id="entry-description" rows="5" className="border border-blue-300 p-2 rounded-lg w-full mt-2"
               placeholder="Detailed description of activities perfomed"></textarea>
              </div>
               <button type= "submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out"
               disabled={!formData.date || !formData.title || !formData.description}
               >Save Entry</button>
            </form>
            <div>
              
            </div>
         </div>
         </div>
         
      )
   }

  function EditEntryForm({ onEditSubmit, onEditChange, editData, editModal,onClose }) {
    const modalRef = useRef(null);

      useEffect(()=>{
        function handleClickOutside(event){
          if(modalRef.current && !modalRef.current.contains(event.target)){
            onClose();
          }
        
        }
        if(editModal){
          document.addEventListener("mousedown", handleClickOutside);
        }
        else{
          document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [editModal, onClose]);
    return (
      <div className="absolute z-10 inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-75 ">
        <div ref={modalRef} className="bg-white rounded-2xl p-4 shadow-lg w-128">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Edit Logbook Entry</h1>
            <span
              className="font-bold cursor-pointer hover:scale-120 transition-transform"
              onClick={onClose}
            >
              X
            </span>
          </div>
          <form onSubmit={onEditSubmit}>
            <div>
              <span>Date</span>
              <input
                value={editData.date}
                onChange={onEditChange}
                name="date"
                type="date"
                className="border border-blue-300 p-2 rounded-lg w-full mt-2"
              />
            </div>
            <div>
              <span>Title</span>
              <input
                value={editData.title}
                onChange={onEditChange}
                name="title"
                type="text"
                className="border border-blue-300 p-2 rounded-lg w-full mt-2"
                placeholder="Brief title of task performed"
              />
            </div>
            <div>
              <span>Description</span>
              <textarea
                value={editData.description}
                onChange={onEditChange}
                name="description"
                id="entry-description"
                rows="5"
                className="border border-blue-300 p-2 rounded-lg w-full mt-2"
                placeholder="Detailed description of activities performed"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out"
              disabled={!editData.date || !editData.title || !editData.description}
            >
              Save Entry
            </button>
          </form>
          <div></div>
        </div>
      </div>
    );
  }
