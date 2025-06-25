import {
  deleteProfile,
  updateProfile,
  type UpdateProfilePayload,
} from "@/api/userApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function validateImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

const Settings = ({
  setMode,
}: {
  setMode: React.Dispatch<
    React.SetStateAction<"chats" | "settings" | "profile">
  >;
}) => {
  const { user, setUser, logout } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [password, setPassword] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [isValidImage, setIsValidImage] = useState(true);

  useEffect(() => {
    if (!avatarUrl) return setIsValidImage(true);

    const timeout = setTimeout(() => {
      validateImageUrl(avatarUrl).then(setIsValidImage);
    }, 500);

    return () => clearTimeout(timeout);
  }, [avatarUrl]);

  if (!user) return;

  const handleSave = async () => {
    const updates: UpdateProfilePayload = { id: user.id };

    if (displayName && displayName.trim() !== user.displayName) {
      updates.displayName = displayName;
    }

    if (avatarUrl.trim() && avatarUrl !== user.avatarUrl) {
      if (!isValidImage) {
        toast.error("Invalid Image Url");
        return;
      }

      updates.avatarUrl = avatarUrl;
    }

    if (password && password.length > 0) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      updates.password = password;
    }

    const hasChanges = Object.keys(updates).length > 1;

    if (!hasChanges) {
      toast.info("No changes to save");
      return;
    }

    try {
      const updatedUser = await updateProfile(updates);
      setUser(updatedUser);

      setMode("profile");
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof Error) toast.error("Failed To Update Profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteProfile(user.id);
      logout();

      toast.success("Account Deleted");
    } catch (error) {
      if (error instanceof Error) toast.error("Failed To Delete Profile");
    }
  };

  return (
    <Card className="text-foreground w-full max-w-md mx-auto rounded-2xl shadow-md dark:bg-[#1e1e1e] bg-white overflow-hidden">
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Edit Profile
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your personal information
        </p>
      </CardHeader>

      <CardContent className="space-y-5 py-4 dark:bg-[#1e1e1e] bg-white">
        {/* Avatar Preview */}
        <div className="w-full h-[260px] overflow-hidden flex items-center justify-center dark:bg-[#1e1e1e] bg-white">
          <div className="h-[260px] w-[260px] rounded-xl overflow-hidden">
            {avatarUrl && isValidImage ? (
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : avatarUrl ? (
              <div className="text-center text-red-500 text-sm">
                Invalid image URL
              </div>
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                Image preview will appear here
              </div>
            )}
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
          <Label htmlFor="settings-display-name">Display Name</Label>
          <Input
            id="settings-display-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* Avatar URL */}
        <div className="space-y-2">
          <Label htmlFor="avatar-url-input">Avatar URL</Label>
          <Input
            id="avatar-url-input"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className={avatarUrl && !isValidImage ? "border-red-500" : ""}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="settings-password">New Password</Label>
          <Input
            id="settings-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full cursor-pointer py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-purple-600 dark:to-purple-800 dark:hover:from-purple-700 dark:hover:to-purple-900 transition-all duration-200"
        >
          Save Changes
        </button>

        {/* Delete Account */}
        <div className="pt-6 border-t border-muted flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Danger Zone</p>
          <button
            onClick={handleDeleteAccount}
            className="w-full cursor-pointer py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
          >
            Delete Account
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
