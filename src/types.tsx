import type { FormEvent, HTMLInputTypeAttribute } from "react";
import { z } from "zod";

const optionalTitleSchema = z.string()
    .min(2, { message: "Value is too short." })
    .max(20, { message: "Value is too long." })
    .or(z.literal(''));

const titleSchema = z.string()
    .min(2, { message: "Value is too short." })
    .max(20, { message: "Value is too long." });

const descriptionSchema = z.string()
    .min(5, { message: "Value is too short." })
    .max(100, { message: "Value is too long." })
    .optional();

interface customFormProps {
    placeholder?: string,

    // eslint-disable-next-line
    target: InvoiceKey | string,
    className?: string,
    border?: "default" | "none"
    size?: "default" | "sm"
    ring?: "default" | "none",
    type?: HTMLInputTypeAttribute,
    onChange?: (e: FormEvent) => void
}

const itemSchema = z.object({
    quantity: z.number().min(1),
    name: z.string().min(3).max(10),
    description: z.string().min(3).max(30),
    unit_cost: z.number().min(0),
    amount: z.number().min(0),
    index: z.number()
})


const InvoiceObject = z.object({
    id: z.number().min(1) || undefined,
    from: titleSchema,
    logo: z.string(),
    history: z.boolean(),
    to: titleSchema,
    ship_to: optionalTitleSchema,

    number: z.number().min(0, { message: "This value can not be less than 1" }),
    purchase_order: z.string().refine(value => /^[0-9]+$/.test(value)),
    date_format: z.string(),
    date: z.date(),
    payment_terms: descriptionSchema,
    due_date: z.date(),
    items: z.array(itemSchema),
    currency: z.object({ value: z.string(), label: z.string() }),
    fields: z.object({
        discounts: z.boolean(),
        tax: z.enum(["%", "currency"]),
        shipping: z.boolean()
    }),
    discounts: z.string(),
    tax: z.string(),
    shipping: z.number(),
    amount_paid: z.number(),
    notes: descriptionSchema,
    terms: descriptionSchema,
    header: titleSchema,
    to_title: titleSchema,
    ship_to_title: titleSchema,
    date_title: titleSchema,
    payment_terms_title: titleSchema,
    due_date_title: titleSchema,
    purchase_order_title: titleSchema,
    item_header: titleSchema,
    quantity_header: titleSchema,
    unit_cost_header: titleSchema,
    amount_header: titleSchema,
    subtotal_title: titleSchema,
    discounts_title: titleSchema,
    tax_title: titleSchema,
    shipping_title: titleSchema,
    total_title: titleSchema,
    amount_paid_title: titleSchema,
    balance_title: titleSchema,
    terms_title: titleSchema,
    notes_title: titleSchema,
    subtotal: z.number().min(0),
    total: z.number().min(0),
    balance: z.number().min(0)
})

type InvoiceObjectType = z.infer<typeof InvoiceObject>;
type InvoiceKey = keyof typeof InvoiceObject.shape;

export type reactSelect = {
    label: string,
    value: string,
}

export { InvoiceObject };
export type tableItem = z.infer<typeof itemSchema>
export type { InvoiceKey, InvoiceObjectType, customFormProps };
