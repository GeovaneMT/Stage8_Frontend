import { Container } from "./styles"
import { useNavigate } from "react-router-dom"

import { Button } from "../../components/Button"

export function Error404() {
  const navigate = useNavigate()

  function handleback() {
    navigate("/")
  }
  return (
    <Container>
      <h2>Erro 404: página não encontrada</h2>
      <Button title="Voltar para o início" onClick={handleback} />
    </Container>
  )
}