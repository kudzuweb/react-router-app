import { authClient } from "~/lib/auth-client"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function SignOut() {
    const { data } = authClient.useSession()
    const nav = useNavigate()

    const handleSignOut = async () => {
        await authClient.signOut();
        nav('/');
    }
    return (
        <button onClick={(e) => handleSignOut()}>Sign Out</button>
    )
}