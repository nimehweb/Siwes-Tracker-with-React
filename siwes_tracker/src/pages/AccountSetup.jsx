import {useState} from 'react';
import { useLocation } from 'react-router-dom';
function Setup(){
    const [step, setStep] = useState(1);

    const handleNext = (e) =>{
        e.preventDefault();
        setStep(step + 1);
    }

    const handlePrev = (e) =>{
        e.preventDefault();
        setStep(step - 1);
    }

    const location = useLocation();
    const { fullName: initialFullName } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: initialFullName || "",
        studentID: "",
        department: "",
        institution: "",
        level: "",
        company: "",
        companyAddress: "",
        supervisorName: "",
        supervisorContact: "",
        startDate: "",
        term: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    return(
        <>
        <div className='flex items-center justify-center h-screen bg-gray-100 '>
            <div className='bg-blue-100 p-10 rounded-lg shadow-xl w-120'>
                <h1 className='text-2xl font-bold mb-4'>Account Setup</h1>
                <p className='text-gray-600'>Complete your account setup to get started</p>

            {step === 1 &&(
            <form className='flex flex-col mt-4 gap-2 text-slate-600'>
                <label htmlFor="fullName" className='flex flex-col'> <b> Full Name :</b>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className='border p-2 rounded-xl my-1 bg-white' />
                </label>
                <label htmlFor="StudentID" className='flex flex-col'> <b> Matric Number/ Student ID :</b>
                <input type="text" name="studentID" value={formData.studentID} onChange={handleChange} className='border p-2 rounded-xl my-1 bg-white' />
                </label>
                <label htmlFor="Department" className='flex flex-col'> <b> Department :</b>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className='border p-2 rounded-xl my-1 bg-white' />
                </label>
                <label htmlFor="Institution" className='flex flex-col'> <b> Institution :</b>
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} className='border p-2 rounded-xl my-1 bg-white' />
                </label>
                <label htmlFor="Level" className='flex flex-col'> <b> Level :</b>
                <input type="text" name="level" value={formData.level} onChange={handleChange} className='border p-2 rounded-xl my-1 bg-white' />
                </label>
                <button type="submit"  onClick={handleNext} className='bg-violet-800 text-white p-2 rounded hover:bg-violet-600 cursor-pointer my-4 align-self-end'>Next</button>
            </form>
            )}
            {step === 2 &&(
               <form className='flex flex-col mt-4 gap-2 text-slate-600'>
                <label htmlFor="Company" className='flex flex-col'> <b> Company :</b>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className='border p-2 rounded-xl mb-1 bg-white' />
                </label>
                <label htmlFor="CompanyAddress" className='flex flex-col'> <b> Company Address :</b>
                <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} className='border p-2 rounded-xl mb-1 bg-white' />
                </label>
                <label htmlFor="SupervisorName" className='flex flex-col'> <b> Supervisor Name (at company):</b>
                <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleChange} className='border p-2 rounded-xl mb-1 bg-white' />
                </label>
                <label htmlFor="SupervisorContact" className='flex flex-col'> <b> Supervisor Email/ Phone:</b>
                <input type="text" name="supervisorContact" value={formData.supervisorContact} onChange={handleChange} className='border p-2 rounded-xl mb-1 bg-white' />
                </label>
                <label htmlFor="StartDate" className='flex flex-col'> <b> Start Date :</b>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className='border p-2 rounded-xl mb-1 bg-white' />
                </label>
                <div className='flex gap-2 justify-between mt-3'>
                    
                    <label htmlFor="3months" className='flex flex-col p-2 border rounded-lg bg-white hover:bg-gray-200'>
                    <input type="radio" name="term" id="3months" />    
                    3 Months</label>
                    <label htmlFor="4months" className='flex flex-col p-2 border rounded-lg bg-white hover:bg-gray-200'>
                    <input type="radio" name="term" id="4months" />
                    4 Months</label>
                    <label htmlFor="6months" className='flex flex-col p-2 border rounded-lg bg-white hover:bg-gray-200'>
                    <input type="radio" name="term" id="6months" />
                    6 Months</label>
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={handlePrev} className='bg-gray-400 text-white p-2 rounded hover:bg-gray-300 cursor-pointer my-4'>Prev</button>
                    <button type="submit" className='bg-violet-800 text-white p-2 rounded hover:bg-violet-600 cursor-pointer my-4'>Save</button>
                </div>
            </form>
            )}
            </div>
           
        </div>
        </>
    )
}

export default Setup;