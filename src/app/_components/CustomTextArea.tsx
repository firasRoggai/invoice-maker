import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { customFormProps } from "~/types";

const ErrorMessage = ({ error }: { error?: string }) => {
    return (
        <span className="text-red-600">
            {error}
        </span>
    )
}

const CustomTextArea = ({ placeholder, target, className, border, size }: customFormProps) => {
    const { register, formState: { errors } } = useFormContext<{ [x: string]: string }>();

    const inputVariant = cva(
        "hover:border-black border-[1px] rounded-sm transition duration-200",
        {
            variants: {
                border: {
                    default: "border-[rgb(206,212,218)]",
                    none: "border-none"
                },
                size: {
                    default: "",
                    sm: "px-1 h-6 text-sm focus-visible:ring-1 focus-visible:ring-offset-0"
                }
            },
            defaultVariants: {
                border: "default",
                size: "default",
            },
        }
    )

    return (
        <div className="grid border-none">
            <div className={cn(inputVariant({ border: border }))}>
                <Textarea className={cn("rounded-sm border-none px-2", inputVariant({ size: size }), className)} placeholder={placeholder} {...register(target)} />
            </div>
            <div className="h-5">
                {errors[target] && <ErrorMessage error={errors[target]?.message} />}
            </div>
        </div>
    );
}

export default CustomTextArea;