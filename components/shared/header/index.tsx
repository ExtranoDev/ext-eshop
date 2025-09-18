import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="px-4 py-2 md:py-4 flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={0}
              width={0}
              priority={true}
              className="w-6 h-6 md:w-8 md:h-8"
            />

            <span className="hidden xl:block font-medium text-xl ml-3">
              {APP_NAME}
            </span>
          </Link>

          <Button size="sm" asChild variant="outline">
            <Link
              href="/search"
              className="flex-start ml-6 text-muted-foreground"
            >
              <Home className="w-4 h-4" />

              <span className="font-medium text-sm">Shop</span>
            </Link>
          </Button>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
