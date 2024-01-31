import { Iteam } from './Iteams';

export default interface IteamModel {
  getAll():Promise<Iteam[]>
}
