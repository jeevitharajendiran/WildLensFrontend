import { useState, useEffect } from "react";
import axios from "axios";
import config from "@/config.js";
import BgImage from "@/components/BgImage.jsx";
import Header from "@/components/Header.jsx";
import Category from "./Category.jsx";
import Search from "@/components/Search.jsx";


const Tours = () => {

    const [cats, setCats] = useState( {} );
    const [query, setQuery] = useState( "" );

    useEffect( () => {
        async function queryDB() {
            let params = new URLSearchParams({
                location: query
            });
            let resp = await axios.get(`${config.API_URI}/tours/search?${params.toString()}`);
            
            resp = Object.values( resp["data"] );
            setCats( categorize( resp ) );
        }

        queryDB();
        
    }, [query]);
    
    

    return ( 
        <div className="p-12">
            <BgImage />

            <div className="flex items-start justify-between">
                <Header/>
                <Search placeholder="Search" className="mt-3 mr-40" search={query} setSearch={setQuery}/>
            </div>

            

            { Object.entries(cats).length != 0 ?
                <div className="flex flex-col gap-4 items-start justify-center">
                    { Object.entries(cats).map( ( [key, val]) => (
                        <Category key={key} cat={key} trips={val} />
                    ))}
                </div>
            : <p className="text-4xl text-center mt-[30vh]">No Tours Found.......</p>}

        </div>
     );
}


const categorize = ( object ) => {

    return object.reduce( (res, item) => {
        let { category } = item;
        if( ! res[category] ) {
            res[category] = [];
        }

        res[category].push( item );
        return res;
    }, {})
}


export default Tours;