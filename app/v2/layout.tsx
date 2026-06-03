import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "log0 - intelligent incident response",
  description:
    "Detect what breaks, correlate what matters, resolve before users notice.",
};

export default function V2Layout({ children }: { children: ReactNode }) {
  return <div className="font-sans">{children}</div>;
}
