import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva("rounded font-medium", {
  variants: {
    variant: {
      primary:
        "bg-black text-white duration-200 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300",
      secondary:
        "border border-black border-opacity-30 duration-200 text-black hover:text-gray-800 hover:border-opacity-50 dark:text-white dark:hover:text-gray-300 dark:border-white dark:border-opacity-40 dark:hover:border-opacity-50",
    },
    size: {
      xs: "py-0.5 px-1 text-xs",
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-4",
      lg: "py-2 px-6 text-lg",
      xl: "py-3 px-7 text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
