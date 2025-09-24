import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { LockKeyholeIcon } from "lucide-react";

const page = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-black">
      <div className="space-y-6 flex flex-col items-center">
        <div className="flex items-center gap-3 text-white">
          <LockKeyholeIcon className="size-11" />
          <h1 className="text-5xl font-semibold  drop-shadow-md">Auth</h1>
        </div>
        <p className="text-white text-lg">A simple authentication project</p>

        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};

export default page;
