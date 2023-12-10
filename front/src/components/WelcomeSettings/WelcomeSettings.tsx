import WavyUnderlineText from "../../util_components/WavyUnderlineText";

export default function WelcomeSettings() {
  return (
    <div className="py-20 flex items-center justify-center flex-col gap-5">
      <div className="text-5xl">Welcome to Settings page!</div>
      <div className="text-lg">
        Here you can see your{" "}
        <WavyUnderlineText link="/Settings/Profile" text="Profile" /> data,{" "}
        <WavyUnderlineText link="/Settings/Notification" text="Notifications" />{" "}
        and more!
      </div>
    </div>
  );
}
