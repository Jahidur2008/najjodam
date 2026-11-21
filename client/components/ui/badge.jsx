"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-green-700 text-white hover:bg-green-800",
        secondary:
          "border-transparent bg-emerald-100 text-emerald-800",
        accent:
          "border-transparent bg-amber-100 text-amber-800 border-amber-300",
        destructive:
          "border-transparent bg-red-100 text-red-800",
        outline:
          "border-slate-300 text-slate-700 bg-white",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
