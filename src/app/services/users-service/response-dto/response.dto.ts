import { UserDto } from "../user-dto/user.dto";

export interface ResponseDto {
    user: UserDto;
    accessToken: string;
  }