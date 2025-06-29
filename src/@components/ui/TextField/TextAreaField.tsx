"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const InputVariants = cva(
  "flex gap-2 items-center disabled:cursor-not-allowed text-wrap  whitespace-nowrap rounded-md transition-colors  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        noneFocus: "px-4 py-2.5 text-sm",
        default:
          "px-4 py-2.5 text-sm focus:ring-offset-1 rounded-lg bg-transparent text-slate-800 dark:text-slate-100 border-[1.8px]",
      },
      weight: {
        sm: "h-[36px] w-[120px] px-[15px] py-[18px] text-[0.8rem] focus:ring-1",
        md: "h-[40px] w-[140px] px-[15px] py-[18px] text-[0.9rem] focus:ring-2",
        lg: "h-[50px] w-[150px] px-[15px] py-[18px] text-[0.9rem] focus:ring-2",
      },
      shadow: {
        none: "shadow-none",
        default: "",
        destrutive: "",
        primary: "",
      },
    },
    defaultVariants: {
      variant: "default",
      weight: "md",
    },
  }
);

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof InputVariants> {
  asChild?: boolean;
  requiredField?: boolean;
  onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField = React.forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      variant,
      weight,
      asChild = false,
      requiredField = false,
      onInput,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "textarea";
    return (
      <>
        <Comp
          className={
            cn(InputVariants({ variant, weight, className })) +
            ` ${
              requiredField
                ? "border-red-500 dark:border-red-800/80 focus:ring-red-800/40 dark:focus:ring-red-800/80 dark:focus:ring-offset-red-500 focus:ring-offset-red-200 "
                : "border-slate-300 dark:border-slate-700/80 focus:ring-yellow-800/40 focus:ring-offset-yellow-600"
            } `
          }
          ref={ref}
          onInput={onInput}
          {...props}
        />
      </>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

export { TextAreaField, InputVariants };
