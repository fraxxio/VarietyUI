import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import defaultConfig from "../components.json";

type Theme = "modern" | "glassmorphism" | "brutalism";
type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  theme?: Theme;
  variant?: Variant;
  size?: Size;
};

const modernVariants = cva(
  "rounded inline-flex gap-2 items-center justify-center font-medium",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-white duration-200 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-300",
        secondary:
          "duration-200 bg-opacity-10 bg-neutral-700 hover:bg-opacity-20 dark:bg-opacity-100 dark:hover:bg-opacity-70 text-black  dark:text-white dark:hover:text-gray-300",
        outline:
          "border border-black border-opacity-20 duration-200 text-black bg-black bg-opacity-0 hover:bg-opacity-[0.03] dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-[0.03] hover:text-gray-800 hover:border-opacity-25 dark:text-white dark:hover:text-gray-300 dark:border-white dark:border-opacity-20 dark:hover:border-opacity-25",
        danger: "bg-red-700 text-white duration-200 hover:bg-red-900",
        ghost:
          "bg-black bg-opacity-0 hover:bg-opacity-10 dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 duration-200",
      },
      size: {
        xs: "py-0.5 px-1 text-xs",
        sm: "py-1 px-2 text-sm",
        md: "py-1.5 px-3.5",
        lg: "py-2 px-6 text-lg",
        xl: "py-3 px-7 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const glassmorphismVariants = cva("font-medium rounded-lg text-neutral-800 ", {
  variants: {
    variant: {
      primary:
        "relative backdrop-blur-lg border-2 border-white shadow-sm bg-gradient-to-t from-[rgba(209,213,219,0.8)] to-[rgba(147,197,253,0.8)] transition duration-300 hover:before:opacity-70 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-300 before:to-blue-200 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-lg before:z-0 overflow-hidden",
      secondary:
        "relative backdrop-blur-lg border-2 border-white shadow-sm bg-blue-200 transition duration-300 hover:before:opacity-70 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-300 before:to-blue-200 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-lg before:z-0 overflow-hidden",
      outline:
        "relative backdrop-blur-lg border-2 border-white shadow-sm transition duration-300 hover:before:opacity-70 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-blue-300 before:to-blue-200 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-lg before:z-0 overflow-hidden dark:text-white",
      danger:
        "relative text-white backdrop-blur-lg border-2 border-white shadow-sm bg-gradient-to-t from-red-400 to-red-300 transition duration-300 hover:before:opacity-70 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-t before:from-red-300 before:to-red-400 before:opacity-0 before:transition-opacity before:duration-300 before:rounded-lg before:z-0 overflow-hidden",
      ghost:
        "hover:backdrop-blur-lg hover:bg-slate-300 bg-opacity-40 duration-300 dark:text-white hover:dark:text-black",
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

const brutalismVariants = cva("font-medium", {
  variants: {
    variant: {
      primary:
        "border-l-2 border-t-2 border-b-4 border-r-4 border-black dark:border-neutral-500 bg-white text-black duration-200 hover:border-b-[5px] hover:border-r-[5px]",
      secondary:
        "border-2 border-black bg-pink-400 text-black hover:bg-pink-500",
      outline: "",
      danger: "",
      ghost: "",
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
const Button = ({
  className,
  theme,
  variant,
  size,
  children,
  ...props
}: ButtonProps) => {
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
      <span className="relative z-10 inline-flex items-center justify-center gap-2 ">
        {children}
      </span>
    </button>
  );
};

export default Button;
