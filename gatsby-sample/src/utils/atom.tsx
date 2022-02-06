import { atom } from "recoil";

const myAtom = (Key: string, Default: any) =>
  atom({
    key: Key,
    default: Default,
  });

export default myAtom;
