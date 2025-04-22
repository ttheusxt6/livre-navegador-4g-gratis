
import React from "react";
import { User, Settings, Menu, MoreVertical, Phone, Battery, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <header
      className={cn(
        "bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-3 px-4 sticky top-0 z-10",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-vpn-darkBlue dark:text-blue-300">
              {isMobile ? "4G Livre" : "4G Livre"}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Navegação gratuita <span className="text-xs">by Matheus</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform"
                aria-label="Opções adicionais"
              >
                <MoreVertical className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
              <DropdownMenuItem onSelect={() => {
                onOpenBatteryOptimization && onOpenBatteryOptimization();
              }} className="flex items-center gap-2 cursor-pointer">
                <Battery className="h-4 w-4" />
                <span>Otimização de Bateria</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                onOpenSettings && onOpenSettings();
              }} className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => {
                onOpenContactInfo && onOpenContactInfo();
              }} className="flex items-center gap-2 cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                <span>Contato e Suporte</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onSelect={() => {
                navigate('/login');
              }} className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Login/Perfil</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {!isMobile && (
            <>
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform"
                aria-label="Configurações"
              >
                <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button
                onClick={onOpenProfile}
                className="flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 transition-transform"
                aria-label="Perfil"
              >
                <div className="bg-vpn-blue dark:bg-vpn-blue/80 text-white p-1 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                {userName && <span className="text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:inline">{userName}</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
