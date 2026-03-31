import { MapPin, Bed, Bath, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface PropertyProps {
  property: any;
  onViewDetails: (property: any) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-100 rounded-sm overflow-hidden group shadow-sm hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0] || "https://picsum.photos/seed/house/800/600"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <span className="px-4 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm border border-slate-100 shadow-xl">
          <span className="text-brand-orange font-bold text-lg">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold text-brand-black mb-3 group-hover:text-brand-orange transition-colors italic serif">
          {property.title}
        </h3>
        <div className="flex items-center text-slate-500 text-sm mb-6">
          <MapPin className="w-4 h-4 mx-2 text-brand-orange" />
          {property.location}
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-100">
          <div className="flex flex-col items-center">
            <Bed className="w-5 h-5 text-slate-400 mb-2" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{property.bedrooms} {t('common.beds')}</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-5 h-5 text-slate-400 mb-2" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{property.bathrooms} {t('common.baths')}</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-5 h-5 text-slate-400 mb-2" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{property.yearBuilt}</span>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails(property)}
          className="w-full mt-6 py-4 bg-brand-black hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md"
        >
          {t('common.viewDetails')}
        </button>
      </div>
    </motion.div>
  );
}
