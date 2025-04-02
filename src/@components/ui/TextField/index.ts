import { TextAreaField } from "./TextAreaField";
import { TextFieldDefault } from "./TextField";
import { TextFieldPhoneNumber } from "./TextFieldPhoneNumber";
import { TextFieldWithPwd } from "./TextFieldWithPwd";

export const TextField = {
  Default: TextFieldDefault,
  Password: TextFieldWithPwd,
  Phone: TextFieldPhoneNumber,
  TextArea: TextAreaField
};
