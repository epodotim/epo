import { Menu } from "@base-ui-components/react/menu";
import { ArrowSvg } from "~/components/ui/Popover";
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
    <Menu.Root>
      <Menu.Trigger className="">{getCurrentIcon(darkMode)}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup className="dark:-outline-offset-1 origin-[var(--transform-origin)] rounded-md content py-1 shadow-gray-200 shadow-lg outline-none outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none dark:outline-gray-300">
            <Menu.Arrow className="data-[side=right]:-rotate-90 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180">
              <ArrowSvg />
            </Menu.Arrow>
            {OPTIONS.map(({ id, icon, text }) => (
              <Menu.Item className="cursor-pointer" key={id}>
                <button
                  type="button"
                  className={cn(
                    "flex items-center border-l-3 py-2 pr-5 pl-3.5",
                    id === darkMode ? "border-accent" : "border-transparent"
                  )}
                  onClick={() => setDarkMode(id as "system" | "light" | "dark")}
                >
                  <span className="mr-1.5">{icon}</span>
                  <span className="text-sm">{text}</span>
                </button>
              </Menu.Item>
            ))}
            {/* <Menu.Item className="flex cursor-default select-none py-2 pr-8 pl-4 text-sm leading-4 outline-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900">
              Add to Library
            </Menu.Item> */}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
