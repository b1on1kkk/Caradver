import WavyUnderlineText from "../../../util_components/WavyUnderlineText";

export default function UserNotLogged() {
  return (
    <div className="flex justify-center py-20 text-lg">
      Sorry, but to use this page you have to
      <WavyUnderlineText link="/registration" text="Log in" /> or
      <WavyUnderlineText link="/sign_up" text="Sing up" />
    </div>
  );
}
