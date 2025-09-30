import { auth } from '../../auth';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router';

//app.get
export async function loader({ request }: LoaderFunctionArgs) {
    return auth.handler(request)
}
//app.post
export async function action({ request }: LoaderFunctionArgs) {
    return auth.handler(request)
}