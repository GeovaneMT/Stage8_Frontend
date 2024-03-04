import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { ButtonText } from "../../components/ButtonText"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { api } from "../../services/api"

import { Container, Form } from "./styles"

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink])
    setNewLink("")
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveLink(deleted) {
    setLinks((prevState) => prevState.filter((link) => link !== deleted))
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted))
  }

  async function handleNewNote() {

    if(!title) {
      return alert("não se esqueça de adicionar o título")
    }

    if(newTag) {
      return alert("não se esqueça de adicionar as tags com o botão após digitar ou limpe os campos")
    }

    if(newLink) {
      return alert("não se esqueça de adicionar os links com o botão após digitar ou limpe os campos")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    })

    alert("Nota criada")
    navigate(-1)
  }
  
  function handleback() {
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="voltar" onClick={handleback}>
              voltar
            </ButtonText>
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={index}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}

            <NoteItem
              $isNew
              value={newLink}
              onClick={handleAddLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Novo link"
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                $isNew
                value={newTag}
                onClick={handleAddTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nova Tag"
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}
