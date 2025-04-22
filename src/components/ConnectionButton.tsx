
import React from "react";
import { cn } from "@/lib/utils";

interface ConnectionButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onClick: () => void;
  className?: string;
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  isConnected,
  isConnecting,
  onClick,
  className,
}) => {
  const buttonText = isConnecting
    ? "Conectando..."
    : isConnected
    ? "Desconectar"
    : "Conectar";

  const buttonColor = isConnected
    ? "from-vpn-connected to-vpn-teal"
    : "from-vpn-blue to-vpn-lightBlue";

  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={cn(
        "relative w-32 h-32 rounded-full bg-gradient-to-br shadow-lg",
        buttonColor,
        "flex items-center justify-center text-white font-bold text-lg",
        "transition-all duration-300 transform hover:scale-105",
        "focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      aria-label={buttonText}
    >
      <div className="absolute inset-0 rounded-full border-4 border-transparent">
        {isConnected && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-vpn-connected animate-pulse" />
        )}
      </div>
      {buttonText}
    </button>
  );
};

export default ConnectionButton;
