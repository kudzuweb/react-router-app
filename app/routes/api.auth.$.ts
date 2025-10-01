import { auth } from '../../auth';
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router';

//app.get
export async function loader({ request }: LoaderFunctionArgs) {
    console.log(`LOADER req: ${request}`)
    return auth.handler(request)
}
//app.post
export async function action({ request }: LoaderFunctionArgs) {
    console.log(`ACTION req: ${request}`)
    return auth.handler(request)
}