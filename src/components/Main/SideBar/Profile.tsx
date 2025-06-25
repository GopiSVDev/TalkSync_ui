import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { AtSign, CircleDot, User } from "lucide-react";
import { useEffect, useState } from "react";

const Profile = ({
  setMode,
}: {
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile">
  >;
}) => {
  const { user } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setAvatarUrl(user?.avatarUrl || "");
    setDisplayName(user?.displayName || "");
    setUsername(user?.username || "");
    setIsOnline(true);
  }, [user]);

  if (!user) return;
  const getInitial = () => displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <Card className="text-foreground w-full max-w-md mx-auto rounded-2xl shadow-md dark:bg-[#1e1e1e] bg-white overflow-hidden">
      {/* Avatar */}
      <div className="flex w-full justify-center rounded-2xl overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-[260px] h-[260px] object-cover bg-muted"
          />
        ) : (
          <div className="w-[260px] h-[260px] bg-gradient-to-br from-blue-300 to-blue-600 dark:from-purple-600 dark:to-purple-900 flex items-center justify-center text-6xl font-semibold text-white">
            {getInitial()}
          </div>
        )}
      </div>

      {/* Name & Username */}
      <CardHeader className="pt-6 pb-0">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Your Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 py-6">
        <div className="flex items-center gap-4">
          <User className="text-muted-foreground" size={22} />
          <div>
            <Label className="text-sm text-muted-foreground">
              Display Name
            </Label>
            <p className="text-lg font-medium">{displayName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AtSign className="text-muted-foreground" size={22} />
          <div>
            <Label className="text-sm text-muted-foreground">Username</Label>
            <p className="text-lg font-medium">@{username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CircleDot
            className={isOnline ? "text-green-500" : "text-gray-400"}
            size={22}
          />
          <div>
            <Label className="text-sm text-muted-foreground">Status</Label>
            <p
              className={`text-lg font-medium ${
                isOnline ? "text-green-500" : "text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </CardContent>

      <div className="px-6 pb-6">
        <button
          onClick={() => setMode("settings")}
          className="w-full cursor-pointer py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-purple-600 dark:to-purple-800 dark:hover:from-purple-700 dark:hover:to-purple-900 transition-all duration-200"
        >
          Edit Profile
        </button>
      </div>
    </Card>
  );
};

export default Profile;
