import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface UserProfileProps {
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  isOnline?: boolean | null;
}

const Profile: React.FC<UserProfileProps> = ({
  username,
  displayName,
  avatarUrl,
  isOnline,
}) => {
  const getInitial = () => displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <Card className="text-foreground w-full overflow-hidden dark:bg-[#212121]">
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-full h-[300px] object-cover border-2 border-gray-600"
        />
      ) : (
        <div className="w-full h-[300px] bg-[linear-gradient(rgb(255,255,255)-125%,rgb(64,138,207))] flex items-center justify-center text-3xl font-bold">
          {getInitial()}
        </div>
      )}

      {/* Name & Username */}
      <CardHeader>
        <CardTitle className="text-xl">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-muted-foreground">Display Name</Label>
          <p>{displayName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Username</Label>
          <p>{username}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Status</Label>
          <p>{isOnline ? "Online" : "Unknown"}</p>
        </div>
      </CardContent>
      {/* Optional: Add buttons or profile settings */}
      <div className="mt-6 w-full flex flex-col gap-2">
        <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm">
          Edit Profile
        </button>
      </div>
    </Card>
  );
};

export default Profile;
