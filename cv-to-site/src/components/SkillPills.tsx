import { Code, Languages, Zap, TrendingUp } from 'lucide-react';
import type { ResumeData } from '@/lib/resume';

interface SkillPillsProps {
  skills: ResumeData['skills'];
  languages?: ResumeData['languages'];
}

export function SkillPills({ skills, languages }: SkillPillsProps) {
  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'expert': 
        return {
          color: 'from-emerald-500 to-teal-600',
          bg: 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-700',
          width: 'w-full'
        };
      case 'advanced': 
        return {
          color: 'from-blue-500 to-indigo-600',
          bg: 'bg-blue-50 border-blue-200', 
          text: 'text-blue-700',
          width: 'w-4/5'
        };
      case 'intermediate': 
        return {
          color: 'from-amber-500 to-orange-600',
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-700',
          width: 'w-3/5'
        };
      case 'beginner': 
        return {
          color: 'from-gray-500 to-slate-600',
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-700',
          width: 'w-2/5'
        };
      default: 
        return {
          color: 'from-gray-500 to-slate-600',
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-700',
          width: 'w-2/5'
        };
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-200 to-transparent rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-transparent rounded-full filter blur-3xl opacity-30"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            Yetenekler & Diller
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Teknik <span className="gradient-text">Yeteneklerim</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Edindiğim teknik beceriler ve yetkinlik seviyelerim
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Teknik Yetenekler</h3>
                <p className="text-gray-600">Yazılım ve araçlar</p>
              </div>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => {
                const config = getLevelConfig(skill.level);
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {skill.level === 'intermediate' ? 'Orta' : 
                         skill.level === 'advanced' ? 'İleri' :
                         skill.level === 'expert' ? 'Uzman' : 'Başlangıç'}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`bg-gradient-to-r ${config.color} h-3 rounded-full ${config.width} transition-all duration-1000 ease-out shadow-lg`}
                        ></div>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full opacity-20 animate-pulse`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages & Additional Info */}
          <div className="space-y-8">
            {languages && languages.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Languages className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dil Yetkinlikleri</h3>
                    <p className="text-gray-600">İletişim becerileri</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="group bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50 hover:border-green-300 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {lang.language.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {lang.language}
                          </span>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {lang.fluency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={32} className="text-white" />
                <div>
                  <h3 className="text-2xl font-bold">Gelişim Durumu</h3>
                  <p className="text-indigo-100">Sürekli öğrenmeye devam ediyorum</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">{skills.length}</div>
                  <div className="text-sm text-indigo-100">Teknik Yetenek</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold mb-1">{languages?.length || 0}</div>
                  <div className="text-sm text-indigo-100">Dil Bilgisi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
