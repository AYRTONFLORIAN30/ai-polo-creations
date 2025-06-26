
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 mb-6">
            AI Polo <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Creations</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Diseña polos únicos con la potencia de la inteligencia artificial. 
            Personaliza cada detalle y transforma tus ideas en realidad.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
            <button
              onClick={() => setActiveTab("design")}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "design"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              Generar Diseño
            </button>
            <button
              onClick={() => setActiveTab("customize")}
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "customize"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              Personalizar Polo
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-8">
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
