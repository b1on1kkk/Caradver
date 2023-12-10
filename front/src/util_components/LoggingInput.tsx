import Input from "./Input";

import SettingsTitle from "./SettingsTitle";
import ErrorText from "./ErrorText";

interface TLoggingInput {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text_value: string;
  placeholder: string;
  type: "text" | "password" | "date";
  icon: string;
  error_status?: boolean;
  error_text?: string;
  see_password?: string;
  setSeePassword?: React.Dispatch<React.SetStateAction<boolean>>;
  seePassword?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function LoggingInput({
  title,
  onChange,
  text_value,
  placeholder,
  type,
  icon,
  error_status,
  error_text,
  see_password,
  setSeePassword,
  seePassword,
  onBlur
}: TLoggingInput) {
  return (
    <div className="flex flex-col gap-3">
      <SettingsTitle text_color="text-gray-600 font-semibold" text={title} />
      <Input
        wrapper_styles={`flex p-4 border-1 rounded-lg gap-2 ${
          error_status && "border-red-600"
        }`}
        icon_name={icon}
        input_styles={"w-full focus:outline-none"}
        placeholder_text={placeholder}
        input_type={type}
        onChange={onChange}
        value={text_value}
        see_password={see_password}
        setSeePassword={setSeePassword}
        seePassword={seePassword}
        onBlur={onBlur}
      />
      {error_status && <ErrorText error_text={error_text!} />}
    </div>
  );
}
