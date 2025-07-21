import React from 'react';
import { EquipmentList } from './EquipmentList';
import { Equipment } from '@/types/customer';

interface EquipmentManagerProps {
  equipmentType: Equipment['type'];
  userId: string;
  customerId: string;
  initialEquipment?: Equipment[];
}

// This could be a server component that fetches initial data
export function EquipmentManager({
  equipmentType,
  userId,
  customerId,
  initialEquipment = [],
}: EquipmentManagerProps) {
  // In a real application, you might fetch data here with server actions
  // For now, we'll pass the initial data to the client component
  
  return (
    <EquipmentManagerClient
      equipmentType={equipmentType}
      userId={userId}
      customerId={customerId}
      initialEquipment={initialEquipment}
    />
  );
}



import { useState } from 'react';

interface EquipmentManagerClientProps {
  equipmentType: Equipment['type'];
  userId: string;
  customerId: string;
  initialEquipment: Equipment[];
}

function EquipmentManagerClient({
  equipmentType,
  userId,
  customerId,
  initialEquipment,
}: EquipmentManagerClientProps) {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);

  const handleEquipmentUpdate = (updatedEquipment: Equipment[]) => {
    setEquipment(updatedEquipment);
    // Here you could also sync with your backend/database
    // await updateEquipmentInDatabase(updatedEquipment);
  };

  return (
    <EquipmentList
      equipmentType={equipmentType}
      userId={userId}
      customerId={customerId}
      equipment={equipment}
      onEquipmentUpdate={handleEquipmentUpdate}
    />
  );
}