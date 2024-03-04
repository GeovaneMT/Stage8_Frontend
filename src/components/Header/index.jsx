import { useNavigate } from 'react-router-dom'
import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'

import { useAuth } from '../../hooks/auth'

import { api } from "../../services/api"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Header() {
  const { user } = useAuth()
  const { signOut } = useAuth()
  const navigation = useNavigate()
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}files/${user.avatar}`
    : avatarPlaceholder
  
  function handleSignOut() {
    navigation("/")
    signOut()
  }
  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt="Foto do usuário" />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}