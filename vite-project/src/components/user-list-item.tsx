import type { User, CustomerProfile, ProviderProfile } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserListItem = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  // Helper to get display name with fallbacks
  const getDisplayName = () => {
    if (user.name) return user.name;

    // Check if it's a customer with name fields
    if (user.profile && 'given_name' in user.profile) {
      const profile = user.profile as CustomerProfile;
      const givenName = profile.given_name || "";
      const familyName = profile.family_name || "";

      if (givenName || familyName) {
        return `${givenName} ${familyName}`.trim();
      }
    }

    // Check if it's a provider with company name
    if (user.profile && 'company_name' in user.profile) {
      const profile = user.profile as ProviderProfile;
      return profile.company_name || "Unknown Company";
    }

    return "Unknown User";
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">{getDisplayName()}</div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/users/${user._id}/edit`)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-gray-500">{user._id || "No ID"}</div>
      <div className="text-sm text-gray-500">{user.email || "No email"}</div>
      <div className="flex gap-2 flex-wrap">
        {user.role?.length ? (
          user.role.map((role, index) => (
            <Badge key={index} variant="secondary">
              {role}
            </Badge>
          ))
        ) : (
          <Badge variant="secondary">No role</Badge>
        )}
      </div>
    </div>
  );
};

export { UserListItem };