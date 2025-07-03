
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ScheduleImport } from "@/components/admin/ScheduleImport";
import { ImportedSchedules } from "@/components/admin/ImportedSchedules";

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  schedules: Schedule[];
}

export interface Schedule {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  activity: string;
  status: "active" | "pending" | "completed";
}

export interface ImportedSchedule {
  id: string;
  fileName: string;
  importDate: string;
  totalRecords: number;
  successfulImports: number;
  errors: string[];
  schedules: Schedule[];
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [importedSchedules, setImportedSchedules] = useState<ImportedSchedule[]>([]);
  const [activeView, setActiveView] = useState<"dashboard" | "import" | "imported">("dashboard");

  // Datos simulados
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Juan Pérez",
        email: "juan@empresa.com",
        department: "Desarrollo",
        schedules: [
          {
            id: "s1",
            userId: "1",
            date: "2025-01-08",
            startTime: "09:00",
            endTime: "17:00",
            activity: "Desarrollo Frontend",
            status: "active"
          },
          {
            id: "s2",
            userId: "1",
            date: "2025-01-09",
            startTime: "09:30",
            endTime: "17:30",
            activity: "Reunión de equipo",
            status: "pending"
          }
        ]
      },
      {
        id: "2",
        name: "María García",
        email: "maria@empresa.com",
        department: "Diseño",
        schedules: [
          {
            id: "s3",
            userId: "2",
            date: "2025-01-08",
            startTime: "08:30",
            endTime: "16:30",
            activity: "Diseño UI/UX",
            status: "completed"
          }
        ]
      },
      {
        id: "3",
        name: "Carlos López",
        email: "carlos@empresa.com",
        department: "Marketing",
        schedules: [
          {
            id: "s4",
            userId: "3",
            date: "2025-01-08",
            startTime: "10:00",
            endTime: "18:00",
            activity: "Campaña publicitaria",
            status: "active"
          }
        ]
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView("dashboard");
  };

  const handleScheduleImport = (importData: ImportedSchedule) => {
    setImportedSchedules(prev => [importData, ...prev]);
    // También actualizar los horarios de los usuarios
    const updatedUsers = users.map(user => {
      const userSchedules = importData.schedules.filter(s => s.userId === user.id);
      if (userSchedules.length > 0) {
        return {
          ...user,
          schedules: [...user.schedules, ...userSchedules]
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setActiveView("imported");
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveView("dashboard")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "dashboard"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveView("import")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "import"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Importar Horarios
                </button>
                <button
                  onClick={() => setActiveView("imported")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeView === "imported"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Horarios Importados
                </button>
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeView === "dashboard" && <AdminDashboard users={users} />}
        {activeView === "import" && <ScheduleImport onImport={handleScheduleImport} />}
        {activeView === "imported" && <ImportedSchedules imports={importedSchedules} />}
      </main>
    </div>
  );
};

export default Admin;
