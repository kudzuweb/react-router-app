import SignIn from "~/routes/signin";
import SignUp from "~/routes/signup";

export default function Landing() {
    return (
        <div>
            <SignIn />
            <SignUp />
        </div>
    )
};
