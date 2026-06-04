import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LogoMark } from "@/components/landing/LogoMark";

export const docsBaseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2 font-mono font-medium tracking-tight">
        <LogoMark className="h-5 w-6" />
        log0
      </span>
    ),
    url: "/docs",
  },
};
