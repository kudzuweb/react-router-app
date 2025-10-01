import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/home";
import Landing from "../landing/landing";
import SignIn from "./signin"
import SignUp from "./signup";
import { Welcome } from "~/welcome/welcome";
// import Welcome from "~/welcome/welcome";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Auth error. Try again</p>

  if (!session) {
    return <div>
      <Landing />
      <SignIn />
      <SignUp />
    </div>
  }

  return
  <div>
    <Welcome />
  </div>

}
