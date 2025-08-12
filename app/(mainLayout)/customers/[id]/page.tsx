// app/customer/[id]/page.tsx (example)
import { getSingleData } from "@/server/serverActions";
import CustomerDetailPage from "./CustomerDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const customer = await getSingleData("customer/get-customer", id);


  return <CustomerDetailPage customer={customer?.data} />;
}
