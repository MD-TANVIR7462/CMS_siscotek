"use client";

import React from "react";
import Link from "next/link";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Eye, Phone, Mail, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export function CustomerTable({ customers, onEdit, onDelete }: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">No customers found</p>
        </CardContent>
      </Card>
    );
  }
  const router = useRouter();
  return (
    <div className="space-y-4">
      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-4">
        {customers.map((customer) => (
          <Card key={customer?._id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge variant={customer.isActive ? "default" : "secondary"}>
                  {customer.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {customer.city}, {customer.state} {customer.zip}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.telephone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{customer?.email[0]}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link href={`/customers/${customer?._id}`}>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => onEdit(customer)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(customer?._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer?._id} onClick={() => router.push(`/customers/${customer._id}`)} className="cursor-pointer">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.taxId && `Tax ID: ${customer.taxId}`}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{customer.address}</div>
                    <div className="text-muted-foreground">
                      {customer.city}, {customer.state} {customer.zip}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{customer.telephone}</div>
                    <div className="text-muted-foreground">{customer?.email[0]}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={customer.isActive ? "default" : "secondary"}>
                    {customer.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(customer?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(customer);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(customer?._id);
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
