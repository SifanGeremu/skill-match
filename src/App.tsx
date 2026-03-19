import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Explore } from "./components/Explore";
import { ProfileView } from "./components/ProfileView";
import { ProfileForm } from "./components/ProfileForm";
import { Student, View } from "./types";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

const INITIAL_USER: Student = {
  id: "current-user",
  name: "Alex Thompson",
  bio: "Full-stack developer student interested in AI and sustainability. Looking for a designer to partner with.",
  avatar: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5a79ee3f-624c-4d7a-a272-c967352d32d8/student5-b8338c94-1773838204410.webp",
  skills: ["React", "TypeScript", "UI/UX"],
  interests: ["Clean Energy", "Machine Learning", "Hackathons"],
  contact: "alex@university.edu",
  major: "Computer Science"
};

function App() {
  const [view, setView] = useState<View>('explore');
  const [userProfile, setUserProfile] = useState<Student>(() => {
    const saved = localStorage.getItem('skillmatch_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  useEffect(() => {
    localStorage.setItem('skillmatch_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleUpdateProfile = (updated: Student) => {
    setUserProfile(updated);
    setView('profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#1C1C1C] selection:bg-[#A67C52]/20">
      <Header currentView={view} onViewChange={setView} />
      
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {view === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Explore />
            </motion.div>
          )}

          {view === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileView 
                student={userProfile} 
                onEdit={() => setView('edit-profile')} 
              />
            </motion.div>
          )}

          {view === 'edit-profile' && (
            <motion.div
              key="edit-profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileForm 
                initialData={userProfile} 
                onSave={handleUpdateProfile}
                onCancel={() => setView('profile')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-[#E5E1D8] mt-20 py-12 bg-white/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="h-6 w-6 rounded bg-[#A67C52]"></div>
            <span className="text-lg font-bold">SkillMatch</span>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Connecting students for the next generation of projects.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-[#6B6B6B]">
            <a href="#" className="hover:text-[#A67C52] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#A67C52] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#A67C52] transition-colors">Support</a>
          </div>
          <p className="mt-8 text-xs text-[#A67C52]/60">
            &copy; {new Date().getFullYear()} SkillMatch Platform. All rights reserved.
          </p>
        </div>
      </footer>
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;