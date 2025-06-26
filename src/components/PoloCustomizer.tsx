
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";

interface PoloConfig {
  color: string;
  collarType: string;
  designPosition: string;
  size: string;
}

interface PoloCustomizerProps {
  config: PoloConfig;
  onConfigChange: (newConfig: Partial<PoloConfig>) => void;
  hasDesign: boolean;
}

export const PoloCustomizer = ({ config, onConfigChange, hasDesign }: PoloCustomizerProps) => {
  const colors = [
    { name: "Blanco", value: "#ffffff", border: true },
    { name: "Negro", value: "#000000" },
    { name: "Azul Marino", value: "#1e3a8a" },
    { name: "Rojo", value: "#dc2626" },
    { name: "Verde", value: "#16a34a" },
    { name: "Morado", value: "#9333ea" },
    { name: "Rosa", value: "#ec4899" },
    { name: "Gris", value: "#6b7280" },
  ];

  const collarTypes = [
    { name: "Cuello Redondo", value: "crew" },
    { name: "Cuello en V", value: "v-neck" },
    { name: "Cuello Polo", value: "polo" },
    { name: "Cuello Alto", value: "high" },
  ];

  const designPositions = [
    { name: "Centro", value: "center" },
    { name: "Superior Izquierdo", value: "top-left" },
    { name: "Superior Derecho", value: "top-right" },
    { name: "Inferior Centro", value: "bottom-center" },
  ];

  const sizes = [
    { name: "XS", value: "XS" },
    { name: "S", value: "S" },
    { name: "M", value: "M" },
    { name: "L", value: "L" },
    { name: "XL", value: "XL" },
    { name: "XXL", value: "XXL" },
  ];

  if (!hasDesign) {
    return (
      <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center text-slate-500">
            <Shirt className="h-16 w-16 mx-auto mb-6 opacity-40" />
            <p className="text-xl font-light">Primero genera un diseño para personalizar tu polo</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="flex items-center justify-center gap-3 text-3xl font-light text-slate-900">
          <Shirt className="h-8 w-8 text-blue-600" />
          Personaliza tu Polo
        </CardTitle>
        <p className="text-lg text-slate-600 font-light mt-2">
          Ajusta todos los detalles de tu polo personalizado
        </p>
      </CardHeader>
      
      <CardContent className="space-y-10">
        <div>
          <h3 className="text-xl font-medium text-slate-800 mb-6">Color del Polo</h3>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => onConfigChange({ color: color.value })}
                className={`w-full h-16 rounded-2xl transition-all duration-300 ${
                  config.color === color.value
                    ? "ring-4 ring-blue-500 ring-offset-2 scale-105 shadow-lg"
                    : "hover:scale-105 hover:shadow-md"
                } ${color.border ? "border-2 border-slate-200" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-slate-800 mb-6">Tipo de Cuello</h3>
          <div className="grid grid-cols-2 gap-4">
            {collarTypes.map((collar) => (
              <Button
                key={collar.value}
                variant={config.collarType === collar.value ? "default" : "outline"}
                onClick={() => onConfigChange({ collarType: collar.value })}
                className={`py-4 text-base ${
                  config.collarType === collar.value
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {collar.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-slate-800 mb-6">Posición del Diseño</h3>
          <div className="grid grid-cols-2 gap-4">
            {designPositions.map((position) => (
              <Button
                key={position.value}
                variant={config.designPosition === position.value ? "default" : "outline"}
                onClick={() => onConfigChange({ designPosition: position.value })}
                className={`py-4 text-base ${
                  config.designPosition === position.value
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {position.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium text-slate-800 mb-6">Talla</h3>
          <div className="grid grid-cols-3 gap-4">
            {sizes.map((size) => (
              <Button
                key={size.value}
                variant={config.size === size.value ? "default" : "outline"}
                onClick={() => onConfigChange({ size: size.value })}
                className={`py-4 text-base font-medium ${
                  config.size === size.value
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
