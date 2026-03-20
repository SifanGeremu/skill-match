import { Student } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const handleConnect = () => {
    toast.success(`Connection request sent to ${student.name}!`, {
      description: "We've notified them that you're interested in collaborating.",
      duration: 3000,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden border-[#E5E1D8] bg-white">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4">
          <Avatar className="h-16 w-16 border-2 border-[#F5F3EF] shadow-sm group-hover:scale-105 transition-transform">
            <AvatarImage src={student.avatar} alt={student.name} className="object-cover" />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-[#1C1C1C] leading-tight group-hover:text-[#A67C52] transition-colors">
              {student.name}
            </h3>
            <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
              {student.major}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <p className="text-sm text-[#6B6B6B] line-clamp-3 leading-relaxed">
            {student.bio}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-[10px] bg-[#F1EFE9] text-[#6B6B6B] border-none">
                {skill}
              </Badge>
            ))}
            {student.skills.length > 4 && (
              <Badge variant="outline" className="px-2 py-0.5 text-[10px] border-[#E5E1D8] text-[#6B6B6B]">
                +{student.skills.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t border-[#E5E1D8]/50 mt-auto bg-[#FAFAFA]/50 px-6 py-4">
          <Button 
            className="w-full font-semibold" 
            variant="default"
            onClick={handleConnect}
          >
            Connect
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}