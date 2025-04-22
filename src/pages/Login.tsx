
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { LogIn, Key, User, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    // Simula a lógica de login (substitua pela lógica real futuramente)
    setTimeout(() => {
      setLoading(false);
      if (email === "matheus@demo.com" && senha === "123456") {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo, Matheus!"
        });
        navigate('/');
      } else {
        setErro("Usuário ou senha incorretos.");
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vpn-blue to-vpn-green dark:from-blue-900 dark:to-green-900 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-xs bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-vpn-blue dark:text-blue-400 hover:underline flex items-center text-sm"
          >
            <ArrowLeft size={16} className="mr-1" /> Voltar
          </button>
        </div>
        <h2 className="text-center text-xl font-bold text-vpn-blue dark:text-blue-300 mb-1">Login</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="font-medium flex gap-1 items-center text-gray-700 dark:text-gray-300">
            <User size={16} /> E-mail
            <Input
              type="email"
              placeholder="Ex: matheus@demo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </label>
          <label className="font-medium flex gap-1 items-center text-gray-700 dark:text-gray-300">
            <Key size={16} /> Senha
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              minLength={6}
              className="mt-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </label>
          {erro && (
            <div className="text-red-500 text-xs mt-1">{erro}</div>
          )}
          <Button
            type="submit"
            className="bg-vpn-blue dark:bg-vpn-blue/80 text-white mt-3 transition disabled:opacity-70 flex gap-2 items-center justify-center"
            disabled={loading}
          >
            <LogIn size={18} /> {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
          dica: matheus@demo.com / 123456
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">by Matheus</div>
      </div>
    </div>
  );
};

export default Login;
