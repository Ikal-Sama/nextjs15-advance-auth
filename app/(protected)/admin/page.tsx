"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { UserLock } from "lucide-react";

const AdminPage = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold flex items-center gap-2 justify-center">
          <UserLock /> Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
