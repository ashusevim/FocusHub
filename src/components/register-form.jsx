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
import { Link } from "react-router-dom"

export function RegisterForm({
    className,
    ...props
}) {
    return (
        <div className={cn("flex min-h-screen items-center justify-center px-4", className)} {...props}>
            <Card className="w-full max-w-md overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <form className="space-y-6">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome to FocusHub</h1>
                                <p className="text-muted-foreground text-balance">
                                    Register to your FocusHub account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" placeholder="user@gmail.com" required />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a href="#" placeholder="Enter your password" className="ml-auto text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
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
