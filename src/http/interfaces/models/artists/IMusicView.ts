import { IUserResponse } from "../../responses/IUserResponse";
import { IMusic } from "./IMusic";

export interface IMusicView {
  music?: IMusic;
  viewer: IUserResponse;
  created_at: Date | string;
}
