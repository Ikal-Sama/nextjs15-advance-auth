import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "next-auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";

interface UserInfoProps {
  user?: User & { role: string };
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
          <div className="relative mb-5 rounded-full bg-gray-100 p-5 w-[90px] h-[90px]">
            <Image
              src={user?.image || "/avatar.png"}
              alt="User Image"
              fill
              className="rounded-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex gap-5">
            <Label>Name</Label>
            <Input defaultValue={user?.name || ""} disabled />
          </div>

          <div className="flex gap-5">
            <Label>Email</Label>
            <Input defaultValue={user?.email || ""} disabled />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
