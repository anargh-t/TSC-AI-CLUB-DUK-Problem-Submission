// Problem Submission Form Component
// This component handles the submission of AI problem statements to the TCS AI Club
// Features include form validation, file uploads, and database integration

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

// Form validation schema using Zod
// Defines the structure and validation rules for the form data
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  affiliation: z.string().min(1, "Please select your affiliation"),
  contactEmail: z.string().email("Please enter a valid email"),
  problemTitle: z.string().min(5, "Problem title must be at least 5 characters"),
  problemDescription: z.string().min(20, "Problem description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  customCategory: z.string().optional(),
  additionalFilesLinks: z.string().optional(),
});

// TypeScript type derived from the Zod schema
type FormData = z.infer<typeof formSchema>;

const ProblemSubmissionForm = () => {
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Toast notification hook for user feedback
  const { toast } = useToast();

  // Initialize React Hook Form with Zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      affiliation: "",
      contactEmail: "",
      problemTitle: "",
      problemDescription: "",
      category: "",
      customCategory: "",
      additionalFilesLinks: "",
    },
  });

  // Form submission handler
  // Processes form data, validates it, and submits to Supabase
  const onSubmit = async (data: FormData) => {
    console.log("=== FORM SUBMISSION STARTED ===");
    console.log("Form data:", data);
    console.log("Form validation errors:", form.formState.errors);
    console.log("Form is dirty:", form.formState.isDirty);
    console.log("Form is valid:", form.formState.isValid);
    
    // Validate form before submission
    const isValid = await form.trigger();
    console.log("Form validation result:", isValid);
    
    if (!isValid) {
      console.log("Form validation failed");
      console.log("Validation errors:", form.formState.errors);
      toast({
        title: "Validation Error",
        description: "Please check all required fields and try again.",
        variant: "destructive",
      });
      return;
    }
    
    // Additional validation for custom category when "Other" is selected
    if (data.category === "Other" && (!data.customCategory || data.customCategory.trim().length < 2)) {
      console.log("Custom category validation failed");
      toast({
        title: "Validation Error",
        description: "Please enter a custom category (at least 2 characters).",
        variant: "destructive",
      });
      return;
    }
    
    // Set submission state to prevent multiple submissions
    setIsSubmitting(true);
    console.log("Setting isSubmitting to true");
    
    try {
      // Test Supabase connection before submitting data
      console.log("Testing Supabase connection...");
      const { data: testData, error: testError } = await supabase
        .from("problem_submissions")
        .select("id")
        .limit(1);
      
      if (testError) {
        console.error("Supabase connection test failed:", testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      
      console.log("Supabase connection successful");

      // Prepare data for database insertion
      // Convert camelCase to snake_case for database columns
      const submissionData = {
        name: data.name,
        affiliation: data.affiliation,
        contact_email: data.contactEmail,
        problem_title: data.problemTitle,
        problem_description: data.problemDescription,
        category: data.category === "Other" ? data.customCategory : data.category,
        additional_files_links: data.additionalFilesLinks || null,
      };

      console.log("Submitting data:", submissionData);

      // Insert data into Supabase database
      const { error } = await supabase
        .from("problem_submissions")
        .insert(submissionData);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Success feedback
      console.log("Submission successful");
      toast({
        title: "Problem Submitted Successfully!",
        description: "Thank you for your submission. Our team will review it and get back to you soon.",
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error submitting problem:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "There was an error submitting your problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Reset submission state
      console.log("Setting isSubmitting to false");
      setIsSubmitting(false);
    }
    console.log("=== FORM SUBMISSION ENDED ===");
  };

  // Predefined options for affiliation dropdown
  const affiliations = [
    "TCS Employee", 
    "DUK",
    "Academic Researcher",
    "Industry Professional",
    "Startup/Entrepreneur"
  ];

  // Predefined options for problem categories
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

  // Watch the selected category to conditionally show custom category field
  const selectedCategory = form.watch("category");

  return (
    // Main container with dark theme
    <div className="min-h-screen bg-black text-white">
      {/* Header section with navigation */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Back navigation link */}
        <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 sm:mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        {/* Form container with responsive design */}
        <div className="max-w-2xl mx-auto">
          {/* Page header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Submit Your Problem</h1>
            <p className="text-white/70 text-base sm:text-lg px-2">
              Share your AI challenge with our expert community
            </p>
          </div>

          {/* Form wrapper with glassmorphism effect */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-4 sm:space-y-6"
              >
                {/* Name and Affiliation fields in a grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name/Team Name field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Name / Team Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name or team name" 
                            {...field} 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Affiliation dropdown */}
                  <FormField
                    control={form.control}
                    name="affiliation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Affiliation *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm sm:text-base">
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

                {/* Contact Email field */}
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Contact Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Problem Title field */}
                <FormField
                  control={form.control}
                  name="problemTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Problem Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="A concise title for your problem statement" 
                          {...field} 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Problem Description textarea */}
                <FormField
                  control={form.control}
                  name="problemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Problem Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your problem in detail. Include the current situation, challenges you're facing, and what you hope to achieve."
                          className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category dropdown */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm sm:text-base">Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm sm:text-base">
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

                {/* Conditional Custom Category field - only shows when "Other" is selected */}
                {selectedCategory === "Other" && (
                  <FormField
                    control={form.control}
                    name="customCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm sm:text-base">Custom Category *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter a custom category" 
                            {...field} 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Additional Files/Links field */}
                <FormField
                  control={form.control}
                  name="additionalFilesLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-white text-sm sm:text-base">
                        <Upload className="w-4 h-4" />
                        Additional file links
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share any relevant documents, datasets, or links that provide more context (URLs, Google Drive links, etc.)"
                          className="min-h-[80px] bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm sm:text-base"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Privacy notice */}
                <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10">
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    <strong>Privacy Notice:</strong> Your information will only be used for club communications and project review. 
                    We respect your privacy and will not share your details with third parties without your consent.
                  </p>
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 text-sm sm:text-base" 
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