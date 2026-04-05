import { useAuth } from "@/context/AuthContext"

export default function Account() {
	const { user } = useAuth()
	return (
        <>
			<h1>{user?.username}</h1>
			<h1>{user?.email}</h1>
        </>
    )
}
