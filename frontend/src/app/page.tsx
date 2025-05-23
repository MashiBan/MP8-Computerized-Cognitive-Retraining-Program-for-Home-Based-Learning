import { Button } from "@/components/ui/button"; // Adjust path based on your setup
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Adjust path
import Image from "next/image";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ColourfulText} from "@/components/ui/colourful-text";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
// import { Boxes } from "../components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { Lightbulb, BarChart, BrainCircuit,} from "lucide-react"; // Example icons

export default function OrganizationPage() {
  return (

    <main className="flex flex-col items-center min-h-screen">
      {/* Simple Header Placeholder */}
      <header className="w-full max-w-6xl mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
        {/* Replace with your actual logo */}
        <div className="text-2xl font-bold">Kind❤️Mind</div>
        <Button asChild size="lg">
          {/* Ensure MAIN_APP_URL is defined, maybe in .env.local */}
          <Link href="https://kindmind-app.vercel.app">Access Platform</Link>
        </Button>
      </header>

      <div className="relative flex w-full items-center justify-center  py-24 px-4 md:px-6 overflow-hidden"  style={{ backgroundColor: "rgba(251, 251, 247, 0.95)" }}>
      {/* Dot Background */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
        // className={cn(
        //   "absolute inset-0",
        //   "[background-size:40px_40px]",
        //   "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_0.25px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_0.01px)]",
        //   "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        // )}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-3xl">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Learning Made <span><ContainerTextFlip
          words={["simple", "fun", "inclusive"]}
            /></span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
        A dedicated online platform tailored to support children with learning challenges, fostering independent learning and personal growth.
        </p>

        <Image
          src="/MainImage.png"
          alt="Illustration showing happy learning"
          width={400}
          height={300}
          className="mx-auto mb-8"
        />

        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="https://kindmind-app.vercel.app/">
            Start Learning Now
          </Link>
        </Button>
      </div>
    </div>

    <section className="py-16 px-4 md:px-6 w-full max-w-5xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
    Why We Built This
  </h2>

  <Tabs defaultValue="spark" className="w-full">
    <TabsList className="grid w-full grid-cols-3 mb-6">
      <TabsTrigger value="spark">The Spark</TabsTrigger>
      <TabsTrigger value="research">What We Found</TabsTrigger>
      <TabsTrigger value="solution">How It Helps</TabsTrigger>
    </TabsList>

    {/* Tab 1: The Spark */}
    <TabsContent value="spark">
      <Card className="p-6">
        <CardHeader>
          <Lightbulb className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">The Spark Behind the Idea</CardTitle>
          <CardDescription>
            The pandemic exposed structural gaps in the education system — particularly for students with cognitive challenges.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <p>
            In traditional schools, children who learn differently often struggle to keep pace due to rigid routines, inaccessible teaching methods, and a lack of inclusive support. These students are frequently left behind in environments that prioritize uniformity over flexibility.
          </p>
          <p>
            The onset of the COVID-19 pandemic amplified these issues. Schools shifted to online platforms that were not designed with inclusivity in mind. Most tools required continuous parental supervision, and lacked adaptive features to support independent learning. As a result, students with cognitive difficulties suffered learning losses, while parents and teachers were left overwhelmed.
          </p>
          <p>
            Despite returning to in-person education, little has been done to ensure inclusive practices are implemented consistently. The burden on families remains, and teachers still lack the tools needed to track progress and personalize support for children with special learning needs.
          </p>
          <p className="italic text-sm">
            Reference: 
            <a href="https://www.ndtv.com/education/ugc-focuses-on-accessible-disabled-friendly-learning-in-guidelines-for-higher-education-institutions-3154818" target="_blank" rel="noopener noreferrer">NDTV: UGC Guidelines for Disabled-Friendly Learning</a>
          </p>
          
        </CardContent>
      </Card>
    </TabsContent>

    {/* Tab 2: What We Found */}
    <TabsContent value="research">
      <Card className="p-6">
        <CardHeader>
          <BarChart className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">What We Found</CardTitle>
          <CardDescription>
            Our research identified major challenges for students, parents, and educators in achieving inclusive learning.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-6">
          <div>
            <h4 className="font-semibold">Students</h4>
            <p>
              Students with cognitive needs faced significant barriers due to the design of existing platforms. The interfaces were complex, lacking in guided flows or clear instructions. Many platforms did not provide gamified or scaffolded content to support independent usage, making learning both frustrating and ineffective.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Parents</h4>
            <p>
              Learning platforms placed a heavy burden on parents. They were expected to supervise every activity, explain instructions, and monitor outcomes—tasks that were not feasible for working families. This led to fatigue, inconsistency in support, and in some cases, complete disengagement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Teachers</h4>
            <p>
              Educators were unable to assess or support students adequately. Standard tools provided little to no visibility into student behavior, engagement, or support at home. Moreover, most teachers lacked formal training in inclusive education and found it difficult to adapt their content and assignments to meet varying needs remotely or in hybrid classrooms.
            </p>
            <p className="italic text-sm">
              References: 
              <a href="https://www.researchgate.net/publication/356207720_Remote_Learning_COVID-19_and_Children_With_Disabilities" target="_blank" rel="noopener noreferrer">ResearchGate – Remote Learning & Children with Disabilities</a>
            </p>
            <p className="italic text-sm">
              <a href="https://files.eric.ed.gov/fulltext/EJ1451017.pdf?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">ERIC Journal – Online Learning Challenges for Teachers</a>
            </p>
          </div>
          <ResizablePanelGroup
      direction="horizontal"
      className="max-w-5xl mx-auto rounded-lg border md:min-w-[600px]"
    >
      {/* Left Panel - YouTube Video */}
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[600px] items-center justify-center p-4">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/DEkJPoiZdxQ?si=77uJ9MmD2Z3SldPZ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      {/* Right Panel - Vertical Split */}
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          {/* Top Right - ResearchGate PDF */}
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <iframe
                src="https://files.eric.ed.gov/fulltext/EJ1323869.pdf"
                width="100%"
                height="100%"
                title="ResearchGate Article"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Bottom Right - ERIC PDF */}
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <iframe
                src="https://files.eric.ed.gov/fulltext/EJ1451017.pdf?utm_source=chatgpt.com"
                width="100%"
                height="100%"
                title="ERIC PDF Document"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Tab 3: How It Helps */}
    <TabsContent value="solution">
      <Card className="p-6">
        <CardHeader>
          <BrainCircuit className="h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl">How This Platform Helps</CardTitle>
          <CardDescription>
            A solution designed to be inclusive, independent, and supportive of real classrooms.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Inclusive Design:</strong> The platform is tailored for children with cognitive needs — simple interfaces, clear instructions, visual elements, and distraction-free workflows enable them to complete tasks without relying on constant adult assistance.
            </li>
            <li>
              <strong>Progress Tracking:</strong> Educators can assign tasks, view completion history, and track learning milestones. This enables better feedback, timely interventions, and long-term assessment.
            </li>
            <li>
              <strong>Parental Monitoring:</strong> The system detects usage patterns and offers insights into how much support a student is receiving. It flags if a task seems overly assisted, giving teachers a better understanding of real skill development.
            </li>
            <li>
              <strong>Independent Learning Focus:</strong> Built to reduce caregiver fatigue, the platform motivates students to engage and complete tasks independently, with minimal adult help.
            </li>
          </ul>
          <p>
            In a world moving towards personalized education, inclusivity should not be an afterthought. Our platform brings inclusive practices into everyday classrooms and homes—making it easier for teachers to teach, parents to support, and students to thrive.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  <p className="mt-8 text-muted-foreground text-center">
    Inclusive education in normal schools requires more focused assessment and tracking on each student, which sometimes can be impossible without the right tools.
  </p>
</section>

<div className="relative overflow-hidden bg-white mb-2">
  {/* Grid background */}
  <div className="absolute inset-0 z-0 w-full
    bg-[radial-gradient(circle,#d4d4d4_1.5px,transparent_1px)] 
    bg-[length:20px_20px] opacity-40 pointer-events-none" />

  {/* Foreground scroll content */}
  <div className="relative z-10 py-2 px-6"> {/* Reduced top padding */}
    <ContainerScroll
      titleComponent={
        <h1 className="text-2xl py-6 font-semibold text-center text-black dark:text-white"> {/* Reduced padding on title */}
          A Glimpse into Every Child's <br />
          <span className="text-2xl md:text-[4rem] font-bold mt-1 leading-none">
          Learning <ColourfulText text="Journey" />
          </span>
        </h1>
      }
    >
      <img
        src="/hero.png"
        alt="hero"
        height={420}
        width={1000}
        className="mx-auto rounded-2xl mt-2 object-cover h-[90%] object-left-top" 
      />
    </ContainerScroll>
    <p className="text-black-200 pb-20 text-center z-20 text-2xl max-w-xl mx-auto"> {/* Reduced margin top */}
      Our interactive learning experience gives guardians and educators real-time insight into each child’s authentic progress.
    </p>
    
  </div>
</div>


      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 w-full bg-[#f9f9f6]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The platform offers
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl shadow-md bg-white text-center">
              <h3 className="text-xl font-semibold mb-4">Visual Progress Charts</h3>
              <p className="text-gray-600">
                Understand a child’s journey at a glance. Our platform translates learning activity into simple charts for easy tracking by parents and educators.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl shadow-md bg-white text-center">
              <h3 className="text-xl font-semibold mb-4">Guardian-Free Assessments</h3>
              <p className="text-gray-600">
                With basic AI, we help ensure children answer independently—building true confidence and measuring actual progress without constant adult intervention.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl shadow-md bg-white text-center">
              <h3 className="text-xl font-semibold mb-4">Motivating Experience</h3>
              <p className="text-gray-600">
                Positive reinforcement through animations and encouraging feedback keeps children engaged and eager to return—turning practice into play.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section
       <section className="text-center py-20 px-4 md:px-6 w-full" style={{ backgroundColor: '#fbfbf7' }}>
         <h2 className="text-3xl md:text-4xl font-bold mb-6">
           Ready to Empower Your Child's Learning?
         </h2>
         <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href={process.env.NEXT_PUBLIC_MAIN_APP_URL || "#"}>Access the Platform</Link>
         </Button>
       </section> */}

      {/* Footer */}
      <footer className="w-full border-t mt-12">
        <div className="max-w-6xl mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Kind❤️Mind. All Rights Reserved.
          {/* Add links to Privacy Policy, Terms, etc. */}
          <nav className="mt-2">
             <Link href="/privacy" className="mx-2 hover:text-primary">Privacy Policy</Link>
             |
             <Link href="/terms" className="mx-2 hover:text-primary">Terms of Service</Link>
             {/* Add more links if needed */}
          </nav>
        </div>
      </footer>
    </main>
  );
}