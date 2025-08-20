"use client"

import React from 'react';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinancePage() {
  return (
    <div className="flex min-h-screen bg-background">
      
      <main className="flex-1  p-4 lg:p-8">
        <div className=" mx-auto">
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
            <p className="text-muted-foreground mt-2">
              Manage your financial data and reports
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Finance Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Finance functionality will be implemented here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}