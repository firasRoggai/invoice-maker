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
    target: InvoiceKey | string & NonNullable<unknown>,
    className?: string,
    border?: "default" | "none"
    size?: "default" | "sm"
    ring?: "default" | "none",
    type?: HTMLInputTypeAttribute,
    onChange?: (e: FormEvent) => void
}

interface IconFormProps {
    placeholder?: string,
    target: InvoiceKey | string & NonNullable<unknown>,
    className?: string,
    border?: "default" | "none"
    size?: "default" | "sm"
    ring?: "default" | "none",
    type?: HTMLInputTypeAttribute,
    onChange?: (e: FormEvent) => void
}

interface SwitchFormProps {
    placeholder?: string,
    target: "tax" | "discounts" | "shipping",
    className?: string,
    border?: "default" | "none"
    size?: "default" | "sm"
    ring?: "default" | "none",
    type?: HTMLInputTypeAttribute,
    onChange?: (e: FormEvent) => void
}

// description : .min(3).max(40)
const itemSchema = z.object({
    quantity: z.number().min(1),
    name: z.string().min(3),
    description: z.string(),
    unit_cost: z.number().min(0),
    amount: z.number().min(0),
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
    due_date: z.date().optional(),
    items: z.array(itemSchema),
    currency: z.object({ value: z.string(), label: z.string() }),
    fields: z.object({
        discounts: z.enum(["%", "currency", "none"]),
        tax: z.enum(["%", "currency", "none"]),
        shipping: z.enum(["currency", "none"])
    }),
    discounts: z.number(),
    tax: z.number(),
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
export type { InvoiceKey, InvoiceObjectType, customFormProps, IconFormProps , SwitchFormProps };


// site
type User = {
    name : string
}

import type { Icon } from "lucide-react"

// import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}
const Icons : string[] = [];

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavItem[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}
