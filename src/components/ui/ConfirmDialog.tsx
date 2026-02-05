"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open && !loading) onCancel?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={!loading ? onCancel : undefined} />
      <div className="relative z-[1001] w-[90%] max-w-sm rounded-md border border-neutral-200 bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={loading}
            className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 cursor-pointer outline-none"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-white cursor-pointer flex items-center gap-2 outline-none",
              variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90",
              loading && "opacity-70"
            )}
            onClick={onConfirm}
          >
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
