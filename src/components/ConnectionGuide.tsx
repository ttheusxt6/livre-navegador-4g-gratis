
import React from "react";
import { Wifi, Download, Settings, ArrowRight, Network, Battery, Server } from "lucide-react";
import { Steps } from "@/components/ui/steps";

interface ConnectionGuideProps {
  className?: string;
}

const ConnectionGuide: React.FC<ConnectionGuideProps> = ({ className }) => {
  const connectionSteps = [
    {
      title: "Selecione um servidor",
      description: "Escolha um dos servidores 4G ou 5G disponíveis na lista."
    },
    {
      title: "Escolha um método de conexão",
      description: "Selecione entre HTTP Direto, Túnel SSH, V2Ray ou WS Payload."
    },
    {
      title: "Otimize para sua necessidade",
      description: "Ajuste o modo de otimização de bateria conforme seu uso."
    },
    {
      title: "Clique no botão Conectar",
      description: "Pressione o botão azul grande para iniciar a conexão."
    },
    {
      title: "Pronto!",
      description: "Quando conectado, o botão ficará verde. Navegue gratuitamente pela internet."
    }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Como se conectar</h3>
      
      <div className="space-y-6">
        <Steps steps={connectionSteps} currentStep={1} className="mb-6" />
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <Wifi className="h-4 w-4" /> Dicas para melhor conexão:
          </h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>Certifique-se de ter um sinal 4G/5G estável</li>
            <li>Tente diferentes servidores se um não funcionar</li>
            <li>Para conexões mais rápidas, escolha servidores com menor ping</li>
            <li>O método HTTP Direto é o mais simples e geralmente funciona bem</li>
            <li>Se precisar mais velocidade, teste o modo de Performance</li>
            <li>Para economizar bateria durante uso prolongado, use o modo Econômico</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h5 className="font-medium text-blue-800 dark:text-blue-300 flex items-center mb-2">
              <Server className="h-4 w-4 mr-1" /> Melhor para navegação
            </h5>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Servidores Vivo e Claro geralmente oferecem melhor estabilidade para navegação comum
            </p>
          </div>
          
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h5 className="font-medium text-purple-800 dark:text-purple-300 flex items-center mb-2">
              <Network className="h-4 w-4 mr-1" /> Melhor para streaming
            </h5>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              Servidores 5G com método V2Ray são ideais para streaming de vídeos
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default ConnectionGuide;
