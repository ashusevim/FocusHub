import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, Navigate } from "react-router-dom"
import { useState } from "react"

export function RegisterForm({
    className,
    ...props
}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("Registration failed: ", error);
        }
    }

    return (
        <div className={cn("flex min-h-screen items-center justify-center px-4", className)} {...props}>
            <Card className="w-full max-w-md overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome to FocusHub</h1>
                                <p className="text-muted-foreground text-balance">
                                    Register to your FocusHub account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input id="username" type="text" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" placeholder="user@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a href="#" placeholder="Enter your password" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Field>
                            
                            <Field>
                                <Button type="submit">Register</Button>
                            </Field>
                            
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            
                            <FieldDescription className="text-center">
                                Do you have an account? {" "}
                                <Link to="/login" className="text-primary underline-offset-2 hover:underline">
                                Sign in</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
