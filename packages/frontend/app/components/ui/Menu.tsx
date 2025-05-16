import { Menu } from "@base-ui-components/react/menu";
import { ArrowSvg } from "~/components/ui/Popover";

export default function CustomMenu({
  renderTrigger,
  children,
}: {
  renderTrigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger className="hover-bg-c1 rounded-full p-1.5 hover:cursor-pointer">
        {renderTrigger}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-none" sideOffset={8}>
          <Menu.Popup className="dark:-outline-offset-1 content origin-[var(--transform-origin)] rounded-lg py-1.5 shadow-lg outline-1 outline-c1 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none">
            <Menu.Arrow className="data-[side=right]:-rotate-90 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180">
              <ArrowSvg />
            </Menu.Arrow>
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export const MenuItem = Menu.Item;
