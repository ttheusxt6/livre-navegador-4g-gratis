
import React from "react";
import { Steps } from "@/components/ui/steps";
import { Wifi, Download, Settings, ArrowRight } from "lucide-react";

interface ConnectionGuideProps {
  className?: string;
}

const ConnectionGuide: React.FC<ConnectionGuideProps> = ({ className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Como se conectar</h3>
      
      <div className="space-y-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0 bg-vpn-blue dark:bg-vpn-blue/80 text-white rounded-full p-2 h-8 w-8 flex items-center justify-center">
            1
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Selecione um servidor</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Escolha um dos servidores disponíveis na lista. Se necessário, faça o download clicando no ícone <Download className="inline h-4 w-4" />.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-shrink-0 bg-vpn-blue dark:bg-vpn-blue/80 text-white rounded-full p-2 h-8 w-8 flex items-center justify-center">
            2
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Configurações (opcional)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para usuários avançados: configure as opções no modo avançado se desejar personalizar a conexão.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-shrink-0 bg-vpn-blue dark:bg-vpn-blue/80 text-white rounded-full p-2 h-8 w-8 flex items-center justify-center">
            3
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Clique no botão Conectar</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pressione o botão azul grande para iniciar a conexão. Espere enquanto o aplicativo se conecta.
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-shrink-0 bg-vpn-connected dark:bg-vpn-connected/80 text-white rounded-full p-2 h-8 w-8 flex items-center justify-center">
            4
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Pronto!</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quando conectado, o botão ficará verde. Agora você pode navegar gratuitamente pela internet.
            </p>
          </div>
        </div>
      </div>
      
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
  );
};

export default ConnectionGuide;
