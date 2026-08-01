import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/app/services/auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = (await authApi.login({
        email,
        password,
      })) as { success?: boolean };
      if (res.success) {
        toast.success("Login successfull");
        window.location.href = "/";
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {loading ? "Login account..." : "Login"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
