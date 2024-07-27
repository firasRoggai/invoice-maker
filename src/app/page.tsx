"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { emptyInvoice } from "~/config/formPage";
import { api } from "~/trpc/react";
import type { InvoiceObjectType } from "~/types";
import { InvoiceObject } from "~/types";
import FormPage from "../components/FormPage";
import SideMenu from "../components/SideMenu";

export default function HomePage() {

  const form = useForm<InvoiceObjectType>({
    resolver: zodResolver(InvoiceObject),
    defaultValues: emptyInvoice
  });

  const { mutate: createInvoice } = api.invoice.create.useMutation()

  const onSubmit: SubmitHandler<InvoiceObjectType> = async (data) => {
    createInvoice(data)
  };

  form.watch("currency")

  return (
    <main>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-12 lg:flex gap-2">
            <FormPage form={form} />
            <SideMenu form={form} />
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
