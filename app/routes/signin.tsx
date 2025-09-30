import { authClient } from "~/lib/auth-client"
import { useState } from "react"
import { Form, useNavigate } from "react-router"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const signIn = async () => {
        await authClient.signIn.email(
            {
                email,
                password,
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
                Sign In
            </h2>
            <Form onSubmit={signIn}>
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
                    Sign In
                </button>
            </Form>
        </div>
    )
}

