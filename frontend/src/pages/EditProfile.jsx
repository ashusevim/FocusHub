import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { navigate } = useNavigate()
    const { user, token, login } = useAuth()
    
    const [username, setUsername] = useState(user?.username || "")
    const [email, setEmail] = useState(user?.email || "")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isSubmitting, setIsSubmitting] =  useState(false)

    useEffect(() => {
        setUsername(user?.username || "")
        setEmail(user?.email || "")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if(!username.trim() || !email.trim()){
            setError("Username and email are required")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("http://localhost:3000/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer: ${token}`
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim()
                }),
            })

            const data = await response.json();

            if(!response.ok){
                setError(data?.message || "Failed to update profile.")
                return;
            }

            if(data?.token && data?.user){
                login(data.token, data.user);
            }

            setSuccess("Profile updated successfully.")
            setTimeout(() => navigate("/account"), 700)
        } catch (error) {
            setError("Something went wrong while updating profile.")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                        Update your username and email.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </Field>
                            
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="user@gmail.com"
                                    required
                                />
                            </Field>

                            {error ? (
                                <FieldDescription className="text-destructive">
                                    {error}
                                </FieldDescription>
                            ) : null}

                            {success ? (
                                <FieldDescription className="text-emerald-600">
                                    {success}
                                </FieldDescription>
                            ) : null}

                            <div className="flex gap-3 pt-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save changes"}
                                </Button>
                                <Button
                                    type="button"
                                    varient="outline"
                                    onClick={() => navigate("/account")}
                                    disabled={isSubmitting}
                                >Cancel</Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditProfile;
