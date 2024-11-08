import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Loader } from "assets/Loader";

export default function SignIn () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const isUsernameValid = username.length >= 2;
    const isPasswordValid = password.length >= 6;

    if (username === "") {
      setUsernameError("Username cannot be empty.");
    } else if (!isUsernameValid) {
      setUsernameError("Username must be at least 2 characters.");
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("Password cannot be empty.");
    } else if (!isPasswordValid) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }

    setIsButtonEnabled(isUsernameValid && isPasswordValid);
  }, [username, password, formSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isButtonEnabled) {
      if (username === "") {
        toast.error("Enter your username, phone or email.");
      } else if (password === "") {
        toast.error("Enter your password.");
      } else if (usernameError) {
        toast.error(usernameError);
      } else if (passwordError) {
        toast.error(passwordError);
      }

      // Foco en el primer campo erróneo
      if (usernameError && usernameRef.current) {
        usernameRef.current.focus();
      } else if (passwordError && passwordRef.current) {
        passwordRef.current.focus();
      }

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
      setUsername("");
      setPassword("");
      setUsernameError("");
      setPasswordError("");
      setFormSubmitted(false)
    }, 2000);
  };

  return (
    <form
      method="POST"
      className="w-full flex flex-col"
      onSubmit={handleSubmit}
    >
      <label htmlFor="username">
        <span className="sr-only">Username, phone or email</span>
        <input
          id="username"
          ref={usernameRef}
          type="text"
          name="username"
          placeholder="Username, phone or email"
          className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
            usernameError && ""
          } outline-none placeholder:font-medium focus:border-outlineFocus`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <span className="sr-only">Password</span>
        <input
          type="password"
          ref={passwordRef}
          name="password"
          id="password"
          placeholder="Password"
          className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
            passwordError && ""
          } outline-none placeholder:font-medium focus:border-outlineFocus`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className={`w-full h-full mb-2 px-4 py-4 rounded-xl text-center text-base font-semibold outline-none transition-transform ease-in-out active:scale-95 ${
          isButtonEnabled
            ? "bg-white text-button cursor-pointer"
            : "bg-white text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
