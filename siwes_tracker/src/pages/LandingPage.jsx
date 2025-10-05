import '../App.css'
import Navbar from '../components/navbar'
import Image from '../components/image'
import FeatureSection from '../components/features_cards'
import Process from '../processes'
import Card from '../components/cards'
import { GraduationCap, Presentation, Building } from 'lucide-react';
import { Link } from 'react-router-dom'
function LandingPage() {
  return (
    <>
      <Navbar/>
      <section className='flex bg-blue-50 px-10 h-screen items-center justify-between'>
        <div>
          <h1 className="text-6xl font-bold text-slate-900 max-w-xl mb-6 tracking-wide">Track Your SIWES Journey with <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Confidence</span></h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">Streamline your Industrial Training experience with our intuitive daily log tracker. Stay organized, meet deadlines, and showcase your progress effortlessly.</p>
          <div className=' flex gap-4 mt-6'>
            <Link to='/login'>
              <button 
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg  h-auto p-4 rounded-2xl text-white font-semibold">
              Get Started</button>
            </Link>
            <button 
            className="text-lg p-4 h-auto rounded-2xl font-semibold bg-slate-100 hover:bg-slate-200 "
            >Learn More</button>
          </div>
        </div>
        <div className='relative'>
          <div className='rounded-3xl transform rotate-3 bg-gradient-to-br from-blue-600 to-teal-600 w-120 '>
            <div className=' relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-1 transition-transform duration-300'>
              <Image/>
            </div>
          </div>
        </div>
      </section>
      <section id='features' className='py-20'>
          <div className='text-center mb-20'>
            <span className="bg-slate-100 text-slate-700 p-2 rounded-2xl">Features</span>
            <h2 className='text-3xl font-bold text-slate-900 mt-2 tracking-tight'>Everything you need to excel in your SIWES</h2>
            <p className='text-xl text-slate-700 mt-4 w-2xl mx-auto '>Comprehensive tools designed specifically for Industrial Training students to track, analyze, and optimize their learning experience. </p>
          </div>
          <div className='grid grid-cols-4 gap-8 px-10'>
            <FeatureSection/>
          </div>
      </section>
      <section className='text-center py-20 bg-gradient-to-br from-slate-50 to-blue-50'>
        <div >
        <span className='text-blue-700 bg-blue-200 px-4 py-0.5 rounded-3xl'>How it works</span>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 m-5' > Get started in minutes, not hours</h1>
        <p className='text-xl text-slate-600 max-w-3xl mx-auto'>Our streamlined process gets you tracking your SIWES progress immediately, with no complex setup required.</p>  
        </div>
        <div className='flex gap-6'>
          <Process/>
        </div>
      </section>
      <section className='flex items-center justify-center text-center h-screen'>
        <div>
          <h1 className='text-4xl font-bold'>
          Built for Nigerian Students, By Students
        </h1>
        <div className='bg-blue-50 p-15 rounded-3xl w-4xl m-10 shadow-2xl'>
          <p className='text-slate-600 text-xl '>
            SIWES Tracker was born from the real struggles of Nigerian university students during their Students Industrial Work Experience Scheme (SIWES). We've experienced firsthand the challenges of maintaining consistent daily logs throughout the industrial training period.
            <br />
            <br />
            This application eliminates the frustration of physical logbooks, provides intelligent organization, and ensures you never lose your valuable training documentation. Whether you're studying engineering, computer science, or any field requiring SIWES, our tool adapts to your workflow and helps you maintain the professional documentation standards your institution expects.
          </p>
        </div>
        </div>
      </section>
      <section>
        <div className='text-center mt-10'>
          <h1 className='text-4xl font-bold mb-4'>
          Designed for the Entire SIWES Ecosystem
          </h1>
          <p>
            Supporting everyone involved in the Industrial Training process
          </p>
        </div>
        <div className='grid grid-cols-3 gap-8 px-10 mt-10'>
          <Card
            title="For Students"
            description="Empowering students to take control of their learning journey."
            Icon={GraduationCap}
            color="blue"
          />
          <Card
            title="For Educators"
            description="Providing tools for educators to monitor and support student progress."
            Icon={Presentation}
            color="green"
          />
          <Card
            title="For Institutions"
            description="Helping institutions maintain oversight and ensure compliance."
            Icon={Building}
            color="purple"
          />
        </div>
      </section>
      <section className='text-center mt-10 bg-gradient-to-br from-blue-600 to-purple-500 text-white p-10'>
        <h1 className='text-4xl font-bold mb-4'>
            Ready to Transform Your SIWES Experience?
          </h1>
          <p>
            Join thousands of students who are already using SIWES Tracker to stay organized and succeed in their Industrial Training.
          </p>
          <div>
            <button
            className="bg-white mt-4 text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >Get Started</button>
          </div>
      </section>
    <footer className='text-center py-10 bg-slate-900'>
        <p className='text-gray-600'>© 2023 SIWES Tracker. All rights reserved.</p>
        <p className='text-gray-500 text-sm'>Built with ❤️ by Emmanuel Adeyemi</p>
      </footer>
    </>
  )
}

export default LandingPage 
