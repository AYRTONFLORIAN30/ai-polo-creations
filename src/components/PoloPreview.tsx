
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

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
}

export const PoloPreview = ({ design, config }: PoloPreviewProps) => {
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

  const handleAddToCart = () => {
    if (!design) {
      toast.error("Necesitas generar un diseño primero");
      return;
    }
    toast.success("¡Polo añadido al carrito!");
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
          <Eye className="h-6 w-6 text-purple-500" />
          Vista Previa
        </CardTitle>
        <p className="text-gray-600">
          Así se verá tu polo personalizado
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="relative mx-auto max-w-sm">
          {/* Polo base */}
          <div 
            className="relative w-80 h-96 mx-auto rounded-2xl shadow-xl transition-all duration-500"
            style={{ backgroundColor: config.color }}
          >
            {/* Cuello */}
            <div 
              className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 bg-gray-200 ${getCollarStyle()}`}
            />
            
            {/* Mangas */}
            <div 
              className="absolute top-4 -left-8 w-16 h-24 rounded-l-full"
              style={{ backgroundColor: config.color }}
            />
            <div 
              className="absolute top-4 -right-8 w-16 h-24 rounded-r-full"
              style={{ backgroundColor: config.color }}
            />
            
            {/* Diseño */}
            {design && (
              <div className={`absolute ${getPositionStyles()} w-24 h-24 transition-all duration-500`}>
                <img
                  src={design.imageUrl}
                  alt="Diseño personalizado"
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            
            {/* Placeholder si no hay diseño */}
            {!design && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Eye className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Tu diseño aparecerá aquí
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Talla:</span>
            <span className="text-gray-900">{config.size}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Cuello:</span>
            <span className="text-gray-900">
              {config.collarType === "crew" && "Redondo"}
              {config.collarType === "v-neck" && "En V"}
              {config.collarType === "polo" && "Polo"}
              {config.collarType === "high" && "Alto"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Posición:</span>
            <span className="text-gray-900">
              {config.designPosition === "center" && "Centro"}
              {config.designPosition === "top-left" && "Superior Izq."}
              {config.designPosition === "top-right" && "Superior Der."}
              {config.designPosition === "bottom-center" && "Inferior Centro"}
            </span>
          </div>
          {design && (
            <div className="pt-2 border-t">
              <span className="font-medium text-gray-700">Diseño:</span>
              <p className="text-sm text-gray-600 mt-1">{design.prompt}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-900">$29.99</span>
            <span className="text-gray-500 ml-2">USD</span>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Añadir al Carrito
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
