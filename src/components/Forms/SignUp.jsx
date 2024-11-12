import { useState, useEffect, useRef } from "react"

import toast from "react-hot-toast"

import { Loader } from "assets/Loader"

export default function SignUp () {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const [fullNameError, setFullNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const emailRef = useRef(null)
    const fullnameRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

        const isFullNameValid = fullName.length <= 50
        const isEmailValid = emailRegex.test(email)
        const isUsernameValid = username.length >= 2
        const isPasswordValid = password.length >= 6

        if (fullName === "") {
            setFullNameError("Full name cannot be empty.")
        } else if (!isFullNameValid) {
            setFullNameError("Full name must be at least 50 characters.")
        } else {
            setFullNameError("")
        }

        if (email === "") {
            setEmailError("Email cannot be empty.")
        } else if (!isEmailValid) {
            setEmailError("Format email invalid.")
        } else {
            setEmailError("")
        }

        if (username === "") {
            setUsernameError("Username cannot be empty.")
        } else if (!isUsernameValid) {
            setUsernameError("Username must be at least 2 characters.")
        } else {
            setUsernameError("")
        }

        if (password === "") {
            setPasswordError("Password cannot be empty.")
        } else if (!isPasswordValid) {
            setPasswordError("Password must be at least 6 characters.")
        } else {
            setPasswordError("")
        }

        setIsButtonEnabled(isEmailValid && isFullNameValid && isUsernameValid && isPasswordValid)

    }, [fullName, email, username, password, formSubmitted])

    const handleSubmit = e => {
        e.preventDefault()
        setFormSubmitted(true)

        if (!isButtonEnabled) {
            if (email === "") {
                toast.error("Enter a email.")
            } else if (fullName === "") {
                toast.error("Enter your full name.")
            } else if (username === "") {
                toast.error("Enter your username")
            } else if (password === "") {
                toast.error("Enter your password")
            } else if (emailError) {
                toast.error(emailError)
            } else if (fullNameError) {
                toast.error(fullNameError)
            } else if (usernameError) {
                toast.error(usernameError)
            } else if (passwordError) {
                toast.error(passwordError)
            }

            if (emailError && emailRef.current) {
                emailRef.current.focus()
            } else if (fullNameError && fullnameRef.current) {
                fullnameRef.current.focus()
            } else if (usernameError && usernameRef.current) {
                usernameRef.current.focus()
            } else if (passwordError && passwordRef.current) {
                passwordRef.current.focus()
            }

            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            toast.success("Account created.")
            setEmail("")
            setUsername("")
            setFullName("")
            setPassword("")
            setFormSubmitted(false)
        }, 2000)
    }
    return (
        <form
            method="POST"
            className="w-full max-w-lg grid gap-6"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email">
                        <span className="sr-only">Email</span>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            ref={emailRef}
                            placeholder="Enter your email"
                            className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
                                emailError && ""
                            } outline-none placeholder:font-medium focus:border-outlineFocus`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="fullName">
                        <span className="sr-only">Full name</span>
                        <input
                            id="fullName"
                            ref={fullnameRef}
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
                                fullNameError && ""
                            } outline-none placeholder:font-medium focus:border-outlineFocus`}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="username">
                        <span className="sr-only">Username</span>
                        <input
                            id="username"
                            ref={usernameRef}
                            type="text"
                            name="username"
                            placeholder="Username"
                            className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
                                usernameError && ""
                            } outline-none placeholder:font-medium focus:border-outlineFocus`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <span className="sr-only">Password</span>
                        <input
                            id="password"
                            ref={passwordRef}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${
                                passwordError && ""
                            } outline-none placeholder:font-medium focus:border-outlineFocus`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className={`w-full h-full mb-2 px-4 py-4 rounded-xl text-center text-base font-semibold outline-none ${
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
                "Create account"
                )}
            </button>
        </form>
    )
}