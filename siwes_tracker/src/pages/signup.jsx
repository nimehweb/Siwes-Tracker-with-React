import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../firebase/firebase"
import {setDoc, doc} from "firebase/firestore"
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup () {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    const [formErrors, setFormErrors] = useState({});
      const [showPassword, setShowPassword] = useState(false);

const onChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
      
      function validateForm(values) {
        const errors = {};
        if (!values.fullName) {
          errors.fullName = "Full Name is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        }
        if (!values.password) {
          errors.password = "Password is required!";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters!";
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Passwords do not match!";
        }
        return errors;
      }

const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const errors = validateForm(signupData);
    if (Object.keys(errors).length >0){
        setFormErrors(errors)
    }
    else{
        try {
          await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
          const user = auth.currentUser;
          console.log("User signed up:", user);
          if (user){
            await setDoc(doc(db, "users", user.uid),{
              fullName: signupData.fullName,
              email: signupData.email,
            })
          }
          toast.success("User registered successfully!", { position: "top-center" });
        } catch (error) {
          console.error("Error signing up:", error);
          toast.error(`Error: ${error.message}`, { position: "top-center" });
        }
      // navigate("/setup", {state: {fullName: signupData.fullName}});
    }
  }
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
       <ToastContainer />
        <div className="bg-white p-10 rounded-lg shadow-lg w-120">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 mx-auto mb-2">
            <BookOpen className="h-6 w-6 text-white " />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">SIWES Tracker</h1>
            <p className="text-gray-600">
              Track your industrial training journey with ease
            </p>
          </div>
          <p>Sign in to continue your journey</p>
          <div className="flex justify-around mt-4">
           <NavLink
            to={"/login"}
            className={({isActive})=>
                `text-blue-500 cursor-pointer ${isActive ? "font-bold border-b-2 border-blue-500" : ""}`} 
            >
                Login
            </NavLink>
        
            <NavLink
            to={"/signup"}
            className={({isActive})=>
                `text-blue-500 cursor-pointer ${isActive ? "font-bold border-b-2 border-blue-500" : ""}` } 
            >
                Sign Up
            </NavLink>
          </div>
          <form className="flex flex-col mt-4 " onSubmit={handleSubmit}>
        {formErrors.fullName && (
          <small className="text-red-500 text-left">
            {formErrors.fullName}
          </small>
        )}
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded mb-4"
          onChange={onChange}
          name="fullName"
          value={signupData.fullName}
        />

        {formErrors.email && (
          <small className="text-red-500 text-left">{formErrors.email}</small>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded mb-4"
          onChange={onChange}
          name="email"
          value={signupData.email}
        />

        {formErrors.password && (
          <small className="text-red-500 text-left">
            {formErrors.password}
          </small>
        )}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="border p-2 rounded mb-4"
          onChange={onChange}
          name="password"
          value={signupData.password}
        />
        {showPassword ? (
         <EyeOff
            className="absolute left-210 top-97 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="absolute left-210 top-97 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}

        {formErrors.confirmPassword && (
          <small className="text-red-500 text-left">
            {formErrors.confirmPassword}
          </small>
        )}
        <input
          type={showPassword?"text" : "password"}
          placeholder="Confirm Password"
          className="border p-2 rounded mb-4"
          onChange={onChange}
          name="confirmPassword"
          value={signupData.confirmPassword}
        />
        {showPassword ? (
         <EyeOff
            className="absolute left-210 top-111 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="absolute left-210 top-111 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400 cursor-pointer my-4"
        >
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
         <NavLink
            to={"/login"}
            className={`text-blue-500 cursor-pointer `} 
            >
            Login
            </NavLink>
        </p>
      </form>
        </div>
    </div>
    );
  };

  export default Signup;

  