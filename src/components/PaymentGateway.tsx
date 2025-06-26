
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react";
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

interface PaymentGatewayProps {
  design: DesignData | null;
  config: PoloConfig;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

export const PaymentGateway = ({ design, config, onPaymentComplete, onCancel }: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!formData.email || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.name) {
      toast.error("Por favor, completa todos los campos obligatorios");
      return;
    }

    setIsProcessing(true);
    
    // Simulamos el procesamiento del pago
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success("¡Pago procesado exitosamente!");
      onPaymentComplete();
    } catch (error) {
      toast.error("Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button
              onClick={onCancel}
              variant="ghost"
              className="mb-4 text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl font-light text-slate-900 mb-2">
                Finalizar <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Compra</span>
              </h1>
              <p className="text-lg text-slate-600 font-light">
                Completa tu pedido de forma segura
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Resumen del pedido */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-light text-slate-900">
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {design && (
                    <div className="flex items-center space-x-4 p-4 bg-slate-50/80 rounded-xl">
                      <img
                        src={design.imageUrl}
                        alt="Diseño"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">Polo Personalizado AIrtist</h3>
                        <p className="text-sm text-slate-600">Talla: {config.size}</p>
                        <p className="text-sm text-slate-600 truncate">{design.prompt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">$29.99</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Subtotal:</span>
                      <span>$29.99</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Envío:</span>
                      <span>$4.99</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 mb-4">
                      <span>Impuestos:</span>
                      <span>$2.80</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-slate-900 border-t pt-4">
                      <span>Total:</span>
                      <span>$37.78</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de pago */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-light text-slate-900">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                    Información de Pago
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Pago seguro y encriptado</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Fecha de Vencimiento *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/AA"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">Nombre en la Tarjeta *</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-slate-900 mb-4">Dirección de Envío</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          placeholder="Calle Principal 123"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input
                            id="city"
                            placeholder="Madrid"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">Código Postal</Label>
                          <Input
                            id="zipCode"
                            placeholder="28001"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Procesando Pago...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5" />
                        Pagar $37.78
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Al hacer clic en "Pagar", aceptas nuestros términos y condiciones.
                    Tu información está protegida con encriptación SSL.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
