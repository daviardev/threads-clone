import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";

import { Loader } from "assets/Loader";

export default function ForgotPassword () {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)

    const emailRef = useRef(null)

    const [formSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const emailValid = emailRegex.test(email)

        if (email === "") {
            setEmailError("Email cannot be empty.")
        } else if (!emailValid) {
            setEmailError("Email format is invalid.")
        }else {
            setEmailError("")
        }

        setIsButtonEnabled(emailValid)
    }, [email, formSubmitted])

    const handleSubmit = e => {
        e.preventDefault()
        setFormSubmitted(true)

        if (!isButtonEnabled) {
            if (email === "") {
                toast.error("Enter email for recovery.")
            } else if (emailError) {
                toast.error(emailError)
            }

            if (emailError && emailRef.current) {
                emailRef.current.focus()
            }

            return
        }

        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            toast.success("Verify your email.")
            setEmail("")
            setEmailError("")
            setFormSubmitted(false)
        }, 2000)
    }
    return (
            <form onSubmit={handleSubmit} className="flex w-full flex-col">
                <label htmlFor="email">
                    <span className="sr-only">Email, phone or username.</span>
                <input
                    id="email"
                    ref={emailRef}
                    type="text"
                    name="email"
                    placeholder="Email, phone or username."
                    className={`mb-2 px-4 py-4 w-full rounded-xl text-start bg-inputText text-sm border border-transparent ${emailError && ""} outline-none placeholder:font-medium focus:border-outlineFocus`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                        <span className="flex items-center justify-center">
                            <Loader className="animate-spin" />
                        </span>
                    ) : (
                        "Send email"
                    )}
                </button>
            </form>
    )
}