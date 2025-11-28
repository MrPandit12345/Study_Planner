import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage:"url('/images/finalTheme.png')" }}
    >
      <div className="w-full max-w-fit">{children}</div>
    </div>
  );
};

export default AuthLayout;
