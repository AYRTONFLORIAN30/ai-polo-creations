
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface DesignGeneratorProps {
  onDesignGenerated: (design: { imageUrl: string; prompt: string }) => void;
}

export const DesignGenerator = ({ onDesignGenerated }: DesignGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const promptSuggestions = [
    "Un dragón minimalista en estilo japonés",
    "Patrón geométrico colorido abstracto",
    "Lobo aullando bajo la luna llena",
    "Flores tropicales vibrantes",
    "Mandala simétrico en colores pastel",
    "Montañas con aurora boreal",
    "Patrón de ondas oceánicas",
    "Calavera mexicana decorativa"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, escribe una descripción para tu diseño");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulamos la generación de la imagen por ahora
      // En una implementación real, aquí se haría la llamada a la API de IA
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Imagen de ejemplo (en producción sería la imagen generada por IA)
      const mockImageUrl = "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop";
      
      onDesignGenerated({
        imageUrl: mockImageUrl,
        prompt: prompt.trim()
      });
      
      toast.success("¡Diseño generado exitosamente!");
    } catch (error) {
      toast.error("Error al generar el diseño. Inténtalo de nuevo.");
      console.error("Error generating design:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
          <Palette className="h-6 w-6 text-purple-500" />
          Generador de Diseños IA
        </CardTitle>
        <p className="text-gray-600">
          Describe tu diseño ideal y la IA lo creará para ti
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe tu diseño
          </label>
          <Textarea
            placeholder="Ej: Un águila majestuosa volando sobre montañas al atardecer con colores cálidos..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            Sugerencias rápidas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="text-left p-3 text-sm bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-purple-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Generando diseño...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Generar Diseño
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
