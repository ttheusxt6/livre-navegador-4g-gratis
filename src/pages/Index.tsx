
import React, { useState, useEffect } from "react";
import ConnectionButton from "@/components/ConnectionButton";
import ServerList, { Server } from "@/components/ServerList";
import ConnectionStats from "@/components/ConnectionStats";
import Header from "@/components/Header";

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

  const toggleConnection = () => {
    if (isConnected) {
      // Desconectando
      setIsConnected(false);
      setConnectionStartTime(null);
      setDownloadSpeed("0 KB/s");
      setUploadSpeed("0 KB/s");
      setSignalStrength(0);
      return;
    }

    // Conectando
    if (!selectedServer) {
      alert("Por favor, selecione um servidor antes de conectar.");
      return;
    }

    setIsConnecting(true);

    // Simulação de conexão
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setConnectionStartTime(new Date());
      setSignalStrength(85);
      
      // Simulando velocidades variadas
      const updateSpeeds = () => {
        if (!isConnected) return;
        
        const downloadAmount = Math.floor(Math.random() * 500) + 100;
        const uploadAmount = Math.floor(Math.random() * 200) + 50;
        
        setDownloadSpeed(`${downloadAmount} KB/s`);
        setUploadSpeed(`${uploadAmount} KB/s`);
        
        const newSignal = Math.max(65, Math.min(95, signalStrength + Math.floor(Math.random() * 11) - 5));
        setSignalStrength(newSignal);
      };
      
      // Atualiza velocidades a cada 3 segundos
      const speedInterval = setInterval(updateSpeeds, 3000);
      updateSpeeds();
      
      return () => clearInterval(speedInterval);
    }, 2000);
  };

  const selectServer = (serverId: string) => {
    setSelectedServer(serverId);
  };

  const downloadServer = (serverId: string) => {
    // Simula download do arquivo de configuração
    const updatedServers = servers.map(server => 
      server.id === serverId ? { ...server, isDownloaded: true } : server
    );
    setServers(updatedServers);
    setSelectedServer(serverId);
  };

  // Atualiza o tempo de conexão
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
    };
  }, [isConnected, connectionStartTime]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        userName="Usuário"
        onOpenMenu={() => {}}
        onOpenSettings={() => {}}
        onOpenProfile={() => {}}
      />
      
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Navegador 4G Grátis
          </h1>
          <p className="text-center text-gray-600 mt-1">
            Conecte-se à internet gratuitamente através da sua rede 4G
          </p>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center mb-8">
          <div className={`mb-4 transition-all duration-300 ${isConnected ? 'scale-110' : ''}`}>
            <ConnectionButton
              isConnected={isConnected}
              isConnecting={isConnecting}
              onClick={toggleConnection}
            />
          </div>
          
          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">
              {isConnected 
                ? "Você está conectado e navegando gratuitamente" 
                : "Clique para conectar à internet grátis"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
      <footer className="bg-white border-t border-gray-200 py-3 px-4">
        <p className="text-center text-sm text-gray-500">
          4G Livre Navegador © {new Date().getFullYear()} - Use para fins educacionais
        </p>
      </footer>
    </div>
  );
};

export default Index;
