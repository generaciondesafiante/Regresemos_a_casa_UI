import { FC } from "react";
import { Input } from "../../../atoms";

interface RegisterFormPasswordProps {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  password2: string;
}

export const RegisterFormPassword: FC<RegisterFormPasswordProps> = ({
  setPassword,
  setPassword2,
  password,
  password2,
}) => {
  return (
    <>
      <Input
        id={"password-form-register"}
        htmlForm={"password-form-register"}
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        placeholder=" "
        label={"Contraseña"}
        isRequire={true}
      />
      <Input
        id={"password2-form-register"}
        htmlForm={"password2-form-register"}
        name="password2"
        value={password2}
        onChange={(event) => setPassword2(event.target.value)}
        type="password"
        placeholder=" "
        label={"Repite la contraseña"}
        isRequire={true}
      />
    </>
  );
};
