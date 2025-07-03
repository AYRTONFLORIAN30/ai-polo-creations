
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calendar, Clock, Activity, Search } from "lucide-react";
import { User, Schedule } from "@/pages/Admin";

interface AdminDashboardProps {
  users: User[];
}

export const AdminDashboard = ({ users }: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSchedules = users.reduce((acc, user) => acc + user.schedules.length, 0);
  const activeSchedules = users.reduce((acc, user) => 
    acc + user.schedules.filter(s => s.status === "active").length, 0
  );

  const getStatusColor = (status: Schedule["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Schedule["status"]) => {
    switch (status) {
      case "active": return "Activo";
      case "pending": return "Pendiente";
      case "completed": return "Completado";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Horarios</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchedules}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horarios Activos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSchedules}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(users.map(u => u.department)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and User List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios Registrados</CardTitle>
            <CardDescription>
              Lista de todos los usuarios con horarios asignados
            </CardDescription>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedUser?.id === user.id ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <Badge variant="secondary" className="mt-1">
                        {user.department}
                      </Badge>
                    </div>
                    <Badge variant="outline">
                      {user.schedules.length} horarios
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Schedules */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedUser ? `Horarios de ${selectedUser.name}` : "Selecciona un usuario"}
            </CardTitle>
            <CardDescription>
              {selectedUser ? "Horarios asignados al usuario seleccionado" : "Haz clic en un usuario para ver sus horarios"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-4">
                {selectedUser.schedules.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Horario</TableHead>
                        <TableHead>Actividad</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedUser.schedules.map((schedule) => (
                        <TableRow key={schedule.id}>
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
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No hay horarios asignados
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Selecciona un usuario para ver sus horarios
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
