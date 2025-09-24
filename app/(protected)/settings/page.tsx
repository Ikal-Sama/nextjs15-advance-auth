import { Card } from "@/components/ui/card";
import { UpdateUserForm } from "@/components/user/update-user-form";
import { currentUser } from "@/lib/auth";
import { User } from "@/types/user";

const SettingsPage = async () => {
  const user = await currentUser();
  return (
    <Card className="w-[600px]">
      <UpdateUserForm user={user as User} />
    </Card>
  );
};

export default SettingsPage;
