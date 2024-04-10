import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Carousel } from "../carousel";
import { slides } from "../../services/carouselData";

const RegistrationPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [insta, setInsta] = useState("");
  const [linkTree, setLinkTree] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [showBoxes, setShowBoxes] = useState(false); // Set initial value to false
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let redirectTimer;
    if (successMessage) {
      redirectTimer = setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    return () => clearTimeout(redirectTimer);
  }, [successMessage, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("instagramUrl", insta);
    formData.append("linkTreeUrl", linkTree);
    formData.append("profilePhotoUrl", profilePicture);

    try {
      const response = await fetch(
        "https://artist-shop-back-end.onrender.com/api/user/register",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Email is already in use");
        } else {
          throw new Error("Failed to register");
        }
      }

      setSuccessMessage("Registration successful, redirecting to login......");
      setErrorMessage("");
      return await response.json();
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  // Define the extra button
  const extraButton = (
    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 hover:bg-green-600">
      Extra Button
    </button>
  );

  return (
    <div style={{ height: "calc(100vh - 80px)" }}>
      <Carousel data={slides} />
      <div className="grid grid-cols-1 gap-y-10 sm:gap-y-20 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-32 p-3 h-auto mt-24">
        <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Empowering Indie Artists in the Digital World
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Connect with a community of indie artists. Showcase your work. Build
            your brand.
          </p>

          <form className="gap-2 sm:flex-row sm:items-center">
            <input
              className="max-w-md w-full border p-3 text-center"
              placeholder="Enter your email"
              required
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            {!showBoxes && (
              <button
                className="w-full sm:w-auto p-3 rounded-lg bg-black text-white"
                onClick={() => setShowBoxes(true)}
              >
                Join Us
              </button>
            )}

            {showBoxes && (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="max-w-md w-full border p-3 text-center"
                  placeholder="Enter your Name"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="max-w-md w-full border p-3 text-center"
                />
                <input
                  type="text"
                  placeholder="enter your instagram url"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                  className="max-w-md w-full border p-3 text-center"
                />
                <input
                  type="text"
                  placeholder="enter your linkTree Url"
                  value={linkTree}
                  onChange={(e) => setLinkTree(e.target.value)}
                  className="max-w-md w-full border p-3 text-center"
                />

                <input
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className="max-w-md w-full border p-3 text-center"
                />
              </div>
            )}

            {showBoxes && (
              <button
                onClick={handleFormSubmit}
                className="max-w-md w-full border p-3 mt-3 rounded-lg bg-black text-white hover:bg-gray-900"
              >
                Submit
              </button>
            )}

            {/* <button
              className="text-gray-700 "
              onClick={() => navigate("/login")}
            >
              Already a member? <span className="underline">Login</span>
            </button> */}
          </form>
        </div>
        <div className="flex items-center justify-center">
          <img
            alt="Artwork"
            className="rounded-xl object-cover border-2 border-gray-100 border-dashed"
            src="/art.jpeg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto py-8 sm:py-12 lg:py-16  h-auto">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Join the Indie Art Community
            </h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400">
              Whether you're a painter, musician, or digital artist, our
              platform provides the tools and support you need to thrive in the
              digital art world.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 max-w-sm gap-4 border rounded-xl border-gray-200 dark:border-gray-800">
            <div className="p-4 rounded-tl-xl rounded-tr-xl bg-gray-50 dark:bg-gray-850">
              <h3 className="text-lg font-semibold">Early Access</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Be the first to access new features and opportunities.
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-semibold">Exposure</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showcase your work to art enthusiasts around the world.
              </p>
            </div>
            <div className="p-4 rounded-bl-xl rounded-br-xl bg-gray-50 dark:bg-gray-850">
              <h3 className="text-lg font-semibold">Community</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect with fellow artists and collaborate on projects.
              </p>
            </div>
          </div>
          <a className="underline text-sm sm:text-base" href="#">
            Sign Up for an Account
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 h-auto">
        <div className="max-w-7xl w-full grid items-center gap-4 px-4 py-8 mx-auto sm:py-12 lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="space-y-4 lg:order-1 lg:space-y-6 ml-0 sm:ml-4 lg:ml-7">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Curated Indie Art
            </h2>
            <p className="max-w-xl text-base sm:text-lg text-gray-500 dark:text-gray-400">
              Discover unique artwork, music, and more from indie artists around
              the globe. Support creativity and add a touch of originality to
              your life.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:gap-6">
            <div className="w-full max-w-sm">
              <img
                alt="Artwork"
                className="aspect-[1.666666667] object-cover"
                height="240"
                src="/sunset.jpg"
                width="400"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Sunset Dreams</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Beautifully crafted music that transports you to another
                  world.
                </p>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <img
                alt="Artwork"
                className="aspect-[1.666666667] object-cover"
                height="240"
                src="/infinite.jpg"
                width="400"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Canvas of Emotions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expressive paintings that speak to the heart.
                </p>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <img
                alt="Artwork"
                className="aspect-[1.666666667] object-cover"
                height="240"
                src="/eye.jpeg"
                width="400"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Infinite Imagination</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Whimsical illustrations that spark creativity.
                </p>
              </div>
            </div>
            <div className="w-full max-w-sm">
              <img
                alt="Artwork"
                className="aspect-[1.666666667] object-cover"
                height="240"
                src="/heart.jpeg"
                width="400"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Melodies of the Heart</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Soul-stirring songs that resonate with your emotions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
