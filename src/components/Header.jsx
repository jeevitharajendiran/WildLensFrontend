import { PropTypes } from "prop-types";

const Header = ( { className }) => {
    return ( 
        <div className={className}>
            <p className="text-3xl">{"Discover the World's Wonder With"}</p>
            <p className="text-[3.5rem] font-bold">WildLens Tours</p>
        </div>
     );
}
 
export default Header;

Header.propTypes = {
    className: PropTypes.string
}