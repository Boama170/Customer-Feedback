 /* eslint-disable @typescript-eslint/no-unused-vars */ 
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CompanyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    
    toast.error("Adding new companies will be available when backend is integrated.", {
      description: "This feature is currently disabled.",
      duration: 3000,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter company name"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input 
              id="slug" 
              name="slug" 
              placeholder="company-name"
              required 
              pattern="[a-z0-9-]+" 
            />
            <p className="text-sm text-muted-foreground">
              Only lowercase letters, numbers, and hyphens
            </p>
          </div>
          <Button type="submit" className="w-full">
            Add Company
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}