
import React from "react";
import { Bug, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ContactInfoProps {
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ className }) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("theuzinoitd@gmail.com");
    toast({
      title: "E-mail copiado!",
      description: "E-mail copiado para a área de transferência"
    });
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText("11912829768");
    toast({
      title: "Número copiado!",
      description: "Número do WhatsApp copiado para a área de transferência"
    });
  };

  const handleWhatsappRedirect = () => {
    window.open("https://wa.me/5511912829768", "_blank");
  };

  return (
    <div className={cn("rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800", className)}>
      <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">Contato e Suporte</h3>
      
      <div className="space-y-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Bug className="h-5 w-5 mr-2 text-red-500" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Reportar Bug</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Encontrou um problema no aplicativo? Entre em contato para reportar.
          </p>
          <div 
            onClick={handleCopyEmail}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="text-sm text-gray-800 dark:text-gray-200">theuzinoitd@gmail.com</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Toque para copiar</span>
          </div>
        </div>
        
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Comprar Arquivos</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Interessado em adquirir arquivos personalizados para conexão mais rápida?
          </p>
          <div 
            onClick={handleCopyWhatsapp}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors mb-2"
          >
            <span className="text-sm text-gray-800 dark:text-gray-200">(11) 912829768</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Toque para copiar</span>
          </div>
          <button
            onClick={handleWhatsappRedirect}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" /> Abrir WhatsApp
          </button>
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default ContactInfo;
