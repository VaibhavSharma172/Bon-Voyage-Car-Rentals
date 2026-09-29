// import React from 'react'
// import { useAppContext } from '../context/AppContext';
// import toast from 'react-hot-toast';

// const Login = () => {

//     const {setShowLogin, axios, setToken, navigate} = useAppContext()

//     const [state, setState] = React.useState("login");
//     const [name, setName] = React.useState("");
//     const [email, setEmail] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     const onSubmitHandler = async (event)=>{
//         try {
//             event.preventDefault();
//             const {data} = await axios.post(`/api/user/${state}`, {name, email, password})

//             if (data.success) {
//                 navigate('/')
//                 setToken(data.token)
//                 localStorage.setItem('token', data.token)
//                 setShowLogin(false)
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
        
//     }

//   return (
//     <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-ink/50'>

//       <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
//             <p className="text-2xl font-medium m-auto">
//                 <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
//             </p>
//             {state === "register" && (
//                 <div className="w-full">
//                     <p>Name</p>
//                     <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
//                 </div>
//             )}
//             <div className="w-full ">
//                 <p>Email</p>
//                 <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
//             </div>
//             <div className="w-full ">
//                 <p>Password</p>
//                 <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
//             </div>
//             {state === "register" ? (
//                 <p>
//                     Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             ) : (
//                 <p>
//                     Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
//                 </p>
//             )}
//             <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
//                 {state === "register" ? "Create Account" : "Login"}
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Login

import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const {
    setShowLogin,
    axios,
    setToken,
    fetchUser,
    navigate,
  } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      setShowLogin(false);

      // Fetch the logged-in user's data so role/isOwner
      // is immediately available.
    //   await fetchUser();

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setState((currentState) =>
      currentState === "login" ? "register" : "login"
    );

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-100 flex items-center bg-[#0B0B0B]/75 px-4"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="m-auto flex w-full max-w-[352px] flex-col gap-5 rounded-xl border border-[#262626] bg-[#F5F5F5] p-8 py-10 text-sm text-[#0B0B0B] shadow-2xl"
      >
        <div className="text-center w-full">
          <p className="text-2xl font-semibold">
            <span className="text-[#4F46E5]">Car</span>Rent
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {state === "login"
              ? "Login to your account"
              : "Create your account"}
          </p>
        </div>

        {state === "register" && (
          <div className="w-full">
            <label className="mb-1 block font-medium">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 bg-white p-2.5 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="mb-1 block font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-300 bg-white p-2.5 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <label className="mb-1 block font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="w-full rounded-md border border-gray-300 bg-white p-2.5 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
            type="password"
            minLength={8}
            required
          />
        </div>

        <p className="text-sm text-gray-600">
          {state === "register"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            className="font-medium text-[#4F46E5] hover:text-[#F59E0B] transition-colors"
          >
            {state === "register" ? "Login" : "Create one"}
          </button>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#4F46E5] py-2.5 font-medium text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : state === "register"
              ? "Create Account"
              : "Login"}
        </button>

        <p className="text-center text-xs text-gray-500">
          Secure account access
          <span className="mx-1 text-[#F59E0B]">•</span>
          Car rental platform
        </p>
      </form>
    </div>
  );
};

export default Login;
