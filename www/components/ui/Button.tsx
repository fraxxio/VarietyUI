import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import defaultConfig from "../components.json";

type Theme = "modern" | "glassmorphism" | "brutalism";
type Variant = "primary" | "secondary";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  theme?: Theme;
  variant?: Variant;
  size?: Size;
};

const modernVariants = cva("rounded", {
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

const glassmorphismVariants = cva("", {
  variants: {
    variant: {
      primary:
        "backdrop-blur-lg bg-white bg-opacity-50 text-black hover:bg-opacity-70",
      secondary:
        "backdrop-blur-lg bg-gray-200 bg-opacity-50 text-black hover:bg-opacity-70",
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

const brutalismVariants = cva("", {
  variants: {
    variant: {
      primary:
        "border-2 border-black bg-yellow-400 text-black hover:bg-yellow-500",
      secondary:
        "border-2 border-black bg-pink-400 text-black hover:bg-pink-500",
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

const defaultTheme: Theme = defaultConfig.defaultTheme as Theme;

const themeVariants = {
  modern: modernVariants,
  glassmorphism: glassmorphismVariants,
  brutalism: brutalismVariants,
};

export default function Button({
  className,
  theme,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = themeVariants[appliedTheme];

  if (!selectedVariants) {
    console.error(`Invalid theme: ${appliedTheme}`);
    return null;
  }

  return (
    <button
      {...props}
      className={cn(selectedVariants({ variant, size }), className)}
    >
      {children}
    </button>
  );
}
