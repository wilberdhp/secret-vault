export type TypePassword = {
  id: string
  account: string
  username: string
  password: string
  image?: string
} 

export type TypeContact = {
  id: string
  name: string
  image: string | null,
  email: string
  phones: string[]
}

export type TypeNote = {
  id: string
  title: string
  content: string
  date: number
}