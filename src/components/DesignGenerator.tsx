
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
    <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-light text-slate-900">
          <Palette className="h-8 w-8 text-blue-600" />
          Generador de Diseños IA
        </CardTitle>
        <p className="text-lg text-slate-600 font-light mt-2">
          Describe tu diseño ideal y la IA lo creará para ti
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div>
          <label className="block text-base font-medium text-slate-700 mb-4">
            Describe tu diseño
          </label>
          <Textarea
            placeholder="Ej: Un águila majestuosa volando sobre montañas al atardecer con colores cálidos..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[140px] resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400 text-base"
          />
        </div>

        <div>
          <p className="text-base font-medium text-slate-700 mb-4">
            Sugerencias rápidas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promptSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="text-left p-4 text-sm bg-slate-50 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-slate-200 hover:border-blue-300 hover:shadow-md"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
        >
          {isGenerating ? (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Generando diseño...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              Generar Diseño
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
