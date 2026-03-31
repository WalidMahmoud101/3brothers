import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand-black pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative flex items-center justify-center">
                <div className="flex items-center space-x-0.5" dir="ltr">
                  <div className="text-brand-orange font-bold text-3xl leading-none">3</div>
                  <div className="flex flex-col items-center -space-y-1">
                    <div className="w-0.5 h-1.5 bg-white"></div>
                    <div className="w-5 h-8 border-x-2 border-white flex flex-col justify-between py-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-0.5 bg-white/20"></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-brand-orange font-bold text-3xl leading-none">B</div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight leading-tight uppercase">
                  {t('hero.companyNameFirst')}
                </span>
                <span className="text-[8px] font-bold text-brand-orange tracking-[0.2em] uppercase leading-tight">
                  {t('hero.companyNameSecond')}
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a 
                href="https://www.facebook.com/3BrothersCo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/GazaOil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><Link to="/" className="hover:text-brand-orange transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/projects" className="hover:text-brand-orange transition-colors">{t('nav.projects')}</Link></li>
              <li><Link to="/for-sale" className="hover:text-brand-orange transition-colors">{t('nav.forSale')}</Link></li>
              <li><Link to="/investment" className="hover:text-brand-orange transition-colors">{t('nav.investment')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">{t('footer.services')}</h4>
            <div className="flex flex-wrap gap-2">
              <Link 
                to="/projects" 
                className="px-4 py-2 bg-white/5 hover:bg-brand-orange hover:text-white transition-all rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                {t('services.residential.title')}
              </Link>
              <Link 
                to="/projects" 
                className="px-4 py-2 bg-white/5 hover:bg-brand-orange hover:text-white transition-all rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                {t('services.commercial.title')}
              </Link>
              <Link 
                to="/projects" 
                className="px-4 py-2 bg-white/5 hover:bg-brand-orange hover:text-white transition-all rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                {t('services.renovation.title')}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-[0.3em]">{t('footer.contact')}</h4>
            <ul className="space-y-6 text-sm text-slate-400 font-light">
              <li className="flex items-start space-x-4 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center space-x-4 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{t('contact.phoneNumber')}</span>
              </li>
              <li className="flex items-center space-x-4 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <span>{t('contact.email')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            © 2026 {t('hero.companyNameFirst')} {t('hero.companyNameSecond')}. {t('footer.rights')}
          </p>
          <div className="flex space-x-8 rtl:space-x-reverse text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
