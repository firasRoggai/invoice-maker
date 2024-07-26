"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { emptyInvoice } from "~/config/formPage";
import { api } from "~/trpc/react";
import type { InvoiceObjectType } from "~/types";
import { InvoiceObject } from "~/types";
import FormPage from "./_components/FormPage";
import SideMenu from "./_components/SideMenu";
import { PDFDownloadLink } from "@joshuajaco/react-pdf-renderer-bundled";
import InvoiceDocument from "./_components/InvoiceDocument";
import { useState } from "react";

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
