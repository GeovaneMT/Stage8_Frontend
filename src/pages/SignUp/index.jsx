import { useState } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Background } from "./styles";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {

    api
      .post("/users", { name, email, password })
      .then(() => {

        alert("User successfully registered");
        navigate("/");

      })
      .catch((error) => {

        if (error.response) {
          setErrorMessage(error.response.data.message)
        }

      });
  }

  return (

    <Container>

      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>
          An application to save and manage your useful links.
        </p>
        <h2>Create your account</h2>
        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        {
          errorMessage &&
            <p>{errorMessage}</p>
        }

        <Button 
          title="Sign Up" 
          onClick={handleSignUp} 
        />

        <Link
          to="/"
        >
          Back to login
        </Link>
      </Form>
    </Container>
  );
}
