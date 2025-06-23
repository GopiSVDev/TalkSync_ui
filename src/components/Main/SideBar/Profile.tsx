import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AtSign, CircleDot, User } from "lucide-react";

const Profile = ({
  setMode,
}: {
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile">
  >;
}) => {
  const { user } = useAuth();

  if (!user) return;

  const { displayName, avatarUrl, username, isOnline } = user;

  const getInitial = () => displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <Card className="text-foreground w-full overflow-hidden dark:bg-[#212121]">
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-[300px] object-contain overflow-hidden"
        />
      ) : (
        <div className="w-full h-[300px] bg-[linear-gradient(rgb(255,255,255)-125%,rgb(64,138,207))] flex items-center justify-center text-3xl font-bold text-black dark:text-white">
          {getInitial()}
        </div>
      )}

      {/* Name & Username */}
      <CardHeader>
        <CardTitle className="text-xl">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-base">
        <div className="flex items-center gap-3">
          <User className="text-muted-foreground" size={20} />
          <div>
            <Label className="text-muted-foreground">Display Name</Label>
            <p className="text-lg font-medium">{displayName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AtSign className="text-muted-foreground" size={20} />
          <div>
            <Label className="text-muted-foreground">Username</Label>
            <p className="text-lg font-medium">@{username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CircleDot
            className={isOnline ? "text-green-500" : "text-gray-400"}
            size={20}
          />
          <div>
            <Label className="text-muted-foreground">Status</Label>
            <p className="text-lg font-medium">
              {isOnline ? "Online" : "Unknown"}
            </p>
          </div>
        </div>
      </CardContent>
      {/* Optional: Add buttons or profile settings */}
      <div className="mt-6 w-full flex flex-col gap-2">
        <button
          onClick={() => setMode("settings")}
          className="w-full cursor-pointer py-2 rounded text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          Edit Profile
        </button>
      </div>
    </Card>
  );
};

export default Profile;
