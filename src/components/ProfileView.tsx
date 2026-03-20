import { Student } from "../types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Edit, Mail, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileViewProps {
  student: Student;
  onEdit: () => void;
}

export function ProfileView({ student, onEdit }: ProfileViewProps) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-24">
          <div className="h-48 w-full rounded-3xl bg-gradient-to-r from-[#A67C52] to-[#6B6B6B] opacity-10"></div>
          <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row md:items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-[#F5F3EF] shadow-xl">
              <AvatarImage src={student.avatar} className="object-cover" />
              <AvatarFallback className="text-3xl bg-[#E9E4DB] text-[#A67C52]">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mb-4">
              <h1 className="text-3xl font-extrabold text-[#1C1C1C]">{student.name}</h1>
              <div className="flex items-center gap-4 text-[#6B6B6B] mt-1">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <GraduationCap className="h-4 w-4 text-[#A67C52]" /> {student.major || "Student"}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-[#A67C52]" /> University Campus
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-12 right-8">
            <Button onClick={onEdit} className="rounded-full shadow-lg h-12 px-6">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C1C1C]">
                About Me
              </h2>
              <Card className="border-[#E5E1D8] bg-white">
                <CardContent className="p-6">
                  <p className="text-[#6B6B6B] leading-relaxed">
                    {student.bio || "No bio added yet. Tell others what you're working on!"}
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C1C1C]">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {student.skills.map(skill => (
                  <Badge key={skill} className="px-4 py-2 text-sm bg-[#A67C52]/10 text-[#A67C52] border-none hover:bg-[#A67C52]/20 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1C1C1C]">
                Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {student.interests.map(interest => (
                  <Badge key={interest} variant="secondary" className="px-4 py-2 text-sm bg-[#E9E4DB] text-[#6B6B6B] border-none">
                    {interest}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="border-[#E5E1D8] bg-white">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-[#1C1C1C]">Contact Info</h3>
                {student.contact ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#6B6B6B]">
                      <Mail className="h-5 w-5 text-[#A67C52]" />
                      <span className="text-sm truncate">{student.contact}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-2 border-[#E5E1D8]" asChild>
                      <a href={`mailto:${student.contact}`}>
                        Send Email <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-[#6B6B6B] italic">No contact information provided.</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-[#A67C52]/20 bg-[#A67C52]/5">
              <CardContent className="p-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#A67C52] mb-4">Platform Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Connections</span>
                    <span className="font-bold text-[#1C1C1C]">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Active Projects</span>
                    <span className="font-bold text-[#1C1C1C]">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Member since</span>
                    <span className="font-bold text-[#1C1C1C]">Oct 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}