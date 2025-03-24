'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  return (
    <div className="w-full mt-24 flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center p-5 w-22 h-22 rounded-full bg-primary/10">
              <span className="text-4xl font-bold text-primary">404</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">Coming Soon....</h1>

            <p className="text-muted-foreground">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or go back to the homepage.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild variant="default">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <Button variant="outline" onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}