import { Search, LayoutGrid, User } from "lucide-react";
import { View } from "../types";
import { Button } from "./ui/button";

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E1D8] bg-[#F5F3EF]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex cursor-pointer items-center space-x-2" 
          onClick={() => onViewChange('explore')}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A67C52]">
            <LayoutGrid className="h-5 w-5 text-[#F5F3EF]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1C1C1C]">SkillMatch</span>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Button 
            variant={currentView === 'explore' ? 'default' : 'ghost'} 
            onClick={() => onViewChange('explore')}
            className="rounded-full"
          >
            Explore
          </Button>
          <Button 
            variant={currentView === 'profile' || currentView === 'edit-profile' ? 'default' : 'ghost'} 
            onClick={() => onViewChange('profile')}
            className="rounded-full"
          >
            My Profile
          </Button>
        </nav>

        <div className="flex items-center space-x-2">
           <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={() => onViewChange('explore')}>
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full border-[#E5E1D8]"
            onClick={() => onViewChange('profile')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}