import React from "react";
import "./style.css";

class Section extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {handleCart} = this.props
        return (
            <>
                <div className="box">
                <div className="products-filter flex space-between">
                    <p>{this.props.data.length } Products found. </p>
                    <div className="sort">Order by
                    <select onChange={this.props.handleSortByPrice}>
                        <option value="">Select</option>
                        <option value="lowest">Lowest to highest</option>
                        <option value="highest">Highest to lowest</option>
                    </select>
                        </div>
                        </div>
            </div>
                <div className="product-box flex wrap ">
                    {this.props.data.map((product) => (
                        
                        <div className="each-product flex wrap">
                            <img className="product-img" src={`static/products/${product.sku}_1.jpg`} alt="sample" />
                            <span className="tag">Free Shipping</span>
                            <div className="product-item-details">
                                <p className="product-item-title">
                                    {product.title}
                                </p>
                    
                                <div className="line">
                                </div>
                                <h3 className="product-item-price">
                                    {`$ ${product.price}`}
                                </h3>
                                <button
                                onClick={() => {handleCart(product)}}
                                > 
                                Add To Cart
                             </button>
                            </div>
                        </div>
                    ))}


                </div>


            </>


        )

    }
}


export default Section;