import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { IoMdSwitch } from "react-icons/io";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import type { SwitchFormProps, InvoiceObjectType } from "~/types";


const ErrorMessage = ({ error }: { error?: string }) => {
    return (
        <span className="text-xs text-red-600">
            {error}
        </span>
    )
}

const SwitchForm = ({ placeholder, target, className, border, size, ring, type, onChange }: SwitchFormProps) => {
    const { watch, register, formState: { errors }, setValue } = useFormContext<InvoiceObjectType>();

    const currency = watch("currency.value")
    const field = watch(`fields.${target}`)

    const inputVariant = cva(
        "hover:border-black border-[1px] transition duration-200",
        {
            variants: {
                border: {
                    default: "border-[rgb(206,212,218)]",
                    none: "border-none"
                },
                size: {
                    default: "",
                    sm: "px-1 h-6 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                },
                ring: {
                    default: "focus-visible:ring-1 focus-visible:ring-offset-0",
                    none: "focus-visible:ring-0"
                }
            },
            defaultVariants: {
                border: "default",
                size: "default",
                ring: "default",
            },
        }
    )

    return (
        <div className="grid border-none w-[14.1rem]">
            <div className={cn(inputVariant({ border: border }), "flex rounded-sm items-center px-1")}>
                <div className="px-2 text-gray-400 w-6">
                    {field == "%" ? "%" : currency}
                </div>
                <Input
                    type={type}
                    className={cn("rounded-sm rounded-s-none border-none ring-0 px-2 h-[60%] w-full", inputVariant({ size: size, ring: ring }), className)}
                    placeholder={placeholder}
                    {...register(target, {
                        valueAsNumber: type == "number",
                    })}
                    onChange={onChange ?? undefined}
                />

                {/* shipping form does not need % */}
                {target != "shipping" &&
                    <div className="px-2 text-gray-400">
                        <button onClick={(e) => {
                            e.preventDefault()

                            if (field == "%") setValue(`fields.${target}`, "currency")
                            if (field == "currency") setValue(`fields.${target}`, "%")

                        }}
                            className="">
                            <IoMdSwitch className="hover:text-blue-500" />
                        </button>
                    </div>
                }
            </div>

            {
                errors[target] && <ErrorMessage error={errors[target]?.message?.toString()} />
            }
        </div>
    );
}

export default SwitchForm;