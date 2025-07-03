
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { ImportedSchedule, Schedule } from "@/pages/Admin";

interface ScheduleImportProps {
  onImport: (importData: ImportedSchedule) => void;
}

export const ScheduleImport = ({ onImport }: ScheduleImportProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const parseCSVContent = (content: string): { schedules: Schedule[], errors: string[] } => {
    const lines = content.split('\n').filter(line => line.trim());
    const schedules: Schedule[] = [];
    const errors: string[] = [];

    // Asumiendo formato CSV: userId,date,startTime,endTime,activity,status
    for (let i = 1; i < lines.length; i++) { // Skip header
      const columns = lines[i].split(',').map(col => col.trim());
      
      if (columns.length !== 6) {
        errors.push(`Línea ${i + 1}: Formato incorrecto - se esperan 6 columnas`);
        continue;
      }

      const [userId, date, startTime, endTime, activity, status] = columns;
      
      if (!userId || !date || !startTime || !endTime || !activity) {
        errors.push(`Línea ${i + 1}: Campos requeridos faltantes`);
        continue;
      }

      if (!['active', 'pending', 'completed'].includes(status)) {
        errors.push(`Línea ${i + 1}: Estado inválido "${status}"`);
        continue;
      }

      schedules.push({
        id: `imported_${Date.now()}_${i}`,
        userId,
        date,
        startTime,
        endTime,
        activity,
        status: status as Schedule["status"]
      });
    }

    return { schedules, errors };
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Por favor selecciona un archivo CSV válido');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Leer contenido del archivo
      const content = await file.text();
      
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Parsear CSV
      const { schedules, errors } = parseCSVContent(content);
      
      setUploadProgress(100);
      
      // Crear objeto de importación
      const importData: ImportedSchedule = {
        id: `import_${Date.now()}`,
        fileName: file.name,
        importDate: new Date().toISOString(),
        totalRecords: schedules.length + errors.length,
        successfulImports: schedules.length,
        errors,
        schedules
      };

      // Callback con datos importados
      onImport(importData);
      
    } catch (error) {
      console.error('Error al procesar archivo:', error);
      alert('Error al procesar el archivo CSV');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSyncDemo = () => {
    // Datos de ejemplo para demostración
    const demoSchedules: Schedule[] = [
      {
        id: "demo_1",
        userId: "1",
        date: "2025-01-10",
        startTime: "08:00",
        endTime: "16:00",
        activity: "Desarrollo Backend",
        status: "active"
      },
      {
        id: "demo_2",
        userId: "2",
        date: "2025-01-10",
        startTime: "09:00",
        endTime: "17:00",
        activity: "Revisión de diseños",
        status: "pending"
      },
      {
        id: "demo_3",
        userId: "3",
        date: "2025-01-10",
        startTime: "10:00",
        endTime: "18:00",
        activity: "Análisis de mercado",
        status: "active"
      }
    ];

    const demoImport: ImportedSchedule = {
      id: `demo_${Date.now()}`,
      fileName: "horarios_demo.csv",
      importDate: new Date().toISOString(),
      totalRecords: 3,
      successfulImports: 3,
      errors: [],
      schedules: demoSchedules
    };

    setIsUploading(true);
    setUploadProgress(0);

    // Simular sincronización
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onImport(demoImport);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sincronizar Horarios</CardTitle>
          <CardDescription>
            Importa horarios desde archivos CSV o sincroniza con sistemas externos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Arrastra tu archivo CSV aquí
            </h3>
            <p className="text-gray-500 mb-4">
              O haz clic para seleccionar un archivo
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              Seleccionar Archivo CSV
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Procesando archivo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          {/* Demo Sync Button */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sincronización de Demostración</h3>
                <p className="text-sm text-gray-500">
                  Importa datos de ejemplo para probar la funcionalidad
                </p>
              </div>
              <Button
                onClick={handleSyncDemo}
                disabled={isUploading}
                variant="outline"
              >
                Sincronizar Datos Demo
              </Button>
            </div>
          </div>

          {/* CSV Format Info */}
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>Formato CSV esperado:</strong><br />
              Columnas: userId, date, startTime, endTime, activity, status<br />
              Estados válidos: active, pending, completed
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};
