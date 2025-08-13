import { getResumeData } from '@/lib/resume';
import { ResumeHeader } from '@/components/ResumeHeader';
import { ExperienceList } from '@/components/ExperienceList';
import { SkillPills } from '@/components/SkillPills';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getResumeData();
  
  return {
    title: `${resume.basics.name} - ${resume.basics.label}`,
    description: resume.basics.summary,
    keywords: [
      resume.basics.label,
      ...resume.skills.map(s => s.name),
      'CV', 'özgeçmiş', 'portfolio'
    ].join(', '),
    openGraph: {
      title: `${resume.basics.name} - ${resume.basics.label}`,
      description: resume.basics.summary,
      type: 'profile',
    },
  };
}

export default async function Home() {
  const resume = await getResumeData();
  
  return (
    <main className="min-h-screen">
      <ResumeHeader basics={resume.basics} />
      <ExperienceList work={resume.work} />
      <SkillPills skills={resume.skills} languages={resume.languages} />
      
      {/* Education Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full filter blur-3xl opacity-10"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              Akademik Geçmiş
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Eğitim <span className="gradient-text">Hayatım</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akademik başarılarım ve eğitim geçmişim
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {resume.education.map((edu, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border border-gray-200/50 hover:border-indigo-200 transform hover:-translate-y-2">
                  {/* University Logo Placeholder */}
                  <div className="absolute -top-6 left-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl">
                      {edu.institution.charAt(0)}
                    </div>
                  </div>

                  <div className="pt-8">
                    {/* Institution */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                      {edu.institution}
                    </h3>
                    
                    {/* Degree Info */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex items-center gap-4 mb-4 lg:mb-0">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-100">
                          <p className="text-lg font-semibold text-indigo-700">
                            {edu.studyType}
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-100">
                          <p className="text-lg font-medium text-blue-700">
                            {edu.area}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-3 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                          <span className="font-semibold">
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    {edu.score && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="font-bold text-lg">{edu.score}</span>
                      </div>
                    )}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <svg className="w-20 h-20 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                      <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
