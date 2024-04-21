import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";

export default function ClubTest() {
  return (
    <div className="flex px-4 w-full flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Choose your club</h1>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl mx-auto items-center justify-center gap-4 p-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Join University Hubs</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Discover and join clubs and societies.
            </p>
          </div>
        </div>
        <Carousel className="flex-1">
          <CarouselContent className="h-full">
            <CarouselItem className="h-full">
              <div className="p-1 flex items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                  <CardHeader className="pb-0">
                    <h2 className="text-lg font-bold">read quaran</h2>
                  </CardHeader>
                  <CardContent className="flex items-center p-6 gap-4">
                    <img
                      alt="Chess Club"
                      className="rounded-full w-16 h-16 md:w-24 md:h-24"
                      src="https://zamzaminstitute.com/wp-content/uploads/2020/05/reading-768x432.jpg"
                      style={{
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                    <p className="text-sm">
                      join uss to read and listen to quran! loerem ipsum lakajs
                      alas ksa asak
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="p-1 flex items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                  <CardHeader className="pb-0">
                    <h2 className="text-lg font-bold">Culture Meeting</h2>
                  </CardHeader>
                  <CardContent className="flex items-center p-6 gap-4">
                    <img
                      alt="Culture Meeting"
                      className="rounded-full w-16 h-16 md:w-24 md:h-24"
                      src="https://example.com/culture-meeting-image.jpg"
                      style={{
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                    <p className="text-sm">
                      Explore diverse cultures and traditions with us! Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="p-1 flex items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                  <CardHeader className="pb-0">
                    <h2 className="text-lg font-bold">Sport Club</h2>
                  </CardHeader>
                  <CardContent className="flex items-center p-6 gap-4">
                    <img
                      alt="Sport Club"
                      className="rounded-full w-16 h-16 md:w-24 md:h-24"
                      src="https://example.com/sport-club-image.jpg"
                      style={{
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                    <p className="text-sm">
                      Join our sport club and stay active! Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="p-1 flex items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                  <CardHeader className="pb-0">
                    <h2 className="text-lg font-bold">
                      African Students Association
                    </h2>
                  </CardHeader>
                  <CardContent className="flex items-center p-6 gap-4">
                    <img
                      alt="African Students Association"
                      className="rounded-full w-16 h-16 md:w-24 md:h-24"
                      src="https://example.com/african-students-association-image.jpg"
                      style={{
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                    <p className="text-sm">
                      Connect with the vibrant African community on campus!
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="h-full">
              <div className="p-1 flex items-center justify-center h-full">
                <Card className="w-full max-w-sm">
                  <CardHeader className="pb-0">
                    <h2 className="text-lg font-bold">
                      African Students Association
                    </h2>
                  </CardHeader>
                  <CardContent className="flex items-center p-6 gap-4">
                    <img
                      alt="African Students Association"
                      className="rounded-full w-16 h-16 md:w-24 md:h-24"
                      src="https://example.com/african-students-association-image.jpg"
                      style={{
                        aspectRatio: "1",
                        objectFit: "cover",
                      }}
                    />
                    <p className="text-sm">
                      Connect with the vibrant African community on campus!
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            {/* Repeat similar CarouselItem components for other clubs */}
          </CarouselContent>
          <CarouselPrevious className="top-1/2" />
          <CarouselNext className="top-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

function ChevronUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
