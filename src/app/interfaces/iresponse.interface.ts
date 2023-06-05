import { Iuser } from "./iuser.interface";

export interface Iresponse {
    user: Iuser;
    accessToken: string;
  }