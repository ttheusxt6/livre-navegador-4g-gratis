
import React, { useState } from "react";
import { Battery, Zap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BatteryOptimizationProps {
  className?: string;
}

const BatteryOptimization: React.FC<BatteryOptimizationProps> = ({ className }) => {
  const [optimizationMode, setOptimizationMode] = useState<"balanced" | "performance" | "saving">("balanced");
  
  return (
    <div className={cn("rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800", className)}>
      <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3 flex items-center">
        <Battery className="mr-2 h-5 w-5" /> 
        Otimização de Bateria
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setOptimizationMode("saving")}
            className={cn(
              "p-3 rounded-lg border flex flex-col items-center",
              optimizationMode === "saving"
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}
          >
            <Battery className="h-8 w-8 mb-2 text-green-600 dark:text-green-400" />
            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Econômico</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mais duração</span>
          </button>
          
          <button
            onClick={() => setOptimizationMode("balanced")}
            className={cn(
              "p-3 rounded-lg border flex flex-col items-center",
              optimizationMode === "balanced"
                ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}
          >
            <Settings className="h-8 w-8 mb-2 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Equilibrado</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recomendado</span>
          </button>
          
          <button
            onClick={() => setOptimizationMode("performance")}
            className={cn(
              "p-3 rounded-lg border flex flex-col items-center",
              optimizationMode === "performance"
                ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}
          >
            <Zap className="h-8 w-8 mb-2 text-red-600 dark:text-red-400" />
            <span className="font-medium text-sm text-gray-800 dark:text-gray-200">Performance</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mais veloz</span>
          </button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Impacto na bateria</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Uso da CPU</span>
              <div className="w-32 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full",
                    optimizationMode === "saving" ? "w-1/4 bg-green-500" : 
                    optimizationMode === "balanced" ? "w-1/2 bg-blue-500" : "w-3/4 bg-red-500"
                  )} 
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Velocidade</span>
              <div className="w-32 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full",
                    optimizationMode === "saving" ? "w-1/3 bg-green-500" : 
                    optimizationMode === "balanced" ? "w-2/3 bg-blue-500" : "w-5/6 bg-red-500"
                  )} 
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Consumo de Dados</span>
              <div className="w-32 bg-gray-200 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full",
                    optimizationMode === "saving" ? "w-1/5 bg-green-500" : 
                    optimizationMode === "balanced" ? "w-2/5 bg-blue-500" : "w-4/5 bg-red-500"
                  )} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          A otimização de bateria ajusta o consumo de recursos para equilibrar performance e duração da bateria.
        </div>
      </div>
      
      <div className="mt-4 text-right text-xs text-gray-500 dark:text-gray-400">by Matheus</div>
    </div>
  );
};

export default BatteryOptimization;
