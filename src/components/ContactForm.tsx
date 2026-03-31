import { useState } from "react";
import { api } from "@/src/lib/api";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.submitInquiry({
        ...formData,
        phone: "", // Not in current form UI but required by interface
        projectType: "General Inquiry"
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-slate-100 p-10 rounded-sm shadow-xl">
      <h2 className="text-4xl font-bold text-brand-black mb-6 italic serif tracking-tight">
        {t('contact.form.title').split(' ')[0]} <span className="text-brand-orange">{t('contact.form.title').split(' ').slice(1).join(' ')}</span>
      </h2>
      <p className="text-slate-500 mb-10 font-light leading-relaxed">{t('contact.form.subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mx-1">{t('contact.form.name')}</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-brand-black focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-slate-300 font-light"
            placeholder={t('contact.form.placeholderName')}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mx-1">{t('contact.form.email')}</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-brand-black focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-slate-300 font-light"
            placeholder={t('contact.form.placeholderEmail')}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mx-1">{t('contact.form.message')}</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 text-brand-black focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-slate-300 font-light resize-none"
            placeholder={t('contact.form.placeholderMessage')}
          />
        </div>

        <button
          disabled={status === "sending"}
          className="w-full py-5 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-sm transition-all flex items-center justify-center space-x-3 rtl:space-x-reverse disabled:opacity-50 uppercase tracking-[0.3em] text-xs shadow-lg group"
        >
          {status === "sending" ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{t('contact.form.send')}</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 rtl:space-x-reverse text-green-600 bg-green-50 p-5 rounded-sm border border-green-100"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{t('contact.form.success')}</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 rtl:space-x-reverse text-red-600 bg-red-50 p-5 rounded-sm border border-red-100"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{t('contact.form.error')}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
