import { createContext, useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { api } from "../services/api"

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function SignIn(email, password) {
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data

      localStorage.setItem("@RocketNotes:user", JSON.stringify(user))
      localStorage.setItem("@RocketNotes:token", token)

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setData({ user, token })

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível entrar")
      }

    }

  }

  function signOut() {
    localStorage.removeItem("@RocketNotes:token")
    localStorage.removeItem("@RocketNotes:user")
    setData({})
  }

async function updateProfile({ user, avatarFile, showMessage = false }) {
  try {

    // If new password is provided, update hashed password
    if (user.New_password) {
      // Make the request to update the user with new password
      const updateResponse = await api.put("/users", user);
      user.password = updateResponse.data.hashedPassword; // update user object with hashed password
    } else {
      // If new password is not provided, update user without changing password
      await api.put("/users", user); // No need to store the response if not used
    }

      if (avatarFile) {
      const fileUploadForm = new FormData();
      fileUploadForm.append("avatar", avatarFile);
      const response = await api.patch("/users/avatar", fileUploadForm);
      user.avatar = response.data.avatar;
    }

    const { New_password, Old_password, ...userWithoutPassword } = user;

    localStorage.setItem("@RocketNotes:user", JSON.stringify(userWithoutPassword));

    setData({ user, token: data.token });

    // Only show the message if showMessage is true
    if (showMessage) {
      alert("Info updated successfully");
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Não foi possível atualizar");
    }
  }
}

  useEffect(() => {
    const token = localStorage.getItem("@RocketNotes:token")
    const user = localStorage.getItem("@RocketNotes:user")

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        signOut,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}