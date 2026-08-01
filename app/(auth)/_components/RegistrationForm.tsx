"use client";
import { useActionState, useEffect, useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "../_actions/authActions";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name" className="text-xs font-bold text-slate-700">
          Full Name
        </Label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            required
            id="name"
            name="name"
            placeholder="Uhai Mong"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs font-bold text-slate-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="uhai@gmail.com"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="phone" className="text-xs font-bold text-slate-700">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="tel"
            placeholder="+88 (015) 16254558"
            id="phone"
            name="phone"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">I am a</Label>
        <select
          id="role"
          name="role"
          defaultValue="TENANT"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="TENANT">Tenant — looking to rent</option>
          <option value="LANDLORD">Landlord — listing properties</option>
        </select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-bold text-slate-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="password"
            id="password"
            name="password"
            required
            placeholder="*******"
            className="pl-9 pt-3"
          />
        </div>
      </div>
      <span>
        Already have an account? <a href="/login">Login</a>
      </span>
      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-emerald-600 text-white cursor-pointer"
      >
        {isPending ? "Creating account..." : "Create Account"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
