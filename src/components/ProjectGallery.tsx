import { Play, Image as ImageIcon, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  media: { url: string; type: "image" | "video" | "youtube" }[];
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-sm overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={project.media[0].type === "youtube" 
                  ? `https://img.youtube.com/vi/${project.media[0].url.split('v=')[1]?.split('&')[0] || project.media[0].url.split('/').pop()}/maxresdefault.jpg`
                  : project.media[0].url
                }
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {project.media.some(m => m.type === "youtube" || m.type === "video") ? (
                  <button 
                    onClick={() => {
                      const video = project.media.find(m => m.type === "youtube" || m.type === "video");
                      if (video?.type === "youtube") {
                        setSelectedVideo(getYoutubeEmbedUrl(video.url));
                      }
                    }}
                    className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                ) : (
                  <div className="p-4 bg-white/80 backdrop-blur-md rounded-full text-brand-black">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                {project.media.some(m => m.type === "video" || m.type === "youtube") && (
                  <div className="p-2 bg-brand-orange rounded-full text-white shadow-lg">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                )}
                <div className="p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-black shadow-lg">
                  <ImageIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em]">{project.category}</span>
                <button className="text-slate-400 hover:text-brand-orange transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-3 italic serif group-hover:text-brand-orange transition-colors">{project.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 font-light leading-relaxed">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-black/90 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
