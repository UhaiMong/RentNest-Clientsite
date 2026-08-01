"use client";

import { useActionState, useEffect, useState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authActions";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const action = loginAction.bind(null, redirectTo);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      router.push(redirectTo);
    } else {
      toast.error(state.message);
    }
  }, [state, router, redirectTo]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs font-bold text-slate-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="email"
            name="email"
            id="email"
            required
            placeholder="uhai@gmail.com"
            className="pl-9"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-bold text-slate-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="password"
            required
            id="password"
            name="password"
            placeholder="*******"
            className="pl-9 pt-3"
          />
        </div>
      </div>

      {state && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
      <span className="my-2">
        No account?{" "}
        <a className="text-blue-500 hover:underline" href="/register">
          Register
        </a>
      </span>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-emerald-600 text-white cursor-pointer"
      >
        {isPending ? "Login..." : "Login"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
