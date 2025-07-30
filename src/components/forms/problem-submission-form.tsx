import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  affiliation: z.string().min(1, "Please select your affiliation"),
  contactEmail: z.string().email("Please enter a valid email"),
  problemTitle: z.string().min(5, "Problem title must be at least 5 characters"),
  problemDescription: z.string().min(20, "Problem description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  additionalFilesLinks: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProblemSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      affiliation: "",
      contactEmail: "",
      problemTitle: "",
      problemDescription: "",
      category: "",
      additionalFilesLinks: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("problem_submissions")
        .insert({
          name: data.name,
          affiliation: data.affiliation,
          contact_email: data.contactEmail,
          problem_title: data.problemTitle,
          problem_description: data.problemDescription,
          category: data.category,
          additional_files_links: data.additionalFilesLinks || null,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Problem Submitted Successfully!",
        description: "Thank you for your submission. Our team will review it and get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting problem:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const affiliations = [
    "DUK Student",
    "TCS Employee", 
    "Academic Researcher",
    "Industry Professional",
    "Startup/Entrepreneur",
    "Other"
  ];

  const categories = [
    "AI/Machine Learning",
    "Data Science",
    "Computer Vision",
    "Natural Language Processing",
    "IoT/Edge Computing",
    "Robotics",
    "Blockchain",
    "Digital Transformation",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-8 py-8">
        <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Submit Your Problem</h1>
            <p className="text-white/70 text-lg">
              Share your AI challenge with our expert community
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Name / Team Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name or team name" 
                            {...field} 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="affiliation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Affiliation *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select your affiliation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-900 border-white/20 text-white">
                            {affiliations.map((affiliation) => (
                              <SelectItem 
                                key={affiliation} 
                                value={affiliation}
                                className="text-white hover:bg-white/10 focus:bg-white/10"
                              >
                                {affiliation}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Contact Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="problemTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Problem Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="A concise title for your problem statement" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Problem Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your problem in detail. Include the current situation, challenges you're facing, and what you hope to achieve."
                          className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select problem category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {categories.map((category) => (
                            <SelectItem 
                              key={category} 
                              value={category}
                              className="text-white hover:bg-white/10 focus:bg-white/10"
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalFilesLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-white">
                        <Upload className="w-4 h-4" />
                        Additional Files / Links
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share any relevant documents, datasets, or links that provide more context (URLs, Google Drive links, etc.)"
                          className="min-h-[80px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-white/70">
                    <strong>Privacy Notice:</strong> Your information will only be used for club communications and project review. 
                    We respect your privacy and will not share your details with third parties without your consent.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Problem Statement
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSubmissionForm; 