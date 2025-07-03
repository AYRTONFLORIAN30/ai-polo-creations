
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, Chrome, Github } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulación de login
    setTimeout(() => {
      if (email === "admin@empresa.com" && password === "admin123") {
        onLogin();
      } else {
        setError("Credenciales incorrectas");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    setError("");
    
    // Simulación de OAuth 2.0
    setTimeout(() => {
      console.log(`Iniciando sesión con ${provider}...`);
      onLogin();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
          <CardDescription>
            Inicia sesión para acceder al sistema de gestión de horarios
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* OAuth Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("Google")}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continuar con Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continuar con GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continúa con email
              </span>
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            <p>Credenciales de prueba:</p>
            <p className="font-mono text-xs mt-1">
              admin@empresa.com / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
