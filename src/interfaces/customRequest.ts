import { Request } from "express";
import { TokenData } from "../models";


export interface CustomRequest extends Request {
    userDataToken?: TokenData;
  }