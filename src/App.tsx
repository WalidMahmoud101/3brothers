/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { api } from "./lib/api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyCard from "./components/PropertyCard";
import PropertyDetailsModal from "./components/PropertyDetailsModal";
import ProjectGallery from "./components/ProjectGallery";
import ContactForm from "./components/ContactForm";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import { Hammer, Home, Briefcase, Info, Mail, ArrowRight, CheckCircle2, Play, Building2, Ruler, Paintbrush, Target, Lightbulb, Eye, Users, ShieldCheck, Zap } from "lucide-react";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    api.getAuthStatus().then(status => setIsLoggedIn(status.loggedIn));
  }, []);

  if (isLoggedIn === null) return <div className="min-h-screen bg-white flex items-center justify-center text-brand-orange">Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" />;
  return <>{children}</>;
}

// Analytics Tracker
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        await api.logAnalytics({
          page: location.pathname,
          userAgent: navigator.userAgent,
        });
      } catch (e) {
        console.warn("Analytics log failed", e);
      }
    };
    logVisit();
  }, [location]);

  return null;
}

// Scroll to Top on Navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- Page Components ---

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/construction-site/1920/1080"
            alt="Luxury Construction"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block px-6 py-2 bg-brand-orange text-white text-xs font-bold uppercase tracking-[0.3em] rounded-sm">
              {t('hero.title')}
            </span>
            <h1 className="text-6xl md:text-9xl font-light text-white tracking-tighter leading-none italic serif">
              {t('hero.companyNameFirst')} <span className="text-brand-orange font-bold">{t('hero.companyNameSecond')}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
              <Link to="/projects" className="px-10 py-5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-sm transition-all flex items-center group uppercase tracking-widest text-xs">
                {t('hero.viewProjects')} <ArrowRight className="mx-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
              <Link to="/contact" className="px-10 py-5 bg-white hover:bg-slate-50 text-brand-black font-bold rounded-sm transition-all uppercase tracking-widest text-xs">
                {t('hero.contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-black italic serif mb-6">{t('services.title')}</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: t('services.residential.title'), icon: Building2, desc: t('services.residential.desc'), path: "/projects" },
            { title: t('services.commercial.title'), icon: Paintbrush, desc: t('services.commercial.desc'), path: "/projects" },
            { title: t('services.renovation.title'), icon: Hammer, desc: t('services.renovation.desc'), path: "/projects" },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <Link 
                to={service.path}
                className="block p-12 bg-slate-50 border border-slate-100 rounded-sm hover:border-brand-orange/30 transition-all group text-center h-full"
              >
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-brand-orange transition-colors">
                  <service.icon className="w-8 h-8 text-brand-orange group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 italic serif uppercase tracking-tight">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm mb-6">{service.desc}</p>
                <div className="inline-flex items-center text-brand-orange font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  {t('common.viewDetails')} <ArrowRight className="mx-2 w-3 h-3 rtl:rotate-180" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects] = useState<any[]>([
    { id: "1", title: "Modern Coastal Villa", category: "Construction", description: "A high-end modern villa with panoramic ocean views.", media: [{ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "youtube" }] },
    { id: "2", title: "Historic Downtown Loft", category: "Restoration", description: "Complete restoration of a 1920s industrial building.", media: [{ url: "https://picsum.photos/seed/loft/800/600", type: "image" }] },
    { id: "3", title: "Minimalist Kitchen Remodel", category: "Remodeling", description: "Sleek, functional kitchen design with premium finishes.", media: [{ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "youtube" }] },
  ]);

  return (
    <div className="pt-48 pb-32 max-w-7xl mx-auto px-4">
      <header className="mb-24 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-black mb-8 italic serif tracking-tight">{t('projects.title')}</h1>
        <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
        <p className="text-slate-500 text-lg font-light leading-relaxed">{t('projects.description')}</p>
      </header>
      <ProjectGallery projects={projects} />
    </div>
  );
};

