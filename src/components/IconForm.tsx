import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import type { IconFormProps } from "~/types";


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


const ErrorMessage = ({ error }: { error?: string }) => {
    return (
        <span className="text-xs text-red-600">
            {error}
        </span>
    )
}

const IconForm = ({ placeholder, target, className, border, size, ring, type, onChange }: IconFormProps) => {
    const { watch, register, formState: { errors } } = useFormContext<Record<string , string>>();

    const currency = watch("currency.value")
    
    return (
        <div className="grid border-none">
            <div className={cn(inputVariant({ border: border }), "flex rounded-sm items-center px-1")}>
                <div className="px-2 text-gray-400">
                    {currency}
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
            </div>

            {
                // eslint-disable-next-line
                errors[target] && <ErrorMessage error={errors[target]?.message?.toString()} />
            }
        </div>
    );
}

export default IconForm;