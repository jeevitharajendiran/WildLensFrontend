import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import BgImage from "@/components/BgImage";
import CardGrp from "./CardGrp";
import Header from "@/components/Header";
import home from "@/assets/bg/home.png";

const Home = ( {tours} ) => {
    return ( 
        <div className="p-12">
            <BgImage picture={home}>
                <p className="text-3xl rotate-[35.2deg] relative translate-y-[22rem] translate-x-24">Wander often !</p>
            </BgImage>

            <div className="flex flex-col justify-center">
                <div className="w-2/5">
                    <Header/>
                    { (tours && tours.length != 0) ? <CardGrp tours={tours}></CardGrp> : <div className="">Loading...</div>}
                </div>

                <div className="w-6/12 mt-4">
                    <p className="text-xl text-wrap">At wildLens, we believe in creating unforgettable experiences that connect you with the heart and soul of every destination. With expertly crafted itineraries, local guides, and unparalleled customer service, we make your dream vacations come true.</p>
                </div>

                <p className="text-center text-3xl mt-16">Your Adventure Awaits: Explore, Dream, Discover</p>
                <Link to="/tours" className="bg-[#0094FF] text-white px-8 py-4 w-max font-bold mx-auto mt-8 text-xl rounded-full no-underline hover:bg-[#3268de] hover:scale-105 origin-center shadow-md transition-all duration-200">Start Your Journey</Link>
            </div>
        </div>
     );
}
 
export default Home;

Home.propTypes = {
    tours: PropTypes.array
}