"use client";

import {
  AlertTriangle,
  CheckCircle,
  Info,
  Loader,
  XCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      icons={{
        success: <CheckCircle className="h-4 w-4 mt-1 text-green-500" />,
        info: <Info className="h-4 w-4 mt-1 text-blue-500" />,
        warning: <AlertTriangle className="h-4 w-4 mt-1 text-amber-500" />,
        error: <XCircle className="h-4 w-4 mt-1 text-red-500" />,
        loading: <Loader className="h-4 w-4 mt-1 text-gray-500 animate-spin" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
