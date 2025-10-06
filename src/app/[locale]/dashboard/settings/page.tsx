'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  // Mock data for now
  const user = {
    name: 'Admin User',
    email: 'admin@constru.master',
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Ajustes de Perfil</CardTitle>
          <CardDescription>Gestiona la información de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email} />
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Contraseña</CardTitle>
          <CardDescription>Cambia tu contraseña.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña Actual</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <Input id="new-password" type="password" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Cambiar Contraseña</Button>
        </CardContent>
      </Card>
    </div>
  );
}
