import { Button } from "@/components/ui/button";

function LoginPage() {
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{
            // Get the username and password from the input fields
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response =- await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
        }catch(error){
            console.error("Login failed:", error);
        }
        
    }
    return (
        <div className="modal-content flex flex-col w-10 justify-evenly">
            <h2 className="text-3xl mb-3 text-foreground">Login</h2>
            <label className="flex items-center mb-2 gap-2 text-foreground">
                <h2>Username</h2>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </label>
            <label className="flex items-center mb-2 gap-2">
                <h2>Password</h2>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </label>
            <Button type="submit" onClick={handleLogin} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Button>
        </div>
    );
}

export default LoginPage;