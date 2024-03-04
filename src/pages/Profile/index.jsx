import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import { useAuth } from "../../hooks/auth"

import { api } from "../../services/api"

import { Container, Form, Avatar } from "./styles"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Profile() {
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const [Old_password, setOld_Password] = useState()
  const [New_password, setNew_password] = useState()

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}files/${user.avatar}`
    : avatarPlaceholder
  const [avatar, setAvatar] = useState(avatarUrl)
  const [avatarFile, setAvatarFile] = useState(null)

  async function handleUpdate() {
    const updated = {
      name,
      email,
      New_password,
      Old_password,
    }

    const userUpdated = Object.assign(user, updated)

    await updateProfile({ user: userUpdated, avatarFile, showMessage: true })
  }

  async function handleChangeAvatar(event) {
    const file = event.target.files[0]
    setAvatarFile(file)

    const imagePreview = URL.createObjectURL(file)
    setAvatar(imagePreview)
  }
  
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={24} />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera />

            <input
              type="file"
              id="avatar"
              name="avatar"
              autoComplete="photo"
              title="Insira sua foto"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          type="text"
          name="Nome"
          autoComplete="name"
          placeholder="Nome"
          title="Insira seu nome"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="text"
          name="E-mail"
          title="Insira seu e-mail"
          autoComplete="email"
          placeholder="E-mail"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          name="Senha Atual"
          title="Insira sua senha atual"
          autoComplete="current-password"
          placeholder="Senha atual"
          icon={FiLock}
          onChange={(e) => setOld_Password(e.target.value)}
        />

        <Input
          type="password"
          name="nova senha"
          title="Insira sua nova senha"
          autoComplete="new-password"
          placeholder="Nova senha"
          icon={FiLock}
          onChange={(e) => setNew_password(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
