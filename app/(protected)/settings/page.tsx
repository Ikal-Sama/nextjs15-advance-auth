import { Card } from "@/components/ui/card";
import { UpdateUserForm } from "@/components/user/update-user-form";

const SettingsPage = () => {
  return (
    <Card className="w-[600px]">
      <UpdateUserForm />
    </Card>
  );
};

export default SettingsPage;
