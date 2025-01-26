import { User, Lead } from "../../model/datamodel"
export interface UserInterface {
  create(user: User): Promise<User>
  lead(): Promise<Lead>
  leads(): Promise<Lead[]>
}
