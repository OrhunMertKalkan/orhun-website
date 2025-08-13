import { Calendar, MapPin, Briefcase, ChevronRight, Star } from 'lucide-react';
import type { ResumeData } from '@/lib/resume';

interface ExperienceListProps {
  work: ResumeData['work'];
}

export function ExperienceList({ work }: ExperienceListProps) {
  const formatDate = (dateString: string) => {
    if (dateString === 'present') return 'Devam ediyor';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Briefcase size={16} />
            Profesyonel Deneyim
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            İş <span className="gradient-text">Deneyimlerim</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finans sektöründe edindiğim deneyimler ve başarılarım
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
            
            {work.map((job, index) => (
              <div key={index} className="relative pl-20 pb-16 last:pb-0 group">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                
                {/* Experience Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200/50 group-hover:border-purple-200 transform hover:-translate-y-2">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {job.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {job.position}
                          </h3>
                          <p className="text-lg text-blue-600 font-semibold">
                            {job.name}
                          </p>
                        </div>
                      </div>
                      
                      {job.location && (
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin size={16} className="text-purple-500" />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 rounded-xl mt-4 lg:mt-0">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-purple-500" />
                        <span className="font-medium text-sm">
                          {formatDate(job.startDate)} - {formatDate(job.endDate || 'present')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {job.summary}
                  </p>
                  
                  {/* Achievements */}
                  {job.highlights.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Star className="text-yellow-500" size={18} />
                        Temel Başarılar
                      </h4>
                      <div className="grid gap-3">
                        {job.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/item">
                            <div className="mt-1 p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                              <ChevronRight size={12} className="text-white" />
                            </div>
                            <span className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Connection Line to Next Item */}
                {index !== work.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-transparent opacity-30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
