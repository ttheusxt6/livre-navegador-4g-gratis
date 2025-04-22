
import React from "react";
import { Check, Download, Signal, Wifi, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Server {
  id: string;
  name: string;
  description: string;
  speed: string;
  ping: number;
  isAvailable: boolean;
  isDownloaded: boolean;
  networkType: "4G" | "5G";
  method?: string;
}

interface ServerListProps {
  servers: Server[];
  selectedServer: string | null;
  onSelectServer: (serverId: string) => void;
  onDownloadServer: (serverId: string) => void;
  className?: string;
}

const ServerList: React.FC<ServerListProps> = ({
  servers,
  selectedServer,
  onSelectServer,
  onDownloadServer,
  className,
}) => {
  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Arquivos de Conexão 4G/5G</h2>
      <div className="space-y-2">
        {servers.map((server) => (
          <div
            key={server.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg border transition-colors",
              selectedServer === server.id
                ? "border-vpn-blue bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
              !server.isAvailable && "opacity-50"
            )}
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  server.isAvailable ? "bg-vpn-connected" : "bg-gray-400"
                )}
              />
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {server.name}
                  <span className={cn(
                    "ml-2 text-xs px-1.5 py-0.5 rounded",
                    server.networkType === "5G" 
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {server.networkType}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{server.description}</div>
                {server.method && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {server.method}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Signal className="h-4 w-4 mr-1" />
                <span>{server.speed}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{server.ping}ms</span>
              </div>
              
              {server.isAvailable && (
                <>
                  {server.isDownloaded ? (
                    <button
                      onClick={() => onSelectServer(server.id)}
                      className={cn(
                        "p-2 rounded-full",
                        selectedServer === server.id
                          ? "bg-vpn-blue text-white dark:bg-vpn-blue/80"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                      aria-label={`Selecionar servidor ${server.name}`}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onDownloadServer(server.id)}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      aria-label={`Baixar servidor ${server.name}`}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default ServerList;
