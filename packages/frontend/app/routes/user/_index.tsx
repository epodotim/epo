import type { Route } from "./+types/_index";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function User({ loaderData }: Route.ComponentProps) {
  const { uid } = useParams();

  return <p>{uid}</p>;
}
