"use client"

import type { UseFormReturn } from "react-hook-form"

import type { InvoiceObjectType } from "~/types/types"
import CustomForm from "./CustomForm"
import CustomTextArea from "./CustomTextArea"
import ImagePicker from "./ImagePicker"

// date picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { recalculatTotal } from "~/lib/utils"
import IconForm from "./IconForm"
import ItemsTable from "./ItemsTable"
import PriceAdjustment from "./PriceAdjustment"

interface formPageProps {
    form: UseFormReturn<InvoiceObjectType>
}

const FormPage = ({ form }: formPageProps) => {
    const { watch, setValue, getValues } = form;

    // reactive values
    const dateValue = watch("date");
    const dueDateValue = watch("due_date");
    const subTotal = watch("subtotal");
    const total = watch("total");
    const balance = watch("balance");
    const currency = watch("currency.value");
    
    return (
        <div className="lg:w-[80%] min-h-[100vh] p-5 rounded-md border-2 bg-white border-gray-300">
            <div className="grid grid-cols-2 gap-3">
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
                                onChange={(date: Date) => form.setValue("date", date ?? new Date())}
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

                <div className="w-full col-span-2">
                    <ItemsTable form={form} />
                </div>

                {/* bottom section */}
                <div className="col-span-2 grid grid-cols-2 mt-6 gap-x-5">
                    {/*  left section*/}
                    <div className="">
                        <div className="space-y-1">
                            <CustomForm
                                target={"notes_title"}
                                className="w-[10rem] text-gray-500"
                                border="none"
                            />
                            <CustomTextArea
                                target={"notes"}
                                placeholder="Notes , any relevant information not already covered"
                                className="h-20"
                            />
                        </div>
                        <div className="space-y-1">
                            <CustomForm
                                target={"terms_title"}
                                className="w-[10rem] text-gray-500"
                                border="none"
                            />
                            <CustomTextArea
                                target={"terms"}
                                placeholder="Terms and conditions - late fees, payment methods, delivery, schedule"
                                className="h-20"
                            />
                        </div>
                    </div>

                    {/*  right section*/}
                    <div className="space-y-3">
                        {/* subtotal */}
                        <div className="flex justify-end items-center gap-x-2 pe-7">
                            <CustomForm
                                target="subtotal_title"
                                border="none"
                                className="w-[7rem] text-gray-500" />

                            <div className="w-[14.1rem] text-end">
                                {currency}{" "}{subTotal.toFixed(2)}
                            </div>
                        </div>

                        {/* price adjustment : tax / discount / shipping */}
                        <div>
                            <PriceAdjustment />
                        </div>

                        {/* total */}
                        <div className="flex justify-end items-center gap-x-2 pe-7">
                            <CustomForm
                                target="total_title"
                                border="none"
                                className="w-[7rem] text-gray-500" />

                            <div className="w-[14.1rem] text-end">
                                {currency}{" "}{total.toFixed(2)}
                            </div>
                        </div>
                        {/* amount paid / balance due */}
                        <div className="flex items-center justify-end pe-6 gap-x-2">
                            <CustomForm
                                target={"amount_paid_title"}
                                className="w-[7rem] text-gray-500"
                                border="none"
                            />
                            <IconForm
                                type="number"
                                onChange={(e) => {
                                    const target = e.currentTarget as HTMLInputElement;
                                    setValue(`amount_paid`, Number(target.value))
                                    recalculatTotal({ setValue, getValues })
                                }}
                                target="amount_paid"
                                ring="none"
                                className="w-[12.3rem] rounded-e-none rounded-s-none" />
                        </div>

                        {/* balance */}
                        <div className="flex justify-end items-center gap-x-2 pe-7">
                            <CustomForm
                                target="balance_title"
                                border="none"
                                className="w-[7rem] text-gray-500" />

                            <div className="w-[14.1rem] text-end">
                                {currency}{" "}{balance.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormPage;