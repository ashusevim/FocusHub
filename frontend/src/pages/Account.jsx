import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getInitials = (username = "") => {
	const trimmed = username.trim();
	return trimmed ? trimmed.charAt(0).toUpperCase() : "U";
};

export default function Account() {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	return (
		<div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
			<header className="space-y-1">
				<h1 className="text-3xl font-semibold tracking-tight">Account</h1>
				<p className="text-sm text-muted-foreground">
					View your profile information and manage your session.
				</p>
			</header>

			<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
				<Card className="overflow-hidden">
					<CardHeader className="border-b bg-muted/30">
						<CardTitle>Profile overview</CardTitle>
						<CardDescription>
							This is the information currently linked to your account.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center">
						<Avatar className="h-20 w-20">
							<AvatarFallback className="text-xl font-semibold">
								{getInitials(user?.username)}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-1">
							<h2 className="text-2xl font-semibold">
								{user?.username || "Unknown user"}
							</h2>
							<p className="text-muted-foreground">
								{user?.email || "No email available"}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Actions</CardTitle>
						<CardDescription>
							Quick actions for your account.
						</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-3">
						<Button variant="outline"
							onClick={() => {
								navigate("/edit-profile")
							}}
						>

							Edit profile
						</Button>
						<Button variant="destructive" onClick={logout}>
							Log out
						</Button>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Account details</CardTitle>
					<CardDescription>
						Your basic account information.
					</CardDescription>
				</CardHeader>

				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
							<User className="h-4 w-4" />
							<span>Username</span>
						</div>
						<p className="text-base font-medium">{user?.username || "-"}</p>
					</div>

					<div className="rounded-lg border p-4">
						<div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
							<Mail className="h-4 w-4" />
							<span>Email</span>
						</div>
						<p className="text-base font-medium break-all">{user?.email || "-"}</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
