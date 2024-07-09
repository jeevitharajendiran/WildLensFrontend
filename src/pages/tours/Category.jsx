import { PropTypes } from "prop-types";
import Card from "@/components/Card";

const Category = ( { cat, trips } ) => {

    return ( 
         
        <div className="flex flex-col gap-2 p-2 pb-0 w-full">
            <p className="text-start text-3xl font-bold w-max">{cat} </p> {/* list-disc hover:underline underline-offset-8 decoration after:hover:content-['>'] transition-all duration-300 */}
            <div className="flex gap-12 overflow-x-scroll p-8 pb-8 w-full transition-all duration-300">
                {trips.map( x => (
                    <Card key={x.id} tour={x} className="w-1/6 shrink-0 hover:scale-105 transition-all duration-300"></Card>
                ))}
            </div>
        </div> 
     );
}
 
export default Category;

Category.propTypes = {
    cat: PropTypes.string,
    trips: PropTypes.array
}

