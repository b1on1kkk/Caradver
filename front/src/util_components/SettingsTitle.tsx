export default function SettingsTitle({
  text_color,
  text,
  onClick
}: {
  text_color: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <span className={`text-sm ${text_color}`} onClick={onClick}>
      {text}
    </span>
  );
}
