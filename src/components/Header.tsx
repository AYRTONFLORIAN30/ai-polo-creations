
import { Palette, Shirt } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Shirt className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-light tracking-tight text-slate-900">
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AIrtist</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 text-slate-600">
              <Palette className="h-5 w-5" />
              <span className="font-light">Diseños únicos con IA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
