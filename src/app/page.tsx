"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emptyInvoice } from "~/config/formPage";
import type { InvoiceObjectType } from "~/types";
import { InvoiceObject } from "~/types";
import FormPage from "./_components/FormPage";
import SideMenu from "./_components/SideMenu";

export default function HomePage() {

  const form = useForm<InvoiceObjectType>({
    resolver: zodResolver(InvoiceObject),
    defaultValues: emptyInvoice
  });

  return (
    <main className="p-12 flex gap-2">
      <FormPage form={form} />
      <SideMenu form={form} />
    </main>
  );
}
