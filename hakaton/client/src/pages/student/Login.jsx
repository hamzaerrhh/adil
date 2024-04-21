import { logo } from "@/assets";
const Login = () => {
  const googleAuth = () => {
    console.log("the procees env", import.meta.env.VITE_SERVER_URL);
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4 p-4">
      <div className=" flex flex-col space-y-2 items-center justify-center text-center">
        <img width={120} height={120} src={logo} />
        <h1 className="text-3xl font-bold">university mohamed 1 </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Securely login to your account
        </p>
      </div>
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="m@example.com"
            required=""
            type="email"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <a className="ml-auto inline-block text-sm underline" href="#">
              Forgot your password?
            </a>
          </div>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="password"
            required=""
            type="password"
          />
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Login
        </button>
        <button
          onClick={googleAuth}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
        >
          Login with Google.ump.ma
        </button>
      </div>
    </div>
  );
};
export default Login;
