
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, CheckCircle, AlertCircle, Calendar, Download } from "lucide-react";
import { ImportedSchedule } from "@/pages/Admin";

interface ImportedSchedulesProps {
  imports: ImportedSchedule[];
}

export const ImportedSchedules = ({ imports }: ImportedSchedulesProps) => {
  const [selectedImport, setSelectedImport] = useState<ImportedSchedule | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activo";
      case "pending": return "Pendiente";
      case "completed": return "Completado";
      default: return status;
    }
  };

  const downloadImportReport = (importData: ImportedSchedule) => {
    const report = {
      fileName: importData.fileName,
      importDate: importData.importDate,
      summary: {
        totalRecords: importData.totalRecords,
        successful: importData.successfulImports,
        errors: importData.errors.length
      },
      schedules: importData.schedules,
      errors: importData.errors
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_${importData.fileName}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (imports.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay horarios importados
          </h3>
          <p className="text-gray-500">
            Los horarios que importes aparecerán aquí
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Importaciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imports.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registros Importados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {imports.reduce((acc, imp) => acc + imp.successfulImports, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errores Totales</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {imports.reduce((acc, imp) => acc + imp.errors.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Importaciones</CardTitle>
            <CardDescription>
              Lista de todas las importaciones realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {imports.map((importData) => (
                <div
                  key={importData.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedImport?.id === importData.id ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedImport(importData)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{importData.fileName}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(importData.importDate)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImportReport(importData);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 text-sm">
                    <Badge variant="secondary">
                      {importData.totalRecords} registros
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      {importData.successfulImports} exitosos
                    </Badge>
                    {importData.errors.length > 0 && (
                      <Badge className="bg-red-100 text-red-800">
                        {importData.errors.length} errores
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Import Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedImport ? "Detalles de Importación" : "Selecciona una importación"}
            </CardTitle>
            <CardDescription>
              {selectedImport ? "Horarios y errores de la importación seleccionada" : "Haz clic en una importación para ver los detalles"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedImport ? (
              <div className="space-y-6">
                {/* Errors */}
                {selectedImport.errors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Errores encontrados:</strong>
                      <ul className="mt-2 list-disc list-inside">
                        {selectedImport.errors.map((error, index) => (
                          <li key={index} className="text-sm">{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Imported Schedules */}
                {selectedImport.schedules.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Horarios Importados</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Horario</TableHead>
                          <TableHead>Actividad</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedImport.schedules.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>{schedule.userId}</TableCell>
                            <TableCell>{schedule.date}</TableCell>
                            <TableCell>
                              {schedule.startTime} - {schedule.endTime}
                            </TableCell>
                            <TableCell>{schedule.activity}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(schedule.status)}>
                                {getStatusText(schedule.status)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Selecciona una importación para ver los detalles
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
