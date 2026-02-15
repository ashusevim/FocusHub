import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";

function LoginPage() {
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{
            // Get the username and password from the input fields
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if(!response.ok){
                console.error("Login failed: ", response.statusText);
            }
            else{
                console.log("Login successful!");
            }
        }catch(error){
            console.error("Login failed:", error);
        }
        
    }
    return (
        <LoginForm onSubmit={handleLogin}/>
    );
}

export default LoginPage;