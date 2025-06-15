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
import { AlignJustify } from "lucide-react";

export function DropDownMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer bg-white hover:bg-[rgba(244,244,245)] dark:bg-[#212121] dark:hover:bg-[rgba(44,44,44)]"
          variant="secondary"
        >
          <AlignJustify className="!h-5 !w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white dark:bg-[#212121] "
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div
              className="flex items-center justify-between gap-2 w-full py-1.5 cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span>Night Mode</span>
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
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
