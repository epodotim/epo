import Menu, { MenuItem } from "~/components/ui/Menu";
import { darkModeAtom } from "~/atoms";
import { useAtom } from "jotai";
import { Laptop, MoonStars, Sun } from "@phosphor-icons/react";
import { cn } from "~/lib/utils";

const OPTIONS = [
  { id: "system", icon: <Laptop size={22} />, text: "System" },
  { id: "light", icon: <Sun size={22} />, text: "Light" },
  { id: "dark", icon: <MoonStars size={22} />, text: "Dark" },
];

const getCurrentIcon = (darkMode: string) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentOption = OPTIONS.find((item) => item.id === darkMode);
  return currentOption && currentOption.id !== "system"
    ? currentOption.icon
    : prefersDark
    ? OPTIONS.find((item) => item.id === "dark")?.icon
    : OPTIONS.find((item) => item.id === "light")?.icon;
};

export default function CustomMenu() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <Menu renderTrigger={getCurrentIcon(darkMode)}>
      {OPTIONS.map(({ id, icon, text }) => (
        <MenuItem className="hover:cursor-pointer" key={id}>
          <button
            type="button"
            className={cn(
              "hover-bg-c1 flex w-full min-w-40 items-center px-4 py-2 hover:cursor-pointer"
            )}
            onClick={() => setDarkMode(id as "system" | "light" | "dark")}
          >
            <span
              className={cn(
                "mr-1.5 h-2 w-2 rounded-full",
                id === darkMode ? "bg-accent" : "bg-transparent"
              )}
            />
            <span className="mr-2">{icon}</span>
            <span className="text-sm">{text}</span>
          </button>
        </MenuItem>
      ))}
    </Menu>
  );
}
