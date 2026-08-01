import { Heart, Home, ShieldCheck, Zap } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                RentNest
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Modern rental property marketplace API with instant direct
              bookings, verified landlords, and tenant authorization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Featured Apartments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Luxury Villas
                </a>
              </li>
              <li>
                <a
                  href="#browse"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Studio Lofts
                </a>
              </li>
              <li>
                <a href="" className="hover:text-emerald-400 transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Security & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> JWT
                Authorization
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> Express REST
                API
              </li>
              <li className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" /> Landlord
                Verifications
              </li>
            </ul>
          </div>

          {/* API Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              API Backend
            </h4>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
              <p className="text-emerald-400 font-bold">
                Status: Online 200 OK
              </p>
              <p className="text-slate-500">Host: http://localhost:3000</p>
              <p className="text-slate-500">Base Path: /api/v1</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 RentNest Rental Property Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              API Documentation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
