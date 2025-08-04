import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Video, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  year: number;
  type: 'pdf' | 'video';
  fileUrl?: string;
  videoUrl?: string;
  uploadDate: string;
}

const AdminDashboard = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true);
    // TODO: Connect to Java backend API
    setTimeout(() => {
      const newMaterial: StudyMaterial = {
        id: Date.now().toString(),
        title: formData.get('title') as string,
        subject: formData.get('subject') as string,
        year: parseInt(formData.get('year') as string),
        type: formData.get('type') as 'pdf' | 'video',
        fileUrl: formData.get('type') === 'pdf' ? 'mock-url' : undefined,
        videoUrl: formData.get('type') === 'video' ? formData.get('videoUrl') as string : undefined,
        uploadDate: new Date().toISOString(),
      };
      setMaterials([...materials, newMaterial]);
      setIsUploading(false);
      toast({
        title: "Success",
        description: "Study material uploaded successfully!",
      });
    }, 1000);
  };

  const UploadForm = () => {
    const [materialType, setMaterialType] = useState<'pdf' | 'video'>('pdf');

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Upload Study Material
          </CardTitle>
          <CardDescription>Add new study materials for students</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            formData.set('type', materialType);
            handleUpload(formData);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="e.g., Data Structures - Linked Lists" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="e.g., Data Structures" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Engineering Year</Label>
              <Select name="year" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Material Type</Label>
              <Tabs value={materialType} onValueChange={(value) => setMaterialType(value as 'pdf' | 'video')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pdf">PDF Document</TabsTrigger>
                  <TabsTrigger value="video">Video Link</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pdf" className="space-y-2">
                  <Label htmlFor="file">Upload PDF</Label>
                  <Input id="file" name="file" type="file" accept=".pdf" required />
                </TabsContent>
                
                <TabsContent value="video" className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input id="videoUrl" name="videoUrl" placeholder="https://youtube.com/watch?v=..." required />
                </TabsContent>
              </Tabs>
            </div>
            
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Material"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <UploadForm />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>Recently uploaded study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No materials uploaded yet</p>
                ) : (
                  materials.map((material) => (
                    <div key={material.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {material.type === 'pdf' ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : (
                          <Video className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{material.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {material.subject} • Year {material.year}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(material.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;