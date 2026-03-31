import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Bed, Bath, Calendar, Ruler, Building2, Paintbrush, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PropertyDetailsModalProps {
  property: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetailsModal({ property, isOpen, onClose }: PropertyDetailsModalProps) {
  const { t } = useTranslation();
  if (!property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-white border border-slate-100 rounded-sm overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-10 p-3 bg-white/50 hover:bg-brand-orange hover:text-white text-brand-black rounded-full transition-all backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto relative">
                <img
                  src={property.images[0] || "https://picsum.photos/seed/house/800/600"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 rtl:left-auto rtl:right-8">
                  <span className="px-6 py-2 bg-brand-orange text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-xl">
                    {property.type}
                  </span>
                </div>
              </div>

              <div className="p-10 lg:p-16 space-y-10">
                <div>
                  <h2 className="text-4xl font-bold text-brand-black mb-4 italic serif tracking-tight">
                    {property.title}
                  </h2>
                  <div className="flex items-center text-slate-500 text-lg font-light">
                    <MapPin className="w-6 h-6 mx-3 text-brand-orange" />
                    {property.location}
                  </div>
                </div>

                <div className="text-5xl font-bold text-brand-orange serif italic">
                  ${property.price.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-10 border-y border-slate-100">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                      <Bed className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-brand-black font-bold text-lg">{property.bedrooms}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t('common.beds')}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                      <Bath className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-brand-black font-bold text-lg">{property.bathrooms}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t('common.baths')}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100">
                      <Calendar className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <div className="text-brand-black font-bold text-lg">{property.yearBuilt}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{t('common.yearBuilt')}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{t('common.description')}</h4>
                  <p className="text-slate-500 leading-relaxed font-light">
                    {t('common.propertyDescription')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <button className="flex-1 py-5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-sm transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse uppercase tracking-widest text-xs shadow-lg">
                    <DollarSign className="w-5 h-5" />
                    <span>{t('common.makeOffer')}</span>
                  </button>
                  <button className="flex-1 py-5 bg-brand-black hover:bg-brand-orange text-white font-bold rounded-sm transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse uppercase tracking-widest text-xs shadow-lg">
                    <Paintbrush className="w-5 h-5" />
                    <span>{t('common.requestCustomization')}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
