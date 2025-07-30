-- Create table for problem submissions
CREATE TABLE public.problem_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  problem_title TEXT NOT NULL,
  problem_description TEXT NOT NULL,
  category TEXT NOT NULL,
  context_industry TEXT,
  desired_outcome TEXT,
  additional_files_links TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'in_progress', 'solved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.problem_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for public submissions (anyone can insert)
CREATE POLICY "Anyone can submit problems" 
ON public.problem_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public viewing (anyone can view)
CREATE POLICY "Anyone can view problems" 
ON public.problem_submissions 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_problem_submissions_updated_at
BEFORE UPDATE ON public.problem_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();