import { PropTypes } from "prop-types";
import axiosInstance from "@/axiosInstance";

const BookingRows = ( {booking, trigger} ) => {

    const handleClick = async () => {
        let resp = await axiosInstance.delete(`/bookings/${booking["_id"]}`);
        if( resp["data"].ok ) {
            window.alert("Booking Removed Successfully");
            trigger(x => !x);
            console.log("Success");
        }
    }

    return (
        <tr>
            <td>{booking.tourId.name}</td>
            <td>{new Date(booking.bookingDate).toISOString().split("T")[0]}</td>
            <td>{booking.status}</td>
            <td><button className="user_button" onClick={handleClick}>cancel</button></td>
        </tr>
    );
}

export default BookingRows;

BookingRows.propTypes = {
    booking: PropTypes.object,
    trigger: PropTypes.func
}