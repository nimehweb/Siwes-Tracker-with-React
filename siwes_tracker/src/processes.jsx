export default function Process(){
const steps = processes.map(process => 
    <div
    key={process.id} 
    className="text-center my-10 p-10" >
        <span className=" rounded-full inline-flex items-center justify-center w-16 h-16  bg-blue-500  text-white text-2xl font-semibold ">
            {process.id}
        </span>
        <h3 className="font-bold text-3xl text-slate-900 m-4">{process.title}</h3>
        <p className="text-slate-700">{process.description}</p>
    </div>
)
    return(
        <>
        {steps}
        </>
    )
}

const processes = [{
    id:1,
    title: "Create Your Account",
    description: "Sign up with your student email and set up your profile in under 2 minutes. No complex forms or verification delays."
},{
    id:2,
    title: "Start Logging Daily",
    description: "Record your daily activities, tasks completed, and skills learned. Our smart templates make it quick and easy."
},{
    id:3,
    title: "Track Your Progress",
    description: "Watch your progress unfold with beautiful analytics and share your achievements with supervisors effortlessly."
}]