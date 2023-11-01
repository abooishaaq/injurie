"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Avatar, Breadcrumb, Dropdown, Spin } from "antd";
import { usePathname } from "next/navigation";

const tabs = ["Create", "View"];

const avatarDropdown = [
  {
    key: "1",
    label: <a href="/api/auth/logout">Logout</a>,
  },
];

const AuthNested = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <a href="/api/auth/login">Login</a>
      </div>
    );
  }

  return (
    <>
      <header className="max-w-3xl mx-auto">
        <nav className="flex justify-around items-center py-4">
          <Link href="/" className="text-3xl">
            Injurie
          </Link>
          <ul className="flex space-x-4">
            {tabs.map((tab, index) => (
              <li key={index}>
                <Link href={`/${tab.toLowerCase()}`}>{tab}</Link>
              </li>
            ))}
          </ul>
          <Dropdown menu={{ items: avatarDropdown }}>
            <Avatar src={user.picture} />
          </Dropdown>
        </nav>
      </header>
      <Breadcrumb className="max-w-3xl mx-auto my-8">
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        {pathname
          .split("/")
          .filter((p) => p !== "")
          .map((p, i) => (
            <Breadcrumb.Item key={i}>
              <Link href={`/${p}`}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Link>
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
      <main className="max-w-3xl mx-auto">{children}</main>
    </>
  );
};

const AuthedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <AuthNested>{children}</AuthNested>
    </UserProvider>
  );
};

export default AuthedLayout;
