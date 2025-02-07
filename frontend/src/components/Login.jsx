import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation, useRegisterUserMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const [message,  setMessage] = useState('')
  const [signState, setSignState] = useState("Log In");
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // for Api login and sign up
  const disptach = useDispatch()
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [ registerUser, {isLoading}] = useRegisterUserMutation()
  // console.log(loginuser)

  const handlesignstate = async(e) => {
    e.preventDefault();
    const data = {
      userName,
      email,

      password,
    };
    // console.log(data);
    try {
      if (signState === 'Sign Up') {
        await registerUser(data).unwrap();
        
        // alert('register now')
        navigate('/')
        setSignState("Log In")

      }
      else {
         const response = await loginUser(data).unwrap();
         // console.log(response)
        //  alert("login successful");
         navigate("/");
      }
     
    } catch (error) {
      setMessage("please provide a valid email and password")
      
    }
    
    
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please {signState}</h2>

        <form
          className="space-y-5 max-w-sm mx-auto pt-8"
          onSubmit={handlesignstate}
        >
          {signState === "Sign Up" ? (
            <input
              type="userName"
              placeholder="userName"
              id="name"
              required
              className="w-full bg-gray-100 focus:outline-none px-5 py-2"
              onChange={(e) => setuserName(e.target.value)}
            />
          ) : (
            <></>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            id="email"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-2"
          />
          <div className="mt-2 text-red-400">{message}</div>

          <button
            type="submit"
            className="mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-2 rounded-md px-5 w-full"
          >
            {signState}
          </button>
        </form>
        {/* <p className="my-5 italic text-sm text-center">
          Don't have an account? <Link to="/register">Register</Link> here
        </p> */}
        {signState === "Log In" ? (
          <p className="mt-6">
            You don't Have?{" "}
            <span
              className="text-red-400 cursor-pointer hover:text-red-700"
              onClick={() => setSignState("Sign Up")}
            >
              create new account
            </span>
          </p>
        ) : (
          <p className="mt-4">
            have account?{" "}
            <span
              className="text-red-400 cursor-pointer hover:text-red-700"
              onClick={() => setSignState("Log In")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
