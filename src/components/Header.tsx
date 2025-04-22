
import React from "react";
import { User, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  userName?: string;
  onOpenMenu: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  onOpenMenu,
  onOpenSettings,
  onOpenProfile,
  className,
}) => {
  return (
    <header
      className={cn(
        "bg-white shadow-sm border-b border-gray-200 py-3 px-4",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-lg hover:bg-gray-100 mr-2"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-vpn-darkBlue">4G Livre</h1>
            <p className="text-xs text-gray-500">Navegação gratuita</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-gray-100"
          >
            <div className="bg-vpn-blue text-white p-1 rounded-full">
              <User className="h-4 w-4" />
            </div>
            {userName && <span className="text-sm font-medium">{userName}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
