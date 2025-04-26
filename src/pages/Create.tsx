import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Download, Share } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { saveImage, getAllImages } from "@/utils/imageStorage";
import axios from "axios";

const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const generateImage = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${SUPABASE_FUNCTION_URL}/functions/v1/generate-image`,
      {
        model: "black-forest-labs/flux",
        prompt,
        response_format: "b64_json",
        response_extension: "png",
        width: 1024,
        height: 1024,
        num_inference_steps: 28,
        seed: -1,
        negative_prompt: "",
      },
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const base64Image = response.data?.image; // Use the image field from the response

    if (!base64Image) throw new Error("No image data received");

    return base64Image; // Return base64 image directly
  } catch (err) {
    console.error("Error generating image:", err);
    throw err;
  }
};

const Create = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]); // To store previous images and prompts
  const { toast } = useToast();

  // Handle prompt input change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description to generate an image.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);

      // Save the image to storage with prompt
      const newImage = {
        id: uuidv4(),
        url: imageUrl,
        prompt,
        createdAt: new Date().toISOString(),
      };
      setHistory((prevHistory) => [newImage, ...prevHistory]);

      toast({
        title: "Image created successfully",
        description: "Your image has been generated.",
      });
    } catch (error) {
      toast({
        title: "Error generating image",
        description: "There was a problem creating your image. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle image download
  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    });
  };

  // Handle image sharing
  const handleShare = () => {
    if (!generatedImage) return;

    navigator.clipboard.writeText(generatedImage);

    toast({
      title: "Link copied!",
      description: "Image link has been copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Create Your Image
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe what you want to see in detail. The more specific your
            prompt, the better the results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass p-6 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="prompt"
                  className="block text-sm font-medium mb-2 text-muted-foreground"
                >
                  Your Prompt
                </label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder="Enter a detailed description of the image you want to create... (e.g. 'A magical forest with glowing mushrooms and fairy lights at dusk')"
                  className="h-32 bg-dreamdark-lighter border-white/10 placeholder:text-muted-foreground/70"
                />
              </div>

              <Button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader size={16} className="mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </form>
          </Card>

          {/* Result Section */}
          <Card className="glass border-white/10 flex flex-col">
            <div className="flex-1 p-6">
              <div className="text-sm font-medium mb-2 text-muted-foreground">
                Result
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-dreamdark-lighter border border-white/5 flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <Loader size={40} className="text-purple-400 animate-spin mb-4" />
                    <p className="text-muted-foreground mb-2">Creating your masterpiece...</p>
                    <p className="text-xs text-muted-foreground/70">
                      This may take a moment
                    </p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt={prompt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground mb-1">No image generated yet</p>
                    <p className="text-xs text-muted-foreground/70">
                      Enter a prompt and click Generate
                    </p>
                  </div>
                )}
              </div>
            </div>

            {generatedImage && (
              <div className="p-6 border-t border-white/5">
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex gap-2 items-center"
                  >
                    <Download size={16} /> Download
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 border-white/20 hover:bg-white/5 flex gap-2 items-center"
                  >
                    <Share size={16} /> Share
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* History Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gradient mb-4">History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {history.length > 0 ? (
              history.map((image) => (
                <Card key={image.id} className="glass p-6 border-white/10">
                  <div className="text-sm font-medium mb-2 text-muted-foreground">
                    {image.prompt}
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-dreamdark-lighter border border-white/5 flex items-center justify-center">
                    <img src={image.url} alt={image.prompt} className="w-full h-full object-cover" />
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-6">
                <p className="text-muted-foreground mb-1">No history available</p>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gradient mb-4">Suggestions for Better Results</h3>
          <div className="p-6 border rounded-lg bg-dreamdark-lighter border-white/10">
            <ul className="list-disc pl-6">
              <li>Be as specific as possible in your description for more accurate results.</li>
              <li>Try mentioning colors, settings, and time of day for more detailed images.</li>
              <li>Avoid overly complex descriptions; focus on key elements for clarity.</li>
              <li>Use keywords like 'realistic,' 'fantasy,' or 'cartoon' to guide the style of the image.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
