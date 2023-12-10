interface TSubTitle {
  title_text: string;
  sub_text: string;
  title_styles: string;
}

export default function SubTitle({
  title_text,
  sub_text,
  title_styles
}: TSubTitle) {
  return (
    <>
      <h2 className={title_styles}>{title_text}</h2>
      <div className="text-base text-gray-600">{sub_text}</div>
    </>
  );
}
