import { parseName } from "~/lib/utils";

export default function StyledName({ fullname }: { fullname: string }) {
  const { id, subname } = parseName(fullname);

  return (
    <span>
      {id}
      <span className="opacity-60">{subname && `.${subname}`}.eth</span>
    </span>
  );
}
