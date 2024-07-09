import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ValGroup from "./ValGroup.jsx";
import Companion from "./Companion.jsx";
import config from "@/config";
import axiosInstance from "@/axiosInstance.js";

const BookTour = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { tour } = location.state || {};

    const [ count, setCount ] = useState( "1" );
    const [ companions, setCompanions ] = useState( [] );

    useEffect( () => {
        if( !localStorage.getItem( 'authToken' ) ) {
            navigate("/auth")
        }
    }, [navigate])
    
    useEffect( () => {
        if( parseInt(count) < companions.length ) {
            setCompanions( x => x.slice( 0, parseInt(count)) );
        }
    }, [ count, companions]);

    const handleClick = async () => {

        let body = {
            tourId: tour["_id"],
            bookingDate: new Date(),
            status: "Successful",
            companions: companions
        }

        const resp = await axiosInstance.post('/bookings/', body);

        if( resp["data"].ok ) {
            window.alert("Booking Successful");
            navigate("/user");
        }
    }

    return ( 
        <div className="p-12">
            <div className="flex justify-evenly items-start">

                <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center gap-4 p-4 h-full">
                    <Header className="self-start"/>

                    <ul className="text-2xl flex flex-col justify-center items-center gap-4 mt-4 w-full">

                        <li className="w-3/6">
                            <p className="font-bold text-4xl mb-3">{tour.name} Package</p>
                        </li>

                        <li className="flex list-disc w-4/6 mt-2">
                            <p className="font-bold w-1/3">Price : </p>
                            <p className=" w-2/3">₹ {tour.price} /Person</p>
                        </li>

                        <li className="flex list-disc w-4/6">
                            <p className="font-bold w-1/3">Slots : </p>
                            <p className=" w-2/3">{tour.availableSlots}</p>
                        </li>

                        <li className="flex list-disc w-4/6">
                            <p className="font-bold w-1/3">Schedule : </p>
                            <p className=" w-2/3">{ new Date(tour.schedule.start).toISOString().split("T")[0] } to { new Date( tour.schedule.end).toISOString().split("T")[0] }</p>
                        </li>
                    </ul>
                </div>

                <div className="w-1/2 flex-shrink-0 flex flex-col justify-center gap-8">
                    <img src={ `${config.API_URI}${tour.image}` } alt="Tour Image" className="w-8/12 h-[40vh] overflow-y-hidden object-cover object-center mx-auto rounded-tl-xl rounded-br-xl rounded-tr-[161px] rounded-bl-[161px]" />
                </div>
            </div>

            <div className="flex flex-col mt-8 p-8 gap-8">
                <div className="flex w-1/3 justify-between items-center ">
                    <p className="text-2xl font-bold ">No. of Companions : </p>
                    <ValGroup val={count} change={setCount} className="w-1/4" />
                </div>

                <div className="flex flex-col gap-8">
                    { Array.from( {length: parseInt(count)}, (_, ind) => (
                        <Companion key={ind} change={setCompanions} index={ind} />
                    ))}
                </div>

                <button className="bg-[#0094FF] text-white px-4 py-2 w-max font-bold text-xl rounded-lg no-underline hover:bg-[#3268de] hover:scale-105 origin-center shadow-md transition-all duration-200 mx-auto mt-4" onClick={handleClick}>Proceed To Pay</button>

            </div>

        </div>
     );
}
 
export default BookTour;