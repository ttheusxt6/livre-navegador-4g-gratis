
import React from "react";
import { Wifi, Download, Settings, ArrowRight } from "lucide-react";
import { Steps } from "@/components/ui/steps";

interface ConnectionGuideProps {
  className?: string;
}

const ConnectionGuide: React.FC<ConnectionGuideProps> = ({ className }) => {
  const connectionSteps = [
    {
      title: "Selecione um servidor",
      description: "Escolha um dos servidores disponíveis na lista e faça o download se necessário."
    },
    {
      title: "Configurações (opcional)",
      description: "Para usuários avançados: configure as opções no modo avançado."
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
        
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
            <Wifi className="h-4 w-4" /> Dicas para melhor conexão:
          </h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>Certifique-se de ter um sinal 4G estável</li>
            <li>Tente diferentes servidores se um não funcionar</li>
            <li>Para conexões mais rápidas, escolha servidores com menor ping</li>
            <li>by Matheus</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConnectionGuide;
