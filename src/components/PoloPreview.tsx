import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";

interface DesignData {
  imageUrl: string;
  prompt: string;
}

interface PoloConfig {
  color: string;
  collarType: string;
  designPosition: string;
  size: string;
}

interface PoloPreviewProps {
  design: DesignData | null;
  config: PoloConfig;
  onAddToCart: () => void;
}

export const PoloPreview = ({ design, config, onAddToCart }: PoloPreviewProps) => {
  const getPositionStyles = () => {
    switch (config.designPosition) {
      case "top-left":
        return "top-16 left-8";
      case "top-right":
        return "top-16 right-8";
      case "bottom-center":
        return "bottom-8 left-1/2 transform -translate-x-1/2";
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  const getCollarStyle = () => {
    switch (config.collarType) {
      case "v-neck":
        return "rounded-b-full h-8";
      case "polo":
        return "rounded-b-lg h-6";
      case "high":
        return "rounded-b-sm h-12";
      default:
        return "rounded-b-lg h-4";
    }
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-light text-slate-900">
          <Eye className="h-8 w-8 text-blue-600" />
          Vista Previa
        </CardTitle>
        <p className="text-lg text-slate-600 font-light mt-2">
          Así se verá tu polo personalizado
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="relative mx-auto max-w-sm">
          {/* Polo base */}
          <div 
            className="relative w-80 h-96 mx-auto rounded-3xl shadow-2xl transition-all duration-500 border border-slate-200/50"
            style={{ backgroundColor: config.color }}
          >
            {/* Cuello */}
            <div 
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 bg-slate-200 ${getCollarStyle()}`}
            />
            
            {/* Mangas */}
            <div 
              className="absolute top-4 -left-8 w-16 h-24 rounded-l-full border border-slate-200/50"
              style={{ backgroundColor: config.color }}
            />
            <div 
              className="absolute top-4 -right-8 w-16 h-24 rounded-r-full border border-slate-200/50"
              style={{ backgroundColor: config.color }}
            />
            
            {/* Diseño */}
            {design && (
              <div className={`absolute ${getPositionStyles()} w-24 h-24 transition-all duration-500`}>
                <img
                  src={design.imageUrl}
                  alt="Diseño personalizado"
                  className="w-full h-full object-cover rounded-2xl shadow-lg border border-white/50"
                />
              </div>
            )}
            
            {/* Placeholder si no hay diseño */}
            {!design && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Eye className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-light">
                    Tu diseño aparecerá aquí
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="bg-slate-50/80 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Talla:</span>
            <span className="text-slate-900 font-semibold">{config.size}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Cuello:</span>
            <span className="text-slate-900 font-semibold">
              {config.collarType === "crew" && "Redondo"}
              {config.collarType === "v-neck" && "En V"}
              {config.collarType === "polo" && "Polo"}
              {config.collarType === "high" && "Alto"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-700">Posición:</span>
            <span className="text-slate-900 font-semibold">
              {config.designPosition === "center" && "Centro"}
              {config.designPosition === "top-left" && "Superior Izq."}
              {config.designPosition === "top-right" && "Superior Der."}
              {config.designPosition === "bottom-center" && "Inferior Centro"}
            </span>
          </div>
          {design && (
            <div className="pt-4 border-t border-slate-200">
              <span className="font-medium text-slate-700">Diseño:</span>
              <p className="text-sm text-slate-600 mt-2 font-light leading-relaxed">{design.prompt}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-light text-slate-900">$29.99</span>
            <span className="text-slate-500 ml-2 text-lg">USD</span>
          </div>
          
          <Button 
            onClick={onAddToCart}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            Añadir al Carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
