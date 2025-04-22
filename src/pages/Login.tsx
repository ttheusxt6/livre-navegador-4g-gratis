
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { LogIn, Key, User } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    // Simula a lógica de login (substitua pela lógica real futuramente)
    setTimeout(() => {
      setLoading(false);
      if (email === "matheus@demo.com" && senha === "123456") {
        alert("Login realizado com sucesso!\nPor Matheus");
        window.location.href = "/";
      } else {
        setErro("Usuário ou senha incorretos.");
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vpn-blue to-vpn-green px-4">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-6 flex flex-col gap-3">
        <ThemeToggle />
        <h2 className="text-center text-xl font-bold text-vpn-blue mb-1">Login</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="font-medium flex gap-1 items-center">
            <User size={16} /> E-mail
            <Input
              type="email"
              placeholder="Ex: matheus@demo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </label>
          <label className="font-medium flex gap-1 items-center">
            <Key size={16} /> Senha
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              minLength={6}
              className="mt-1"
            />
          </label>
          {erro && (
            <div className="text-red-500 text-xs mt-1">{erro}</div>
          )}
          <Button
            type="submit"
            className="bg-vpn-blue text-white mt-3 transition disabled:opacity-70 flex gap-2 items-center justify-center"
            disabled={loading}
          >
            <LogIn size={18} /> {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        <div className="text-xs text-gray-500 text-center mt-3">por Matheus</div>
      </div>
    </div>
  );
};

export default Login;
