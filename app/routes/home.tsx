import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/home";
import Landing from "./landing";
import SignIn from "./signin"
import SignUp from "./signup";
import Welcome from "~/routes/welcome";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ForeverDM" },
    { name: "The DM's trusty helper", content: "Every plotter needs a minion" },
  ];
}

export default function Home() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Auth error. Try again</p>

  if (!session) {
    return <div>
      <Landing />
    </div>
  }

  return (
    <div>
      <Welcome />
    </div>
  )

}
