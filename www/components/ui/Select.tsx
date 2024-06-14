import React, { createContext, useContext, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import defaultConfig from "../components.json";

type Theme = "modern" | "glassmorphism" | "brutalism";
type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  theme?: Theme;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  onValueChange?: (value: string) => void;
};

type SelectContextType = {
  selectedValue: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleSelectedValue: (value: string) => void;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext<SelectContextType | undefined>(SelectContext);
  if (!context) {
    throw new Error("Select compound components must be used within a Select");
  }
  return context;
};

const modernVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      outline: "",
      danger: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
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
      primary: "",
      secondary: "",
      outline: "",
      danger: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
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
      primary: "",
      secondary: "",
      outline: "",
      danger: "",
      ghost: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
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

const Select = ({
  children,
  size,
  variant = "primary",
  theme,
  className,
  onValueChange,
  ...props
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const appliedTheme: Theme = theme || defaultTheme;
  const selectedVariants = themeVariants[appliedTheme];

  if (!selectedVariants) {
    console.error(`Invalid theme: ${appliedTheme}`);
    return null;
  }

  const handleSelectedValue = (value: string) => {
    setSelectedValue(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <SelectContext.Provider
      value={{ selectedValue, isOpen, setIsOpen, handleSelectedValue }}
    >
      <div
        {...props}
        className={cn(selectedVariants({ variant, size }), className)}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children }: { children: ReactNode }) => {
  const { isOpen, setIsOpen, selectedValue } = useSelectContext();

  return (
    <div onClick={() => setIsOpen(!isOpen)}>{selectedValue || children}</div>
  );
};

const SelectList = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useSelectContext();

  return isOpen ? <div>{children}</div> : null;
};

const SelectItem = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  const { handleSelectedValue, setIsOpen } = useSelectContext();

  return (
    <div
      onClick={() => {
        handleSelectedValue(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.List = SelectList;
Select.Item = SelectItem;

export default Select;
