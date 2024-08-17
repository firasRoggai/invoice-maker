"use client"

import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { sync } from "~/actions/sync";
import FormPage from "~/components/FormPage";
import SideMenu from "~/components/SideMenu";
import { useToast } from "~/components/ui/use-toast";
import { emptyInvoice } from "~/config/formPage";
import { api } from "~/trpc/react";
import type { InvoiceObjectType } from "~/types/types";
import { InvoiceObject } from "~/types/types";

export default function HomePage() {

  const form = useForm<InvoiceObjectType>({
    resolver: zodResolver(InvoiceObject),
    defaultValues: emptyInvoice
  });

  const { mutate: createInvoice } = api.invoice.create.useMutation()

  const [templateId, setTemplateId] = useState<null | number>(null);
  const { toast } = useToast()
  const searchParams = useSearchParams();

  // Extract templateId from search params and set it in state
  useEffect(() => {
    const id = searchParams.get("templateId");
    if (id) {
      setTemplateId(Number(id));
    }
  }, [searchParams]);

  // useQuery to get the template only when templateId is available
  const { data, isSuccess } = api.invoice.getTemplateById.useQuery({ templateId: templateId as number },
    {
      enabled: !!templateId, // Only run this query if templateId is not null
    }
  );

  // Handle form reset when data is successfully fetched
  useEffect(() => {
    if (isSuccess && data) {
      const invoice = data.invoiceData as unknown as InvoiceObjectType;
      form.reset(
        {
          ...invoice,
          due_date: new Date(invoice.due_date as unknown as string),
          date: new Date(invoice.date as unknown as string)
        },
        {
          keepIsValid: true
        }
      );
    }
  }, [isSuccess, data, form]);



  useEffect(() => {
    sync("invoice")
  }, [])






  const onSubmit: SubmitHandler<InvoiceObjectType> = async (data) => {
    createInvoice({
      from: data.from,
      to: data.to,
      balance_due: data.balance,
      currency: data.currency.value,
      invoiceData: data,
    }, {
      onSuccess: () => {
        toast({
          title: "You made aa invoice!",
          description: `Your invoice was added successfully.`,
        })
      }
    })
  };

  form.watch()

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
