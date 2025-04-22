
import React, { useState } from "react";
import { Network, Layers, Server, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionMethodsProps {
  className?: string;
  onSelectMethod: (method: string) => void;
}

const ConnectionMethods: React.FC<ConnectionMethodsProps> = ({ className, onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("http-direct");
  
  const methods = [
    {
      id: "http-direct",
      name: "HTTP Direto",
      icon: Server,
      description: "Conexão estável para navegação básica",
      recommended: true
    },
    {
      id: "ssh-tunnel",
      name: "Túnel SSH",
      icon: Network,
      description: "Mais seguro e rápido para redes restritas"
    },
    {
      id: "v2ray",
      name: "V2Ray",
      icon: Wifi,
      description: "Protocolo avançado para conexões instáveis"
    },
    {
      id: "ws-payload",
      name: "WS Payload",
      icon: Layers,
      description: "Melhor para streaming e jogos online"
    }
  ];

  const handleMethodChange = (methodId: string) => {
    setSelectedMethod(methodId);
    onSelectMethod(methodId);
  };

  return (
    <div className={cn("rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800", className)}>
      <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">Métodos de Conexão</h3>
      
      <div className="space-y-3">
        {methods.map(method => (
          <button
            key={method.id}
            onClick={() => handleMethodChange(method.id)}
            className={cn(
              "w-full flex items-center p-3 rounded-lg border transition-colors",
              selectedMethod === method.id
                ? "border-vpn-blue bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            )}
          >
            <div className={cn(
              "p-2 rounded-full mr-3",
              selectedMethod === method.id
                ? "bg-vpn-blue text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            )}>
              <method.icon className="h-5 w-5" />
            </div>
            
            <div className="text-left flex-1">
              <div className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                {method.name}
                {method.recommended && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 rounded">
                    Recomendado
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{method.description}</div>
            </div>
            
            <div className="ml-2">
              <div className={cn(
                "w-5 h-5 rounded-full border-2",
                selectedMethod === method.id
                  ? "border-vpn-blue bg-white dark:bg-gray-800"
                  : "border-gray-300 dark:border-gray-600"
              )}>
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 m-0.5 rounded-full bg-vpn-blue" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default ConnectionMethods;
