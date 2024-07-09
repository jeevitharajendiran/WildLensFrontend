import Header from "@/components/Header";
import config from "@/config";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Tour = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { tour } = location.state || {} ;

    const [ tourDate, setDate ] = useState( tour.schedule.start );

    const handleClick = () => {
        navigate( `/tours/book/${tour["_id"]}`, { state: { tour }})
    }

    return ( 
        <div className="flex justify-evenly items-start p-12">

            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-center gap-4 p-4">
                <Header className="self-start"/>

                <div className="p-4 w-full">
                    <p className="text-3xl font-bold">{tour.name} Package</p>
                    <p className="text-pretty mt-6 text-xl">{tour.description} </p>
                </div>

                <button className="bg-[#0094FF] text-white px-4 py-2 w-max font-bold text-xl rounded-lg no-underline hover:bg-[#3268de] hover:scale-105 origin-center shadow-md transition-all duration-200 mx-auto mt-4" onClick={handleClick}>Book Now</button>
            </div>
            
            <div className="w-1/2 flex-shrink-0 flex flex-col justify-center gap-8">
                <img src={ `${config.API_URI}${tour.image}` } alt="Tour Image" className="w-8/12 h-[45vh] overflow-y-hidden object-cover object-center mx-auto rounded-tl-xl rounded-br-xl rounded-tr-[161px] rounded-bl-[161px]" />

                

                <ul className="text-2xl flex flex-col justify-center items-center gap-4 mt-4">

                    <li className="flex list-disc w-6/12">
                    <p className="font-bold w-1/3">Dates : </p>
            
                        <select name="tour-date" className="bg-white border-2 px-4 py-2 text-xl w-2/3 flex-shrink-0 overflow-x-visible" value={tourDate} onChange={ e => setDate( e.target.value )}>
                            <option value=""></option>
                            <option value={tour.schedule.start}>{ new Date(tour.schedule.start).toISOString().split("T")[0] } - { new Date( tour.schedule.end).toISOString().split("T")[0] }</option>
                        </select>
                    </li>


                    <li className="flex list-disc w-3/6">
                        <p className="font-bold w-1/3">Price : </p>
                        
                        <p className=" w-2/3">₹ {tour.price} /Person</p>
                    </li>

                    <li className="flex list-disc w-3/6">
                        <p className="font-bold w-1/3">Slots : </p>
                
                        <p className=" w-2/3">{tourDate ? tour.availableSlots : 0}</p>
                    </li>
                </ul>
            </div>

        </div>
     );
}
 
export default Tour;