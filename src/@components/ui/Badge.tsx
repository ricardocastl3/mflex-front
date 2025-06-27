import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils-ui";

const selectVariants = cva("flex items-center gap-2 px-2 py-0.5 rounded-full", {
  variants: {
    variant: {
      primary:
        "text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/40",
      green:
        "text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-800/40",
      red: "text-red-700 dark:text-red-400 bg-red-200 dark:bg-red-800/40",
    },
    weight: {
      sm: "md:py-1 py-1 text-xs",
      md: "py-1.5 text-sm",
    },
  },
  defaultVariants: {
    weight: "sm",
    variant: "primary",
  },
});

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
  requiredField?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      requiredField = false,
      variant,
      weight,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(selectVariants({ variant, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, selectVariants };
