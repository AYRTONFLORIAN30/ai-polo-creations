
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
      <Card className="w-full shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center text-gray-500">
            <Shirt className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Primero genera un diseño para personalizar tu polo</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800">
          <Shirt className="h-6 w-6 text-purple-500" />
          Personaliza tu Polo
        </CardTitle>
        <p className="text-gray-600">
          Ajusta todos los detalles de tu polo personalizado
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Color del Polo</h3>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => onConfigChange({ color: color.value })}
                className={`w-full h-12 rounded-lg transition-all duration-200 ${
                  config.color === color.value
                    ? "ring-2 ring-purple-500 ring-offset-2 scale-105"
                    : "hover:scale-105"
                } ${color.border ? "border-2 border-gray-200" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Tipo de Cuello</h3>
          <div className="grid grid-cols-2 gap-3">
            {collarTypes.map((collar) => (
              <Button
                key={collar.value}
                variant={config.collarType === collar.value ? "default" : "outline"}
                onClick={() => onConfigChange({ collarType: collar.value })}
                className={`${
                  config.collarType === collar.value
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {collar.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Posición del Diseño</h3>
          <div className="grid grid-cols-2 gap-3">
            {designPositions.map((position) => (
              <Button
                key={position.value}
                variant={config.designPosition === position.value ? "default" : "outline"}
                onClick={() => onConfigChange({ designPosition: position.value })}
                className={`${
                  config.designPosition === position.value
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {position.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Talla</h3>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <Button
                key={size.value}
                variant={config.size === size.value ? "default" : "outline"}
                onClick={() => onConfigChange({ size: size.value })}
                className={`${
                  config.size === size.value
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    : "border-gray-200 hover:border-purple-300"
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
