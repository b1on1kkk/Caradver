import styles from "../Profile.module.scss";
import SubTitle from "../../../util_components/SubTitle";

export default function ProfileHeader() {
  return (
    <header className={styles.header}>
      <SubTitle
        title_text="Profile"
        sub_text="Update your photo and personal details here."
        title_styles="text-xl font-semibold"
      />
    </header>
  );
}