const ForSalePage = () => {
  const { t } = useTranslation();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [properties] = useState<any[]>([
    { id: "p1", title: "The Grand Estate", price: 4500000, location: "Beverly Hills, CA", bedrooms: 6, bathrooms: 8, yearBuilt: 2024, type: "sale", images: ["https://picsum.photos/seed/estate/800/600"] },
    { id: "p2", title: "Historic Victorian Mansion", price: 2800000, location: "San Francisco, CA", bedrooms: 4, bathrooms: 3, yearBuilt: 1895, type: "historic", images: ["https://picsum.photos/seed/mansion/800/600"] },
    { id: "p3", title: "Modern Hillside Retreat", price: 3200000, location: "Malibu, CA", bedrooms: 5, bathrooms: 5, yearBuilt: 2023, type: "investment", images: ["https://picsum.photos/seed/retreat/800/600"] },
  ]);

  return (
    <div className="pt-48 pb-32 max-w-7xl mx-auto px-4">
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-black mb-8 italic serif tracking-tight">{t('forSale.title')}</h1>
        <div className="flex flex-wrap gap-4">
          {[
            { key: 'all', label: t('forSale.filters.all') },
            { key: 'newBuild', label: t('forSale.filters.newBuild') },
            { key: 'historic', label: t('forSale.filters.historic') },
            { key: 'investment', label: t('forSale.filters.investment') }
          ].map(filter => (
            <button key={filter.key} className="px-8 py-3 rounded-sm border border-slate-200 text-slate-500 hover:border-brand-orange hover:text-brand-orange transition-all text-[10px] font-bold uppercase tracking-widest">
              {filter.label}
            </button>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {properties.map(prop => (
          <PropertyCard 
            key={prop.id} 
            property={prop} 
            onViewDetails={(p) => setSelectedProperty(p)} 
          />
        ))}
      </div>

      <PropertyDetailsModal 
        property={selectedProperty} 
        isOpen={!!selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};

const InvestmentPage = () => {
  const { t } = useTranslation();
  const highlights = t('investment.highlights', { returnObjects: true }) as string[];
  
  return (
    <div className="pt-48 pb-32 max-w-7xl mx-auto px-4 space-y-32">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-black italic serif leading-tight tracking-tight">
            {t('investment.title')}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed font-light">
            {t('investment.description')}
          </p>
          <ul className="space-y-6">
            {Array.isArray(highlights) && highlights.map((item, i) => (
              <li key={i} className="flex items-center space-x-4 rtl:space-x-reverse text-slate-600 font-medium">
                <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button className="px-10 py-5 bg-brand-orange text-white font-bold rounded-sm hover:bg-brand-orange/90 transition-all uppercase tracking-widest text-xs shadow-lg">
            {t('investment.cta')}
          </button>
        </div>
        <div className="relative">
          <div className="aspect-square bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
            <img src="https://picsum.photos/seed/investment/800/800" alt="Investment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-10 -left-10 rtl:-left-auto rtl:-right-10 p-10 bg-white border border-slate-100 rounded-sm shadow-2xl max-w-xs">
            <div className="text-5xl font-bold text-brand-orange mb-3 serif italic">18.5%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">{t('investment.roiLabel')}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  
  const whatWeDoItems = t('about.whatWeDo.items', { returnObjects: true }) as any[];
  const advantageItems = t('about.advantage.items', { returnObjects: true }) as any[];
  const advantageIcons = [Target, Lightbulb, Eye];
  const whatWeDoIcons = [Ruler, Paintbrush, ShieldCheck];

  return (
    <div className="pt-24 pb-32 space-y-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="About Us"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm">
              {t('about.subtitle')}
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic serif">
              {t('about.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-brand-black italic serif leading-tight">
            {t('about.vision.title')}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed font-light">
            {t('about.description')}
          </p>
          <p className="text-slate-500 text-lg leading-relaxed font-light">
            {t('about.vision.description')}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-slate-100 rounded-sm overflow-hidden border border-slate-200"
        >
          <img 
            src="https://picsum.photos/seed/vision/800/600" 
            alt="Vision" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-black py-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: t('about.stats.years'), value: "25+" },
            { label: t('about.stats.projects'), value: "450+" },
            { label: t('about.stats.awards'), value: "32" },
            { label: t('about.stats.clients'), value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="text-6xl font-bold text-brand-orange serif italic">{stat.value}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-black italic serif tracking-tight">
            {t('about.whatWeDo.title')}
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {whatWeDoItems.map((item, i) => {
            const Icon = whatWeDoIcons[i] || Hammer;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-slate-50 border border-slate-100 rounded-sm hover:border-brand-orange/30 transition-all group"
              >
                <div className="w-16 h-16 bg-white shadow-sm rounded-sm flex items-center justify-center mb-8 group-hover:bg-brand-orange transition-colors">
                  <Icon className="w-6 h-6 text-brand-orange group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 italic serif uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Advantage Section */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-brand-black italic serif tracking-tight">
              {t('about.advantage.title')}
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {advantageItems.map((item, i) => {
              const Icon = advantageIcons[i] || Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl text-brand-orange">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-black italic serif uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm font-light max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-brand-black italic serif tracking-tight">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-brand-orange"></div>
          </div>
          <Link to="/contact" className="text-brand-orange font-bold uppercase tracking-widest text-xs flex items-center group">
            Work with us <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-slate-100 rounded-sm overflow-hidden mb-6 relative">
                <img 
                  src={`https://picsum.photos/seed/team-${member}/600/800`} 
                  alt={`Team Member ${member}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/20 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-bold text-brand-black italic serif">Team Member {member}</h4>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mt-1">Project Manager</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-orange p-16 md:p-24 rounded-sm text-center space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          
          <h2 className="text-4xl md:text-7xl font-bold text-white italic serif tracking-tight relative z-10">
            {t('about.cta.title')}
          </h2>
          <Link to="/contact" className="inline-block px-12 py-6 bg-brand-black text-white font-bold rounded-sm hover:bg-brand-black/90 transition-all uppercase tracking-widest text-xs relative z-10 shadow-2xl">
            {t('about.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-48 pb-32 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-16">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-black mb-8 italic serif tracking-tight leading-tight">{t('contact.title')}</h1>
            <div className="w-24 h-1 bg-brand-orange mb-10"></div>
            <p className="text-slate-500 text-lg font-light leading-relaxed">{t('contact.description')}</p>
          </div>
          
          <div className="space-y-10">
            <div className="flex items-start space-x-8 rtl:space-x-reverse">
              <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-brand-orange">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-brand-black font-bold mb-2 uppercase text-[10px] tracking-[0.2em]">{t('contact.emailUs')}</h4>
                <p className="text-slate-500 font-light">{t('contact.email')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-8 rtl:space-x-reverse">
              <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-brand-orange">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-brand-black font-bold mb-2 uppercase text-[10px] tracking-[0.2em]">{t('contact.visitUs')}</h4>
                <p className="text-slate-500 font-light leading-relaxed">{t('contact.address')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-8 rtl:space-x-reverse">
              <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-brand-orange">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-brand-black font-bold mb-2 uppercase text-[10px] tracking-[0.2em]">{t('contact.phone')}</h4>
                <p className="text-slate-500 font-light leading-relaxed">{t('contact.phoneNumber')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-8 rtl:space-x-reverse">
              <div className="p-5 bg-slate-50 rounded-sm border border-slate-100 text-brand-orange">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-brand-black font-bold mb-2 uppercase text-[10px] tracking-[0.2em]">{t('contact.website')}</h4>
                <a href={t('contact.websiteUrl')} target="_blank" rel="noopener noreferrer" className="text-slate-500 font-light hover:text-brand-orange transition-colors">{t('contact.websiteUrl')}</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-12 rounded-sm border border-slate-100 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [dir, i18n.language]);

  return (
    <Router>
      <div className={`min-h-screen bg-white text-slate-900 selection:bg-brand-orange selection:text-white ${dir === 'rtl' ? 'font-arabic' : ''}`} dir={dir}>
        <AnalyticsTracker />
        <ScrollToTop />
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/for-sale" element={<ForSalePage />} />
              <Route path="/investment" element={<InvestmentPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
