import { useState } from "react";
import { signupService } from "../../services/auth.services.js"
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    const user = {
      username,
      email,
      password
    }

    try {
      
      await signupService(user)
      console.log("todo bien")
      navigate("/login")
    } catch (error) {
      console.log(error.response.data.errorMessage) // el mensaje que enviamos desde el BE
      console.log(error.response.status) // el status
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // ... navigate
        navigate("/error")
      }
    }

  };

  return (
    <div>

      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        { errorMessage !== null && <p>{errorMessage}</p> }

        <button type="submit">Signup</button>
      </form>
      
    </div>
  );
}

export default Signup;
