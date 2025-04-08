
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from './ui/navigation-menu';
import { SidebarTrigger } from './ui/sidebar';
import Logo from './Logo';

interface HeaderProps {
  isDashboard?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDashboard = false, onMenuClick }) => {
  return (
    <header className="border-b border-devopsgenie-border bg-white sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {isDashboard && (
            <SidebarTrigger 
              onClick={onMenuClick}
              className="h-10 w-10 text-devopsgenie-text"
            />
          )}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl text-devopsgenie-text">DevOpsGenie</span>
          </Link>
          
          {!isDashboard && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-devopsgenie-primary/40 to-devopsgenie-primary p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <Logo />
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              DevOpsGenie
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Transform project descriptions into complete deployment strategies with infrastructure as code.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Infrastructure as Code</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Generate production-ready code for your cloud infrastructure.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Architecture Diagrams</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Visualize your infrastructure with detailed diagrams.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">FinOps Analysis</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Optimize your cloud spending with cost estimates.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Documentation
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!isDashboard ? (
            <>
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-devopsgenie-primary hover:bg-opacity-90">Sign up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Help
              </Button>
              <div className="h-8 w-8 rounded-full bg-devopsgenie-primary flex items-center justify-center">
                <span className="text-white font-medium text-sm">JD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
