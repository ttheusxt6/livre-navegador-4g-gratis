
import React from "react";
import { Check, Download, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Server {
  id: string;
  name: string;
  description: string;
  speed: string;
  ping: number;
  isAvailable: boolean;
  isDownloaded: boolean;
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
      <h2 className="text-lg font-bold mb-2 text-gray-800">Arquivos de Conexão 4G</h2>
      <div className="space-y-2">
        {servers.map((server) => (
          <div
            key={server.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg border transition-colors",
              selectedServer === server.id
                ? "border-vpn-blue bg-blue-50"
                : "border-gray-200 bg-white",
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
                <div className="font-medium">{server.name}</div>
                <div className="text-sm text-gray-500">{server.description}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Signal className="h-4 w-4 mr-1" />
                <span>{server.speed}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
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
                          ? "bg-vpn-blue text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onDownloadServer(server.id)}
                      className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
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
    </div>
  );
};

export default ServerList;
