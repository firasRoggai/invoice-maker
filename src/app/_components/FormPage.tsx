"use client"

import { FormProvider, } from "react-hook-form"
import type { SubmitHandler, UseFormReturn } from "react-hook-form"

import { Button } from "~/components/ui/button"
import type { InvoiceObjectType } from "~/types"
import CustomForm from "./CustomForm"
import CustomTextArea from "./CustomTextArea"
import ImagePicker from "./ImagePicker"

// date picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ItemsTable from "./ItemsTable"

interface formPageProps {
    form: UseFormReturn<InvoiceObjectType>
}

const FormPage = ({ form }: formPageProps) => {

    // date / due_date values
    const dateValue = form.watch("date");
    const dueDateValue = form.watch("due_date");

    const onSubmit: SubmitHandler<InvoiceObjectType> = (data) => console.log(data);

    console.log(form.watch());

    return (
        <div className="w-[80%] min-h-[100vh] p-5 rounded-md border-2 bg-white border-gray-300">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
                    {/* left side */}
                    <section className="">
                        <ImagePicker />
                        <div className="pt-4 w-[70%]">
                            <CustomForm
                                target="from"
                                className="py-6"
                                placeholder="Who is this invoice from?"
                            />
                        </div>

                        <div className="flex py-5 gap-4">
                            {/* bill to block */}
                            <div className="grid gap-1">
                                <CustomForm
                                    target="to_title"
                                    border="none"
                                    size="sm"
                                    placeholder="Bill To"
                                />

                                <CustomTextArea
                                    target="to"
                                    placeholder="Who is this invoice to? (required)"
                                    className="h-20"
                                />
                            </div>

                            {/* ship to block */}
                            <div className="grid gap-1">
                                <CustomForm
                                    target="ship_to_title"
                                    border="none"
                                    size="sm"
                                    placeholder="ship to"
                                />

                                <CustomTextArea
                                    target="ship_to"
                                    placeholder="(optional)"
                                    className="h-20"
                                />
                            </div>
                        </div>
                    </section>

                    {/* right side */}
                    <section className="flex flex-col items-end gap-3">
                        <CustomForm
                            target="header"
                            border="none"
                            className="uppercase py-2 text-5xl text-end h-auto" />
                        <div className="flex items-center">
                            <div className="bg-gray-200 text-2xl flex items-center justify-center h-full px-3 rounded-s-sm">
                                #
                            </div>
                            <CustomForm
                                target="id"
                                type="number"
                                className="rounded-s-none" />
                        </div>

                        {/* date , paymentTerms  , dueDate , PO block*/}
                        <div className="py-8 flex flex-col items-end gap-y-1">
                            {/* date */}
                            <div className="flex gap-2">
                                <CustomForm
                                    target="date_title"
                                    border="none"
                                    className="text-end" />

                                <DatePicker
                                    className="flex w-[12rem] h-9 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring hover:border-black border-[1px] rounded-sm transition duration-200 border-[rgb(206,212,218)] focus-visible:ring-1 focus-visible:ring-offset-0"
                                    selected={dateValue}
                                    onChange={(date : Date) => form.setValue("date", date ?? new Date())}
                                />
                            </div>

                            {/* payment_terms */}
                            <div className="flex gap-2">
                                <CustomForm
                                    target="payment_terms_title"
                                    border="none"
                                    className="text-end" />

                                <CustomForm
                                    target="payment_terms"
                                    className="w-[12rem]" />
                            </div>

                            {/* due_date */}
                            <div className="flex gap-2">
                                <CustomForm
                                    target="due_date_title"
                                    border="none"
                                    className="text-end" />

                                <DatePicker
                                    className="flex w-[12rem] h-9 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring hover:border-black border-[1px] rounded-sm transition duration-200 border-[rgb(206,212,218)] focus-visible:ring-1 focus-visible:ring-offset-0"
                                    selected={dueDateValue}
                                    onChange={(date: Date) => form.setValue("due_date", date)}
                                />
                            </div>

                            {/* PO */}
                            <div className="flex gap-2">
                                <CustomForm
                                    target="purchase_order_title"
                                    border="none"
                                    className="text-end" />

                                <CustomForm
                                    target="purchase_order"
                                    className="w-[12rem]" />
                            </div>
                        </div>
                    </section>

                    <Button type="submit">Submit</Button>

                    <div className="w-full col-span-2">
                        <ItemsTable form={form} />
                    </div>

                </form>
            </FormProvider>
        </div>
    );
}

export default FormPage;