
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Download, Share, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllImages, deleteImage } from "@/utils/imageStorage";

interface ImageItem {
  id: string;
  url: string;
  prompt: string;
  createdAt: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([]);
  
  // This would come from Supabase and Stripe in the real implementation
  const [userStats, setUserStats] = useState({
    plan: "Free",
    imagesUsedToday: 1,
    imagesLimit: 3,
    totalImagesCreated: 24
  });

  useEffect(() => {
    const loadImages = async () => {
      const storedImages = await getAllImages();
      setImages(storedImages);
      if (storedImages.length > 0) {
        setUserStats(prev => ({
          ...prev,
          totalImagesCreated: storedImages.length,
          imagesUsedToday: Math.min(storedImages.length, prev.imagesLimit)
        }));
      }
    };

    loadImages();
  }, []);

  const handleDownload = (image: ImageItem) => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `dreampixel-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    });
  };

  const handleShare = (id: string) => {
    const image = images.find(img => img.id === id);
    if (!image) return;
    
    // Copy the image URL to clipboard
    navigator.clipboard.writeText(image.url);
    
    toast({
      title: "Link copied!",
      description: "Image link has been copied to clipboard.",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImage(id);
      setImages(images.filter(img => img.id !== id));
      
      toast({
        title: "Image deleted",
        description: "The image has been removed from your gallery.",
      });
      
      setUserStats(prev => ({
        ...prev,
        totalImagesCreated: prev.totalImagesCreated - 1
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your creations and account
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white" asChild>
            <a href="/create">Create New Image</a>
          </Button>
        </div>

        {/* User Stats */}
        <div className="glass border border-white/10 p-6 mb-10 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Usage Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-dreamdark-lighter rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Current Plan</div>
              <div className="text-2xl font-semibold flex items-center">
                {userStats.plan}
                {userStats.plan === "Free" && (
                  <Button 
                    size="sm" 
                    className="ml-3 h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                    asChild
                  >
                    <a href="/pricing">Upgrade</a>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-dreamdark-lighter rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Images Used Today</div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl font-semibold">
                    {userStats.imagesUsedToday} / {userStats.imagesLimit}
                  </span>
                </div>
                <div className="w-full bg-dreamdark rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${(userStats.imagesUsedToday / userStats.imagesLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-dreamdark-lighter rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total Images Created</div>
              <div className="text-2xl font-semibold">{userStats.totalImagesCreated}</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <h2 className="text-xl font-semibold mb-6">Your Creations</h2>
        
        {images.length === 0 ? (
          <div className="glass text-center p-10 border border-white/10 rounded-lg">
            <p className="text-muted-foreground mb-4">You haven't created any images yet</p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
              <a href="/create">Create Your First Image</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(image => (
              <Card key={image.id} className="glass border border-white/10 overflow-hidden">
                <div className="aspect-square bg-dreamdark-lighter">
                  <img 
                    src={image.url} 
                    alt={image.prompt}
                    className="h-full w-full object-cover" 
                  />
                </div>
                
                <CardContent className="p-4">
                  <p className="text-sm line-clamp-2" title={image.prompt}>{image.prompt}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Created on {formatDate(image.createdAt)}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t border-white/5 p-3 flex gap-2">
                  <Button 
                    className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300"
                    onClick={() => handleDownload(image)}
                    size="sm"
                  >
                    <Download size={16} className="mr-1" />
                    <span>Download</span>
                  </Button>
                  <Button 
                    className="flex-1 bg-white/5 hover:bg-white/10"
                    onClick={() => handleShare(image.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Share size={16} className="mr-1" />
                    <span>Share</span>
                  </Button>
                  <Button 
                    onClick={() => handleDelete(image.id)} 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
