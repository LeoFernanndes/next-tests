export type Organization = {
  id?: string
  name: string
  created_at: string
  updated_at: string
  owner: string
  admins: string[]
  members: string[]
}