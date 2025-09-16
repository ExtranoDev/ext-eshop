import Menu from "@/components/shared/header/menu";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";
import AdminSearch from "@/components/admin/admin-search";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b mx-auto container">
          <div className="flex items-center h-16 px-4">
            <Link className="w-22" href="/">
              <Image
                src="/images/logo.svg"
                alt={APP_NAME}
                height={48}
                width={48}
              />
            </Link>
            <MainNav />
            <div className="ml-auto items-center flex space-x-4">
              <div>
                <AdminSearch />
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
          {children}
        </div>
      </div>
    </>
  );
}
