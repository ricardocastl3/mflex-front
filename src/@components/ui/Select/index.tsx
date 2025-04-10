import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const selectVariants = cva(
  "flex gap-2 border-slate-300  dark:border-slate-700/80 px-3 border-[1.8px] dark:text-white cursor-pointer focus:ring rounded-lg text-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      bg: {
        default: "bg-transparent",
        basebox: "bg-transparent dark:bg-[#161b28]",
      },
      variant: {
        default:
          "focus:ring-offset-1 focus:ring-yellow-800/40 focus:ring-offset-yellow-600",
        primary: "border-yellow-300 dark:border-yellow-800",
      },
      weight: {
        sm: "md:py-3 py-1.5",
        md: "py-3.5 text-[0.9rem]",
      },
    },
    defaultVariants: {
      bg: "default",
      weight: "sm",
      variant: "default",
    },
  }
);

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
  requiredField?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      requiredField = false,
      variant,
      weight,
      bg,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "select";
    return (
      <Comp
        className={
          cn(selectVariants({ variant, weight, bg, className })) +
          ` ${
            requiredField
              ? "border-red-500 dark:border-red-800/80 focus:ring-red-800/40 dark:focus:ring-red-800/80 dark:focus:ring-offset-red-500 focus:ring-offset-red-200 "
              : "border-slate-300 dark:border-slate-700/80 focus:ring-yellow-800/40 focus:ring-offset-yellow-600"
          } `
        }
        ref={ref}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
