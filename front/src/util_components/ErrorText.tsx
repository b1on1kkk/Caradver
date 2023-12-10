export default function ErrorText({ error_text }: { error_text: string }) {
  return <span className="text-xs text-red-600 font-bold">{error_text}</span>;
}
