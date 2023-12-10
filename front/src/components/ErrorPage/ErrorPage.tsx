export default function ErrorPage({
  title_text,
  error_text
}: {
  title_text: string;
  error_text: string;
}) {
  return (
    <div className="flex items-center justify-center h-full flex-col gap-10">
      <div className="text-8xl">{title_text}</div>
      <div className="text-lg">{error_text}</div>
    </div>
  );
}
