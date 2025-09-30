import { authClient } from "~/lib/auth-client"
import { useState } from "react"
import { Form, useNavigate } from "react-router"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const signUp = async () => {
        await authClient.signUp.email(
            {
                email: email,
                password: password,
                name: "hi"
            },
            {
                onRequest: (ctx) => {
                    setIsLoading(true)
                },
                onSuccess: (ctx) => {
                    setIsLoading(false)
                    navigate("/home")

                },
                onError: (ctx) => {
                    setIsLoading(false)
                    alert(ctx.error.message)
                },
            },
        )
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading, please wait...</p>
            </div>
        )
    }

    return (
        <div>
            <h2>
                Sign Up
            </h2>
            <Form onSubmit={signUp}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Sign Up
                </button>
            </Form>
        </div>
    )
}

