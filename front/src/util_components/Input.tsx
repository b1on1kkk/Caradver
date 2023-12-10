import { icons } from "lucide-react";

interface TInputProps {
  wrapper_styles: string;
  icon_name: string;
  input_styles: string;
  placeholder_text: string;
  input_type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  see_password?: string;
  setSeePassword?: React.Dispatch<React.SetStateAction<boolean>>;
  seePassword?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
  wrapper_styles,
  icon_name,
  input_styles,
  placeholder_text,
  input_type,
  onChange,
  value,
  see_password,
  setSeePassword,
  seePassword,
  onBlur
}: TInputProps) {
  const LucideIcon = icons[icon_name as keyof typeof icons];
  const Eye = icons[see_password as keyof typeof icons];

  return (
    <div className={wrapper_styles}>
      <div>
        <LucideIcon className="opacity-50 w-5" />
      </div>
      <input
        type={input_type}
        placeholder={placeholder_text}
        className={input_styles}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        id={`reusable_input__${input_type}___${placeholder_text}`}
        autoComplete="on"
      />
      {see_password && (
        <div onClick={() => setSeePassword!(!seePassword)}>
          <Eye className="opacity-50 w-5" />
        </div>
      )}
    </div>
  );
}
