"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Check, AlertCircle, Info, Sparkles, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "glow";

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", duration: number = 2400) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type, duration }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          const isError = toast.type === "error";
          const isGlow = toast.type === "glow";
          const isInfo = toast.type === "info";

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 ${
                isError
                  ? "bg-red-950/90 border-red-800 text-red-100"
                  : isGlow
                  ? "bg-purple-950/90 border-purple-600/50 text-purple-100 shadow-purple-500/20 shadow-lg"
                  : isInfo
                  ? "bg-zinc-900/90 border-zinc-700 text-zinc-100"
                  : "bg-zinc-950/90 border-zinc-800 text-zinc-100 shadow-black/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isError ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                ) : isGlow ? (
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
                ) : isInfo ? (
                  <Info className="w-4 h-4 text-blue-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <span className="text-xs font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-60 hover:opacity-100 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
