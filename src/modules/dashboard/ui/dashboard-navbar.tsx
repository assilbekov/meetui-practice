"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftIcon, PanelRightIcon, SearchIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          aria-label={state === "expanded" ? "Close sidebar" : "Open sidebar"}
        >
          {state === "collapsed" && isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelRightIcon />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground/80"
          onClick={() => setOpen(true)}
          aria-label="Open search"
        >
          <SearchIcon className="size-4" />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
