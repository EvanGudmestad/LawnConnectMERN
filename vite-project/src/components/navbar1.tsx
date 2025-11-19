import { Book, Menu, Trees, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import type { Session } from "better-auth/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
  requiredRole?: string | string[]; // Add role requirement
}

// Extend the User type to include role field
interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  role: string[];
  image?: string;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExtendedSession extends Omit<Session, 'user'> {
  user: ExtendedUser;
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "LawnConnect Logo",
    title: "LawnConnect",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Services",
      url: "#",
      items: [
        {
          title: "Browse Services",
          description: "Find lawn care services in your area",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/services",
        },
        {
          title: "My Jobs",
          description: "View and manage your job requests",
          icon: <Book className="size-5 shrink-0" />,
          url: "/jobs",
          requiredRole: ["customer", "admin"],
        },
        {
          title: "Available Jobs",
          description: "Browse and apply to available jobs",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/available-jobs",
          requiredRole: "contractor",
        },
      ],
    },
    {
      title: "User List",
      url: "/user-list",
      requiredRole: "admin",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      requiredRole: ["customer", "contractor", "admin"],
    },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  // Cast session to include role field
  const extendedSession = session as ExtendedSession | null;

   // Add this to debug
  console.log('Session data:', session);
  console.log('Extended session:', extendedSession);
  
  // Helper function to check if user has required role
  const hasRole = (requiredRole?: string | string[]) => {
    if (!requiredRole || !extendedSession?.user?.role) return true;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.some((role) => extendedSession.user.role.includes(role));
  };

  // Filter menu items based on user roles
  const filteredMenu = menu.filter((item) => {
    if (!extendedSession && item.requiredRole) return false;
    return hasRole(item.requiredRole);
  });

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/");
  };
  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {filteredMenu.map((item) => renderMenuItem(item, extendedSession))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isPending ? (
              <span className="text-sm">Loading...</span>
            ) : extendedSession ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, {extendedSession.user.name || extendedSession.user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>
                <Button asChild size="sm">
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {filteredMenu.map((item) => renderMobileMenuItem(item, extendedSession))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {isPending ? (
                      <span className="text-sm">Loading...</span>
                    ) : extendedSession ? (
                      <>
                        <div className="border-b pb-3">
                          <p className="text-sm font-medium">
                            {extendedSession.user.name || extendedSession.user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {extendedSession.user.email}
                          </p>
                        </div>
                        <Button variant="outline" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>
                        <Button asChild>
                          <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, session: ExtendedSession | null) => {
  if (item.items) {
    // Filter sub-items based on role
    const filteredSubItems = item.items.filter((subItem) => {
      if (!session && subItem.requiredRole) return false;
      if (!subItem.requiredRole) return true;
      const roles = Array.isArray(subItem.requiredRole) ? subItem.requiredRole : [subItem.requiredRole];
      return roles.some((role) => session?.user?.role?.includes(role));
    });

    // Don't render menu item if no sub-items are visible
    if (filteredSubItems.length === 0) return null;

    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {filteredSubItems.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, session: ExtendedSession | null) => {
  if (item.items) {
    // Filter sub-items based on role
    const filteredSubItems = item.items.filter((subItem) => {
      if (!session && subItem.requiredRole) return false;
      if (!subItem.requiredRole) return true;
      const roles = Array.isArray(subItem.requiredRole) ? subItem.requiredRole : [subItem.requiredRole];
      return roles.some((role) => session?.user?.role?.includes(role));
    });

    // Don't render menu item if no sub-items are visible
    if (filteredSubItems.length === 0) return null;

    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {filteredSubItems.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
