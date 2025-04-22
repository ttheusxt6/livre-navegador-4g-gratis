
import React, { useState, useEffect, useRef } from "react";
import ConnectionButton from "@/components/ConnectionButton";
import ServerList, { Server } from "@/components/ServerList";
import ConnectionStats from "@/components/ConnectionStats";
import Header from "@/components/Header";
import AdvancedOptions from "@/components/AdvancedOptions";
import ConnectionGuide from "@/components/ConnectionGuide";
import { toast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const dummyServers: Server[] = [
  {
    id: "vivo-direct",
    name: "Vivo Direct",
    description: "Conexão direta com servidor Vivo",
    speed: "Rápido",
    ping: 45,
    isAvailable: true,
    isDownloaded: true,
  },
  {
    id: "claro-tunnel",
    name: "Claro Tunnel",
    description: "Túnel seguro para Claro",
    speed: "Médio",
    ping: 78,
    isAvailable: true,
    isDownloaded: false,
  },
  {
    id: "tim-custom",
    name: "Tim Fast",
    description: "Otimizado para chip Tim",
    speed: "Ultra rápido",
    ping: 32,
    isAvailable: true,
    isDownloaded: false,
  },
  {
    id: "oi-connect",
    name: "Oi Connect",
    description: "Conexão tradicional para Oi",
    speed: "Estável",
    ping: 95,
    isAvailable: false,
    isDownloaded: false,
  },
];

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>("vivo-direct");
  const [connectionTime, setConnectionTime] = useState("00:00:00");
  const [downloadSpeed, setDownloadSpeed] = useState("0 KB/s");
  const [uploadSpeed, setUploadSpeed] = useState("0 KB/s");
  const [signalStrength, setSignalStrength] = useState(0);
  const [servers, setServers] = useState<Server[]>(dummyServers);
  const [connectionStartTime, setConnectionStartTime] = useState<Date | null>(null);
  const [mode, setMode] = useState<"funcional" | "avancado" | "guia">("funcional");
  const [advancedConfig, setAdvancedConfig] = useState<any>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const speedIntervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      setConnectionStartTime(null);
      setDownloadSpeed("0 KB/s");
      setUploadSpeed("0 KB/s");
      setSignalStrength(0);
      
      // Clear the interval when disconnecting
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
        speedIntervalRef.current = null;
      }
      
      toast({ 
        title: "Desconectado", 
        description: "Sua conexão foi encerrada." 
      });
      return;
    }

    if (!selectedServer) {
      toast({ 
        title: "Erro de conexão", 
        description: "Por favor, selecione um servidor antes de conectar." 
      });
      return;
    }

    setIsConnecting(true);

    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionStartTime(new Date());
      setSignalStrength(85);
      
      const updateSpeeds = () => {
        if (!isConnected) return;
        const downloadAmount = Math.floor(Math.random() * 500) + 100;
        const uploadAmount = Math.floor(Math.random() * 200) + 50;
        setDownloadSpeed(`${downloadAmount} KB/s`);
        setUploadSpeed(`${uploadAmount} KB/s`);
        const newSignal = Math.max(65, Math.min(95, signalStrength + Math.floor(Math.random() * 11) - 5));
        setSignalStrength(newSignal);
      };
      
      // Store the interval ID to clear it later
      speedIntervalRef.current = window.setInterval(updateSpeeds, 3000);
      updateSpeeds();
      
      toast({ 
        title: "Conectado!", 
        description: "Você está conectado e navegando gratuitamente."
      });
    }, 2000);
  };

  const selectServer = (serverId: string) => {
    setSelectedServer(serverId);
    const server = servers.find(s => s.id === serverId);
    if (server) {
      toast({ 
        description: `Servidor "${server.name}" selecionado.`
      });
    }
  };

  const downloadServer = (serverId: string) => {
    const updatedServers = servers.map(server => 
      server.id === serverId ? { ...server, isDownloaded: true } : server
    );
    setServers(updatedServers);
    setSelectedServer(serverId);
    const server = servers.find(s => s.id === serverId);
    if (server) {
      toast({ 
        title: "Download concluído", 
        description: `Configuração para "${server.name}" baixada com sucesso.`
      });
    }
  };

  useEffect(() => {
    let interval: number | null = null;
    if (isConnected && connectionStartTime) {
      interval = window.setInterval(() => {
        const now = new Date();
        const diffMs = now.getTime() - connectionStartTime.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        setConnectionTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }, 1000);
    } else {
      setConnectionTime("00:00:00");
    }
    return () => {
      if (interval) clearInterval(interval);
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
        speedIntervalRef.current = null;
      }
    };
  }, [isConnected, connectionStartTime]);

  const handleImportTunnel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({ description: "Nenhum arquivo selecionado." });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileContent = reader.result as string;
        let config;
        
        if (file.name.endsWith('.json')) {
          config = JSON.parse(fileContent);
          
          // Add the file to servers list if it has required fields
          if (config.serverName) {
            const newServer = {
              id: `custom-${Date.now()}`,
              name: config.serverName,
              description: config.author || "by Matheus",
              speed: config.type === "http" ? "Rápido" : "Médio",
              ping: Math.floor(Math.random() * 50) + 30,
              isAvailable: true,
              isDownloaded: true,
            };
            
            setServers(prev => [...prev, newServer]);
            setSelectedServer(newServer.id);
            setAdvancedConfig(config);
          }
        }
        
        toast({ 
          title: "Arquivo importado!", 
          description: `Arquivo "${file.name}" carregado com sucesso.` 
        });
      } catch (error) {
        toast({ 
          title: "Erro ao importar", 
          description: "O formato do arquivo não é válido." 
        });
      }
    };
    reader.onerror = () => {
      toast({ 
        title: "Erro ao importar", 
        description: "Ocorreu um erro ao ler o arquivo." 
      });
    };
    reader.readAsText(file);
    
    // Reset the input value to allow importing the same file again
    e.target.value = "";
  };

  const handleExportTunnel = () => {
    const selectedServerData = servers.find(s => s.id === selectedServer);
    const data = JSON.stringify({
      serverName: selectedServerData?.name || "Servidor personalizado",
      type: advancedConfig?.tunnelType || "http",
      host: "4g-livre.exemplo.com",
      port: advancedConfig?.customPort || 8080,
      payload: advancedConfig?.payload || "",
      author: "by Matheus"
    }, null, 2);
    
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tunel-4g-${selectedServerData?.name || "config"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
    
    toast({ 
      title: "Arquivo exportado!", 
      description: "Suas configurações foram exportadas." 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="absolute top-2 right-2 z-10">
        <ThemeToggle />
      </div>
      <Header 
        userName="Usuário"
        onOpenMenu={() => {}}
        onOpenSettings={() => {}}
        onOpenProfile={() => {}}
      />
      <div className="flex justify-end pr-2 pt-3">
        <a
          href="/login"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
          className="text-xs px-3 py-1 rounded-full bg-vpn-blue dark:bg-vpn-blue/80 text-white font-medium shadow hover:bg-blue-900 transition"
        >
          Login
        </a>
      </div>
      <div className="flex-1 container mx-auto px-2 py-4 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Navegador 4G Grátis
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Conecte-se à internet gratuitamente através da sua rede 4G
          </p>
        </div>
        <div className="flex justify-center mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-l font-semibold border transition-colors text-xs sm:text-base ${
              mode === "funcional"
                ? "bg-vpn-blue text-white border-vpn-blue dark:bg-vpn-blue/80"
                : "bg-white text-vpn-blue border-gray-300 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
            onClick={() => setMode("funcional")}
            type="button"
          >
            Servidores funcionais
          </button>
          <button
            className={`px-4 py-2 font-semibold border transition-colors text-xs sm:text-base ${
              mode === "avancado"
                ? "bg-vpn-connected text-white border-vpn-connected dark:bg-vpn-connected/80"
                : "bg-white text-vpn-connected border-gray-300 hover:bg-green-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
            onClick={() => setMode("avancado")}
            type="button"
          >
            Avançado
          </button>
          <button
            className={`px-4 py-2 rounded-r font-semibold border transition-colors text-xs sm:text-base ${
              mode === "guia"
                ? "bg-vpn-blue text-white border-vpn-blue dark:bg-vpn-blue/80"
                : "bg-white text-vpn-blue border-gray-300 hover:bg-blue-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
            onClick={() => setMode("guia")}
            type="button"
          >
            Como conectar
          </button>
        </div>
        {mode === "funcional" ? (
          <div
            className="flex-1 flex flex-col items-center justify-center mb-8"
          >
            <div className={`mb-4 transition-all duration-300 ${isConnected ? 'scale-110' : ''}`}>
              <ConnectionButton
                isConnected={isConnected}
                isConnecting={isConnecting}
                onClick={toggleConnection}
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {isConnected 
                  ? "Você está conectado e navegando gratuitamente" 
                  : "Clique para conectar à internet grátis"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
              <ServerList
                servers={servers}
                selectedServer={selectedServer}
                onSelectServer={selectServer}
                onDownloadServer={downloadServer}
              />
              <ConnectionStats
                isConnected={isConnected}
                connectionTime={connectionTime}
                downloadSpeed={downloadSpeed}
                uploadSpeed={uploadSpeed}
                signalStrength={signalStrength}
              />
            </div>
          </div>
        ) : mode === "avancado" ? (
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 transition-all duration-300 w-full flex flex-col items-center">
              <ConnectionButton
                isConnected={isConnected}
                isConnecting={isConnecting}
                onClick={toggleConnection}
              />
            </div>
            <div className="text-center mt-2 mb-4">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Use as opções avançadas abaixo para customizar sua conexão (recomendado apenas para usuários experientes).
              </p>
            </div>
            <div className="w-full max-w-lg">
              <div className="flex gap-2 mb-4 flex-col xs:flex-row items-stretch xs:items-center justify-center">
                <button
                  type="button"
                  className="flex-1 bg-vpn-blue dark:bg-vpn-blue/80 text-white px-4 py-2 rounded font-medium text-xs sm:text-base shadow hover:bg-blue-800 transition-colors"
                  onClick={() => importInputRef.current?.click()}
                >
                  Importar arquivo túnel
                </button>
                <input
                  ref={importInputRef}
                  type="file"
                  accept=".json,.ovpn,.conf"
                  className="hidden"
                  onChange={handleImportTunnel}
                />
                <button
                  type="button"
                  className="flex-1 bg-vpn-green dark:bg-vpn-green/80 text-white px-4 py-2 rounded font-medium text-xs sm:text-base shadow hover:bg-green-700 transition-colors"
                  onClick={handleExportTunnel}
                >
                  Exportar arquivo túnel
                </button>
              </div>
              <AdvancedOptions onChange={setAdvancedConfig} />
              <ConnectionStats
                isConnected={isConnected}
                connectionTime={connectionTime}
                downloadSpeed={downloadSpeed}
                uploadSpeed={uploadSpeed}
                signalStrength={signalStrength}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <ConnectionGuide className="mb-6" />
            <div className="flex justify-center">
              <button
                onClick={toggleConnection}
                disabled={isConnecting}
                className={`relative w-24 h-24 rounded-full bg-gradient-to-br shadow-lg ${
                  isConnected ? "from-vpn-connected to-vpn-teal" : "from-vpn-blue to-vpn-lightBlue"
                } flex items-center justify-center text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isConnecting ? "Conectando..." : isConnected ? "Desconectar" : "Conectar"}
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-2 text-xs sm:text-sm">
        <p className="text-center text-gray-500 dark:text-gray-400">
          4G Livre Navegador © {new Date().getFullYear()} - Use para fins educacionais by Matheus
        </p>
      </footer>
    </div>
  );
};

export default Index;
