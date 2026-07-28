"use client";

import { AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface AlertModalProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

const AlertModal = ({
  open,
  title = "Something went wrong",
  message,
  onClose,
}: AlertModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      aria-describedby="alert-modal-description"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#181818] p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="size-5 text-red-400" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="alert-modal-title"
              className="text-base font-semibold text-white"
            >
              {title}
            </h2>

            <p
              id="alert-modal-description"
              className="mt-1 text-sm leading-6 text-[#b3b3b3]"
            >
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#b3b3b3] transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            aria-label="Close alert"
          >
            <X className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
