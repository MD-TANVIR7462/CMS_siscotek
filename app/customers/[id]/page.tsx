import { mockCustomers } from "@/lib/mock-data";
import CustomerDetailPage from "./CustomerDetails";

export function generateStaticParams() {
  return mockCustomers.map((customer) => ({
    id: customer.id,
  }));
}

export default function Page() {
  return <CustomerDetailPage />;
}
