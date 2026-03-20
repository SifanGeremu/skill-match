import { useState, useMemo } from "react";
import { mockStudents } from "../data/mockStudents";
import { StudentCard } from "./StudentCard";
import { Input } from "./ui/input";
import { Search, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export function Explore() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    mockStudents.forEach(s => s.skills.forEach(skill => skills.add(skill)));
    return Array.from(skills).sort();
  }, []);

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                           student.bio.toLowerCase().includes(search.toLowerCase()) ||
                           student.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesSkill = !selectedSkill || student.skills.includes(selectedSkill);
      
      return matchesSearch && matchesSkill;
    });
  }, [search, selectedSkill]);

  return (
    <div className="space-y-8">
      <header className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1C1C1C] sm:text-5xl">
            Find your next <span className="text-[#A67C52] italic font-serif">teammate</span>
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl">
            Discover students with the skills you need for your next project, competition, or startup.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B6B6B]" />
            <Input 
              placeholder="Search by name, skill, or bio..." 
              className="pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Badge 
              variant={selectedSkill === null ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap px-4 py-2 border-[#E5E1D8]"
              onClick={() => setSelectedSkill(null)}
            >
              All Skills
            </Badge>
            {allSkills.slice(0, 8).map(skill => (
              <Badge 
                key={skill}
                variant={selectedSkill === skill ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap px-4 py-2 border-[#E5E1D8]"
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {filteredStudents.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-[#E9E4DB] p-4">
            <Sparkles className="h-8 w-8 text-[#6B6B6B]" />
          </div>
          <h3 className="text-lg font-semibold">No students found</h3>
          <p className="text-[#6B6B6B]">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}