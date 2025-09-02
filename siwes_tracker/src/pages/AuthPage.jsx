import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  SignIn from "./login"
import Signup from "./signup"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../firebase/firebase"
import {setDoc, doc} from "firebase/firestore"

function Auth() {
  const [isSignin, setIsSignin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
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

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm(isSignin ? loginData : signupData);
    if (Object.keys(errors).length > 0) {
      // Handle errors
      setFormErrors(errors);
    } else {
      // Submit form
      if (isSignin) {
        // Call login API
      } else {
        // Call signup API
        try{
            await createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
            const user = auth.currentUser;
            console.log("User signed up:", user);
            if(user){
              await setDoc(doc(db, "users", user.uid), {
                fullName: signupData.fullName,
                email: signupData.email
              });
            }
        }catch(error){
          console.error("Error signing up:", error);
        }

         navigate("/setup", {state: {fullName: signupData.fullName}});
      }
    }
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
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
          {isSignin ? (
            <p>Sign in to continue your journey</p>
          ) : (
            <p>Create an account to get started</p>
          )}
          <div className="flex justify-around mt-4">
            <div
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignin(true)}
              style={{
                fontWeight: isSignin ? "bold" : "normal",
                borderBottom: isSignin ? "2px solid blue" : "none",
              }}
            >
              Login
            </div>
            <div
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsSignin(false)}
              style={{
                fontWeight: !isSignin ? "bold" : "normal",
                borderBottom: !isSignin ? "2px solid blue" : "none",
              }}
            >
              Sign Up
            </div>
          </div>
          {isSignin ? 
          <SignIn onSubmit={handleSubmit} formErrors={formErrors} loginData={loginData} onChange={handleLoginChange} setIsSignin={setIsSignin} setShowPassword={setShowPassword} showPassword={showPassword}/> 
          : 
          <Signup onSubmit={handleSubmit} formErrors={formErrors} signupData={signupData} onChange={handleSignupChange} setIsSignin={setIsSignin} setShowPassword={setShowPassword} showPassword={showPassword}/>
          }
        </div>
      </div>
    </>
  );
}

export default Auth;
