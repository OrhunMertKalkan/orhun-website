import { Mail, Phone, MapPin, Linkedin, Download, Sparkles } from 'lucide-react';
import type { ResumeData } from '@/lib/resume';

interface ResumeHeaderProps {
  basics: ResumeData['basics'];
}

export function ResumeHeader({ basics }: ResumeHeaderProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 float-animation">
              <Sparkles size={40} className="text-yellow-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            {basics.name}
          </h1>
          
          <div className="mb-8">
            <p className="text-2xl md:text-3xl mb-4 text-blue-100 font-light">
              {basics.label}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200 font-light">
            {basics.summary}
          </p>
          
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <a 
              href={`mailto:${basics.email}`}
              className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 glow-effect"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Mail size={20} className="text-blue-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium">{basics.email}</p>
                </div>
              </div>
            </a>

            <a 
              href={`tel:${basics.phone}`}
              className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 glow-effect"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Phone size={20} className="text-green-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Telefon</p>
                  <p className="text-sm font-medium">{basics.phone}</p>
                </div>
              </div>
            </a>

            <div className="group relative bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <MapPin size={20} className="text-purple-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-300 uppercase tracking-wide">Konum</p>
                  <p className="text-sm font-medium">{basics.location.city}</p>
                </div>
              </div>
            </div>

            {basics.profiles.map((profile) => (
              <a
                key={profile.network}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 p-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 glow-effect"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                    <Linkedin size={20} className="text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-300 uppercase tracking-wide">{profile.network}</p>
                    <p className="text-sm font-medium">Profil</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
              <div className="flex items-center gap-3">
                <Download size={20} />
                CV İndir
              </div>
            </button>
            <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              İletişime Geç
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
        </svg>
      </div>
    </section>
  );
}
