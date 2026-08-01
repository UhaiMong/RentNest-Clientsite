import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/app/services/auth";

export function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"TENANT" | "LANDLORD">("TENANT");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = (await authApi.register({
        name,
        email,
        password,
        role,
        phone,
      })) as { success?: boolean };
      if (res.success) {
        toast.success("Registration successful! Please sign in.");
        window.location.href = "/login";
      }
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            required
            placeholder="Uhai Mong"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="email"
            required
            placeholder="uhai@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Phone Number</label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="tel"
            placeholder="+88 (015) 16254558"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Account Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("TENANT")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
              role === "TENANT"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Tenant
          </button>
          <button
            type="button"
            onClick={() => setRole("LANDLORD")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
              role === "LANDLORD"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Landlord
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="password"
            required
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-9 pt-3"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white cursor-pointer"
      >
        {loading ? "Creating account..." : "Create Account"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
