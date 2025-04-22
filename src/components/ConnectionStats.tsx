
import React from "react";
import { Clock, ArrowDown, ArrowUp, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatsProps {
  isConnected: boolean;
  connectionTime: string;
  downloadSpeed: string;
  uploadSpeed: string;
  signalStrength: number; // 0-100
  className?: string;
}

const ConnectionStats: React.FC<ConnectionStatsProps> = ({
  isConnected,
  connectionTime,
  downloadSpeed,
  uploadSpeed,
  signalStrength,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-4",
        !isConnected && "opacity-60",
        className
      )}
    >
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-200">Status da Conexão</h2>
      
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div
            className={cn(
              "h-3 w-3 rounded-full mr-2",
              isConnected ? "bg-vpn-connected" : "bg-vpn-disconnected"
            )}
          />
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {isConnected ? "Conectado" : "Desconectado"}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {connectionTime}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <ArrowDown className="h-4 w-4 mr-2" />
            <span>Download</span>
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-200">{downloadSpeed}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <ArrowUp className="h-4 w-4 mr-2" />
            <span>Upload</span>
          </div>
          <div className="font-medium text-gray-800 dark:text-gray-200">{uploadSpeed}</div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Wifi className="h-4 w-4 mr-2" />
              <span>Sinal 4G</span>
            </div>
            <div className="font-medium text-gray-800 dark:text-gray-200">{signalStrength}%</div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full",
                signalStrength > 70
                  ? "bg-vpn-connected"
                  : signalStrength > 30
                  ? "bg-yellow-400"
                  : "bg-vpn-disconnected"
              )}
              style={{ width: `${signalStrength}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default ConnectionStats;
