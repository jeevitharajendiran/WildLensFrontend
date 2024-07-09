import './User.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import axiosInstance from '@/axiosInstance';
import BookingRows from './BookingRows.jsx';
import BgImage from '@/components/BgImage';
import Logout from '@/components/Logout';
import UserCard from '@/components/userCard';

const User = () => {

    const [ bookings, setBookings ] = useState( [] )
    const [trigger, setTrigger] = useState( true );
    const navigate = useNavigate();

    useEffect( () => {
        if( !localStorage.getItem( 'authToken' ) ) {
            navigate("/auth")
        }
    }, [navigate])

    useEffect( () => {

        let getData = async() => {
            const book_resp = await axiosInstance.get('/bookings/user');
            setBookings( Object.values(book_resp["data"]) ) ;
        }

        getData();
    }, [trigger]);

    return (
        <div className="user_content">
            <BgImage />
            <Logout />

            <Header />
            <UserCard />
            <div className="table_content">
                <div>
                    <h2 className='text-3xl'>Your Bookings</h2>
                    <table className='bg-white bg-opacity-25'>
                        <thead className='font-bold'>
                            <tr>
                                <th>Tour</th>
                                <th>Booking date</th>
                                <th>Status</th>
                                <th>cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map( x => (
                                <BookingRows key={x["_id"]} booking={x} trigger={setTrigger}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default User;
