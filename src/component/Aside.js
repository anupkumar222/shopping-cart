import React from "react";
import "./style.css";

class Aside extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        let { activeSizes } = this.props.state;
        let {handleBySize} = this.props
        return(
            <div className=" container">
                <div className="flex wrap size-box">
                    {sizes.map((size) => (
                     <li 
                     onClick={() => handleBySize(size)}
                     className= {activeSizes.includes(size) ? "active size" : "size"}>
                         {size}
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}

export default Aside;