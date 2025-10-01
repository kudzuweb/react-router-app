import { authClient } from "~/lib/auth-client"
import { NavBar } from "~/routes/navbar"

export function Welcome() {
  const { data } = authClient.useSession()
  return (
    <div>
      <NavBar />
      <p>Hello {data?.user.name}</p>
    </div>
  )

}