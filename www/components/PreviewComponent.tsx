import React, { useState } from "react";
import Button from "./ui/Button";
import Select from "./ui/Select";

type PreviewComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  component: string;
  variant: string;
};

const componentMap: { [key: string]: React.ElementType } = {
  Button: Button,
};

export default function PreviewComponent({
  children,
  component,
  variant = "primary",
  ...props
}: PreviewComponentProps) {
  const [selectedTheme, setSelectedTheme] = useState("");
  const Preview = componentMap[component];
  return (
    <div
      {...props}
      className="relative my-4 grid min-h-52 w-[70%] place-items-center rounded border border-neutral-400 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900"
    >
      <Select
        className="absolute left-3 top-3"
        onValueChange={setSelectedTheme}
        size="sm"
        defaultItem={{ label: "Modern", value: "modern" }}
      >
        <Select.Trigger>Select theme</Select.Trigger>
        <Select.List>
          <Select.Item value="modern">Modern</Select.Item>
          <Select.Item value="glassmorphism">Glassmorphism</Select.Item>
          <Select.Item value="brutalism">Brutalism</Select.Item>
        </Select.List>
      </Select>
      {Preview ? (
        <Preview theme={selectedTheme} variant={variant}>
          {children}
        </Preview>
      ) : null}
    </div>
  );
}
