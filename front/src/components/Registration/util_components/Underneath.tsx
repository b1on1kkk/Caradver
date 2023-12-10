export default function Underneath({
  button_text,
  onClick
}: {
  button_text: string;
  onClick: () => void;
}) {
  return (
    <>
      <div className="flex justify-between my-8">
        <div className="flex items-center gap-3">
          <input type="checkbox" />
          <span className="text-gray-400 text-sm">Remember me</span>
        </div>
        <div className="text-sm text-blue-500">Forgot your password?</div>
      </div>

      <div
        className="py-5 text-center text-white bg-blue-400 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-200 ease-in"
        onClick={onClick}
      >
        {button_text}
      </div>
    </>
  );
}
