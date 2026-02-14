import { RegisterForm } from "@/components/register-form";

function RegisterPage() {
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if(!response.ok){
                console.log("Registration failed: ", response.statusText);
                return;
            }
            Navigate("/login");
        } catch (error) {
            console.log("Registration failed: ", error);
        }
    }
    return <RegisterForm onClick={handleRegister}/>
}

export default RegisterPage;