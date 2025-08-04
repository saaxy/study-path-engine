import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Play, FileText, Video, Filter } from "lucide-react";

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

// Mock data - will be replaced with API calls to Java backend
const mockMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    subject: 'Data Structures',
    year: 2,
    type: 'pdf',
    fileUrl: '#',
    uploadDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Algorithms Complexity Analysis',
    subject: 'Algorithms',
    year: 2,
    type: 'video',
    videoUrl: '#',
    uploadDate: '2024-01-16',
  },
  {
    id: '3',
    title: 'Object Oriented Programming Concepts',
    subject: 'OOP',
    year: 2,
    type: 'pdf',
    fileUrl: '#',
    uploadDate: '2024-01-17',
  },
  {
    id: '4',
    title: 'Database Design Principles',
    subject: 'Database Systems',
    year: 3,
    type: 'pdf',
    fileUrl: '#',
    uploadDate: '2024-01-18',
  },
  {
    id: '5',
    title: 'Network Security Fundamentals',
    subject: 'Computer Networks',
    year: 3,
    type: 'video',
    videoUrl: '#',
    uploadDate: '2024-01-19',
  },
];

const StudentDashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Filter materials based on selected year, search term, and subject
  const filteredMaterials = useMemo(() => {
    let filtered = mockMaterials.filter(material => material.year === selectedYear);

    if (searchTerm) {
      filtered = filtered.filter(material =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(material => material.subject === selectedSubject);
    }

    return filtered;
  }, [selectedYear, searchTerm, selectedSubject]);

  // Get unique subjects for the selected year
  const availableSubjects = useMemo(() => {
    const subjects = mockMaterials
      .filter(material => material.year === selectedYear)
      .map(material => material.subject);
    return [...new Set(subjects)];
  }, [selectedYear]);

  const handleDownload = (material: StudyMaterial) => {
    // TODO: Connect to Java backend for file download
    console.log('Downloading:', material.title);
  };

  const handleViewVideo = (material: StudyMaterial) => {
    // TODO: Open video in new tab or modal
    console.log('Viewing video:', material.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Year Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Your Engineering Year</CardTitle>
            <CardDescription>Choose your current year to view available study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((year) => (
                <Button
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  onClick={() => setSelectedYear(year)}
                  className="h-16"
                >
                  <div className="text-center">
                    <div className="text-lg font-bold">{year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'}</div>
                    <div className="text-sm">Year</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Materials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="md:w-48">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {availableSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials List */}
        <Card>
          <CardHeader>
            <CardTitle>Study Materials - Year {selectedYear}</CardTitle>
            <CardDescription>
              {filteredMaterials.length} material{filteredMaterials.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedSubject !== 'all' && ` in ${selectedSubject}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  {searchTerm || selectedSubject !== 'all' ? 
                    'No materials found matching your search criteria.' : 
                    'No study materials available for this year yet.'
                  }
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredMaterials.map((material) => (
                  <div key={material.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-shrink-0">
                      {material.type === 'pdf' ? (
                        <FileText className="h-8 w-8 text-red-500" />
                      ) : (
                        <Video className="h-8 w-8 text-blue-500" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{material.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{material.subject}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Uploaded: {new Date(material.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {material.type === 'pdf' ? (
                        <Button onClick={() => handleDownload(material)} size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      ) : (
                        <Button onClick={() => handleViewVideo(material)} size="sm" variant="secondary">
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentDashboard;