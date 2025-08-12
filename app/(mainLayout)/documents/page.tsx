"use client"

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocumentsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
            <p className="text-muted-foreground mt-2">
              Manage your documents and files
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Documents Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Documents functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}