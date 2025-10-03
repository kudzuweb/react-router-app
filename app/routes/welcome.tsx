import { authClient } from "~/lib/auth-client"
import { NavBar } from "~/routes/navbar"
import Chat from "~/routes/chat"

export default function Welcome() {
  const { data } = authClient.useSession()
  return (
    <div>
      <NavBar />
      <p>Greetings, Master {data?.user.name}</p>
      <Chat />
    </div>
  )

}