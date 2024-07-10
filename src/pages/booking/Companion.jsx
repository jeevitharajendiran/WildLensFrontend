import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";


const Companion = ( { change, index } ) => {

    const [ data, setData ] = useState({
        name: "",
        age: 0,
        gender: ""
    });

    useEffect( () => {
        change( x => {
            const y = [ ...x]
            y[index] = data ;
            return y;
        });
    }, [change, index, data] );

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "age") {
            if (value === '' || /^\d*$/.test(value)) {
                setData(x => ({
                    ...x,
                    [name]: value
                }));
            }
        } else {
            setData(x => ({
                ...x,
                [name]: value
            }));
        }
    }

    return (
        <form className="w-5/6 flex justify-between items-center">
            <input className="w-3/12 p-2" type="text" name="name" value={data.name} onChange={handleChange} placeholder='Name' required/>
            <input className="w-3/12 p-2" type="number" name="age" value={data.age} onChange={handleChange} placeholder='Age' required/>
            {/* <input className="w-3/12 p-2" type="text" name="gender" value={data.gender} onChange={handleChange} placeholder='Gender' required/> */}
            <select className="w-3/12 p-2 py-3 rounded-[8px] border-2 border-[#808080] bg-white" name="gender" value={data.gender} onChange={handleChange} placeholder='Gender' required >
                <option value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>
        </form>
    )
}

export default Companion;


Companion.propTypes = {
    change : PropTypes.func,
    index: PropTypes.number
}