export default function SuccessText({
  success_text
}: {
  success_text: string;
}) {
  return (
    <span className="text-xs text-green-600 font-bold">{success_text}</span>
  );
}
