import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userType: 'student' | 'admin') => {
    setIsLoading(true);
    // TODO: Connect to Java backend authentication
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = userType === 'admin' ? '/admin' : '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">EngiLearn</CardTitle>
          <CardDescription>Engineering Study Materials Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-email">Email</Label>
                <Input id="student-email" type="email" placeholder="student@college.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input id="student-password" type="password" />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('student')}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Student"}
              </Button>
            </TabsContent>
            
            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@college.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" />
              </div>
              <Button 
                className="w-full" 
                onClick={() => handleLogin('admin')}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in as Admin"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;