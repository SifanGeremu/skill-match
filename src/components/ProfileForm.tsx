import { useState } from "react";
import { Student } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { X, Plus, Save } from "lucide-react";

interface ProfileFormProps {
  initialData: Student;
  onSave: (data: Student) => void;
  onCancel: () => void;
}

export function ProfileForm({ initialData, onSave, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<Student>(initialData);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({ ...formData, interests: [...formData.interests, newInterest.trim()] });
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="border-[#E5E1D8] bg-white shadow-xl shadow-black/5">
        <CardHeader className="border-b border-[#E5E1D8]/50 px-8 py-6">
          <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major / Field of Study</Label>
                <Input 
                  id="major" 
                  value={formData.major || ""} 
                  onChange={e => setFormData({...formData, major: e.target.value})}
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea 
                id="bio"
                className="flex min-h-[120px] w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-[#6B6B6B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A67C52] disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself and what you're looking for..."
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input 
                  value={newSkill} 
                  onChange={e => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g. Python, Figma)"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <Button type="button" size="icon" onClick={handleAddSkill} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1 bg-[#A67C52]/10 text-[#A67C52] text-sm font-medium rounded-full">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

             <div className="space-y-4">
              <Label>Interests</Label>
              <div className="flex gap-2">
                <Input 
                  value={newInterest} 
                  onChange={e => setNewInterest(e.target.value)}
                  placeholder="Add an interest (e.g. AI, Music)"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                />
                <Button type="button" size="icon" onClick={handleAddInterest} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map(interest => (
                  <span key={interest} className="flex items-center gap-1.5 px-3 py-1 bg-[#E9E4DB] text-[#6B6B6B] text-sm font-medium rounded-full">
                    {interest}
                    <button type="button" onClick={() => removeInterest(interest)} className="hover:text-red-500 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Method (Email or Social)</Label>
              <Input 
                id="contact" 
                value={formData.contact || ""} 
                onChange={e => setFormData({...formData, contact: e.target.value})}
                placeholder="your@email.com or @handle"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 font-bold">
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}