import { useUser } from "reactfire";

export default function () {
    const { status, data: user } = useUser();

    return (
        <header>{
            status === 'loading' ?
                <span>loading...</span> :
                <h1>Welcome Back, {user?.displayName}!</h1>
        }</header>
    );
}