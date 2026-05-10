import Hero from "./Hero";
import CctvServices from "./CctvServices";
import WhyChooseUs from "./About/WhyChooseUs";
// import NasVisionCctvCamera from "./NasVisionCctvCamera";

const Home = () => {
  return (
    <div>
      {/* Home page main hero add kiya gaya hai */}
      <Hero />
      {/* Add content for the Home page here */}
      {/* <NasVisionCctvCamera /> */}
      <WhyChooseUs />
      <CctvServices />
    </div>
  );
};

export default Home;