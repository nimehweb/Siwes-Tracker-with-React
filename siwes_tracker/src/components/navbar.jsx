import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"

export default function Navbar(){
    return(
        <nav className='flex justify-between items-center px-10 py-6 sticky top-0 z-50 w-full  bg-white/ 
        0 backdrop-blur-md'>
            <div className='flex items-center gap-4'>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
              <span className="text-2xl font-bold text-slate-900">SIWES Tracker</span>              
            </div>
            <div>
                <ul className='list-none flex space-x-4'>
                   <li>Features</li>
                   <li>How it works</li>
                   <li>Pricing</li>
                   <li>
                       <Link to='/login'>
                           <button
                               className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-sm  p-2 rounded-2xl text-white font-semibold">
                               Get Started
                           </button>
                       </Link>
                   </li>
                </ul>
            </div>
        </nav>
        
    )
}
