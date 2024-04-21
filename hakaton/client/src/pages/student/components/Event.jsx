const Event = () => {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm"
      data-v0-t="card"
    >
      <div className="flex gap-4 flex-col">
        <div className="flex flex-col space-y-1.5 p-0">
          <img
            src="/placeholder.svg"
            width={400}
            height={200}
            alt="Event"
            className="rounded-t-lg object-cover"
            style={{ aspectRatio: "400 / 200", objectFit: "cover" }}
          />
        </div>
        <div className="p-4 pb-6">
          <h2 className="text-lg font-bold leading-none">
            Campus tour &amp; information session
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            March 28th, 2023 at 10:00am
            <br />
            Student Union Building
          </p>
          <p className="text-sm leading-loose mt-4">
            Join us for a campus tour and information session to learn more
            about life at our university. You'll have the opportunity to meet
            with academic advisors, tour our campus, and get a feel for what
            it's like to be a student here.
          </p>
        </div>
      </div>
      <div className="flex items-center p-4">
        <a className="flex items-center justify-center h-8 w-full" href="#">
          Read more
        </a>
      </div>
    </div>
  );
};

export default Event;
