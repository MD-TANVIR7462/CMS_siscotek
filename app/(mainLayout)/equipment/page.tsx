"use client"

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EquipmentPage() {
  return (
    <div className="flex min-h-screen bg-background">
      
      
      <main className="flex-1  p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">Equipment</h1>
            <p className="text-muted-foreground mt-2">
              Manage your equipment inventory
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Equipment functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}