export interface Iuser {
  id:number,
  username:string,
  role:string,
  email:string,
  password:string,
}

export type LoginInfo = {
  email:string;
  password:string;
};

export type TokenType = { token:string };

export type UserType = { role:string };
