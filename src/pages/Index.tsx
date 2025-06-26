
import { useState } from "react";
import { Header } from "@/components/Header";
import { DesignGenerator } from "@/components/DesignGenerator";
import { PoloCustomizer } from "@/components/PoloCustomizer";
import { PoloPreview } from "@/components/PoloPreview";
import { toast } from "sonner";

export interface DesignData {
  imageUrl: string;
  prompt: string;
}

export interface PoloConfig {
  color: string;
  collarType: string;
  designPosition: string;
  size: string;
}

const Index = () => {
  const [currentDesign, setCurrentDesign] = useState<DesignData | null>(null);
  const [poloConfig, setPoloConfig] = useState<PoloConfig>({
    color: "#ffffff",
    collarType: "crew",
    designPosition: "center",
    size: "M"
  });
  const [activeTab, setActiveTab] = useState<"design" | "customize">("design");

  const handleDesignGenerated = (design: DesignData) => {
    setCurrentDesign(design);
    toast.success("¡Diseño generado exitosamente!");
    setActiveTab("customize");
  };

  const handleConfigChange = (newConfig: Partial<PoloConfig>) => {
    setPoloConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Polo Creations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crea polos únicos con diseños generados por inteligencia artificial. 
            Personaliza cada detalle y da vida a tu creatividad.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab("design")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "design"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Generar Diseño
            </button>
            <button
              onClick={() => setActiveTab("customize")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "customize"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Personalizar Polo
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-6">
            {activeTab === "design" && (
              <DesignGenerator onDesignGenerated={handleDesignGenerated} />
            )}
            
            {activeTab === "customize" && (
              <PoloCustomizer 
                config={poloConfig}
                onConfigChange={handleConfigChange}
                hasDesign={!!currentDesign}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-8">
            <PoloPreview 
              design={currentDesign}
              config={poloConfig}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
