import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/useAuthStore";
import {
  AlignJustify,
  LogOut,
  MoonStar,
  Settings,
  UserRound,
} from "lucide-react";

export function DropDownMenu({
  setMode,
}: {
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile" | "search">
  >;
}) {
  const { logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const items = [
    {
      name: "Profile",
      Icon: <UserRound />,
      onClick: () => setMode("profile"),
    },
    {
      name: "Settings",
      Icon: <Settings />,
      onClick: () => setMode("settings"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0 shadow-none">
        <Button
          className="cursor-pointer bg-white hover:bg-[rgba(244,244,245)] dark:bg-[#212121] dark:hover:bg-[rgba(44,44,44)] rounded-4xl p-0"
          variant="secondary"
        >
          <AlignJustify className="!h-6 !w-6" size={30} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white/70 dark:bg-[#212121]/80 backdrop-blur-sm border-none shadow-md space-y-1.5"
        align="start"
      >
        <DropdownMenuGroup className="font-medium">
          {items.map(({ Icon, name, onClick }) => (
            <DropdownMenuItem
              key={name}
              onClick={onClick}
              className="cursor-pointer gap-2 flex justify-start items-center data-[highlighted]:bg-gray-200/70 dark:hover:bg-black/30"
            >
              <span className="text-black">{Icon}</span>
              <span>{name}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="data-[highlighted]:bg-gray-200/70 dark:hover:bg-black/30"
          >
            <div
              className="flex items-center justify-between gap-2 w-full cursor-pointer "
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="flex gap-2 items-center">
                <MoonStar />
                Night Mode
              </span>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="font-medium cursor-pointer data-[highlighted]:bg-gray-200/70 dark:hover:bg-black/30"
          onClick={() => logout()}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
