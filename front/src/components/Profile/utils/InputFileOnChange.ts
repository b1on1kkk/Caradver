export default function InputFileOnChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setAvatar: React.Dispatch<
    React.SetStateAction<{
      file: File | null;
      unique_name: string;
    } | null>
  >
) {
  if (e.target.files?.length) {
    const unique_filename = `${Date.now()}${e.target.files[0].name}`;

    setAvatar({
      file: new File([e.target.files[0]], unique_filename, {
        type: e.target.files[0].type
      }),
      unique_name: unique_filename
    });
  }
}
