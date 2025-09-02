import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function TodoList(){
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        if (task) {
            setTasks([...tasks,{ text: task, completed: false }]);
            setTask("");
        }
    };
    const handleCompleted = (index) =>{
        const newTasks = tasks.map((task,i) => {
            if (i === index) {
                return { ...task, completed : !task.completed}
            }
            else{
                return {...task, completed : false}
            }
        })
        setTasks(newTasks);
    }
    const handleDeleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };
    return  (
        <>
        {
            tasks.length === 0 ? (
                <div className="text-gray-500 text-center h-80 p-4"><p>No tasks available</p></div>
            ):(
                <div className="overflow-y-auto h-80 mt-2 flex flex-col gap-2">
                {tasks.map((task, index) => {
                    return (
                        <div key = {index} className="flex items-baseline gap-4 ">
                            <input type="checkbox" onChange={()=> handleCompleted(index)} />
                    <span className={`w-2xl ${task.completed ? "line-through": ""} `}>{task.text}</span>
                    <button onClick={()=> handleDeleteTask(index)} className="text-red-500 ml-2">
                        <Trash2/>
                    </button>
                </div>
            )
        })}
        </div>)
        }
        
        <div className="flex gap-2 ">
        <input type="text" className="border border-gray-300 rounded-lg px-2 py-1 w-2xl" name="task" placeholder="Add a new task" value={task} onChange={(e) => setTask(e.target.value)} />
        <button className="bg-blue-500 text-white text-2xl rounded-lg  px-2 " onClick={handleAddTask}>+</button>
        </div>
        </>
    )
}