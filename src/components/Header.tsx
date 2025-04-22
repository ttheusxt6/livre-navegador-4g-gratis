
import React from "react";
import { User, Settings, Menu, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userName?: string;
  onOpenMenu: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  className?: string;
  onOpenBatteryOptimization?: () => void;
  onOpenContactInfo?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  onOpenMenu,
  onOpenSettings,
  onOpenProfile,
  onOpenBatteryOptimization,
  onOpenContactInfo,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-3 px-4",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-vpn-darkBlue dark:text-blue-300">4G Livre</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Navegação gratuita <span className="text-xs">by Matheus</span></p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Opções adicionais"
              >
                <MoreVertical className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => {
                onOpenBatteryOptimization && onOpenBatteryOptimization();
              }}>
                Otimização de Bateria
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                onOpenSettings && onOpenSettings();
              }}>
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                onOpenContactInfo && onOpenContactInfo();
              }}>
                Contato e Suporte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Configurações"
          >
            <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Perfil"
          >
            <div className="bg-vpn-blue dark:bg-vpn-blue/80 text-white p-1 rounded-full">
              <User className="h-4 w-4" />
            </div>
            {userName && <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{userName}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
