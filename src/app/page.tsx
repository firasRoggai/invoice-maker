"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
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
  
  const onSubmit: SubmitHandler<InvoiceObjectType> = (data) => console.log(data);

  return (
    <main className="">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="p-12 lg:flex gap-2">
          <FormPage form={form} />
          <SideMenu form={form} />
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
