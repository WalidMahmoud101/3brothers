import { Link, useLocation } from "react-router-dom";
import { Hammer, Home, Briefcase, Info, Mail, LayoutDashboard, Menu, X, LogOut, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "@/src/lib/api";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    api.getAuthStatus().then(status => setIsLoggedIn(status.loggedIn));
  }, [location]);

  const handleLogout = async () => {
    await api.logout();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const scrollToServices = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.projects'), path: "/projects", icon: Hammer },
    { name: t('nav.forSale'), path: "/for-sale", icon: Briefcase },
    { name: t("nav.services"), path: "/#services", icon: LayoutDashboard, onClick: scrollToServices },
    { name: t('nav.investment'), path: "/investment", icon: LayoutDashboard },
    { name: t('nav.about'), path: "/about", icon: Info },
    { name: t('nav.contact'), path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-4 rtl:space-x-reverse group">
            <div className="relative flex items-center justify-center">
              {/* Logo recreation using CSS/Icons */}
              <div className="flex items-center space-x-0.5" dir="ltr">
                <div className="text-brand-orange font-bold text-4xl leading-none">3</div>
                <div className="flex flex-col items-center -space-y-1">
                  <div className="w-0.5 h-2 bg-brand-black"></div>
                  <div className="w-6 h-10 border-x-2 border-brand-black flex flex-col justify-between py-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-full h-0.5 bg-brand-black/20"></div>
                    ))}
                  </div>
                </div>
                <div className="text-brand-orange font-bold text-4xl leading-none">B</div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-brand-black tracking-tight leading-tight uppercase">
                {t('hero.companyNameFirst')}
              </span>
              <span className="text-[10px] font-bold text-brand-orange tracking-[0.2em] uppercase leading-tight">
                {t('hero.companyNameSecond')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={link.onClick}
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-brand-orange ${
                  isActive(link.path) ? "text-brand-orange" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse pl-4 rtl:pl-0 rtl:pr-4 border-l rtl:border-l-0 rtl:border-r border-slate-200">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 text-brand-black hover:bg-brand-orange hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest border border-slate-200"
              >
                <Languages className="w-4 h-4" />
                <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {isLoggedIn && (
                <>
                  <Link
                    to="/admin"
                    className={`p-2 rounded-full transition-colors ${
                      isActive("/admin") ? "bg-brand-orange text-white" : "bg-slate-100 text-brand-orange hover:bg-slate-200"
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="p-2 text-slate-600 hover:text-brand-orange"
            >
              <Languages className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-orange p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => {
                      if (link.onClick) link.onClick(e);
                      setIsOpen(false);
                    }}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-4 rounded-md text-xs font-bold uppercase tracking-widest ${
                      isActive(link.path)
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-orange"
                    }`}
                  >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
              {isLoggedIn && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-4 rounded-md text-slate-600 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t('nav.admin')}</span>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-4 rounded-md text-red-500 hover:bg-slate-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
