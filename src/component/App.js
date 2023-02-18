import React from "react";
import Aside from "./Aside";
import Section from "./Section";
import Cart from "./Cart";
import data from "../data.json";
import "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterData: [...data.products],
            selectedOrder: 'default',
            activeSizes: [],
            cartItem: []
        }
    }

    handleFilter = () => {
        let clonedData = [...data.products]
        let { filterData, selectedOrder, activeSizes } = this.state
        let newData = [];

        newData = clonedData.filter((product) => {
            return product.availableSizes.some((size => {
                return activeSizes.includes(size)
            }))
        })

        newData = newData.sort((a, b) => {
            if (selectedOrder === "highest") {
                return b.price - a.price
            } else
                if (selectedOrder === "lowest") {
                    return a.price - b.price
                }
        })
        this.setState({
            filterData: newData
        })

    }

    handleBySize = (size) => {
        this.setState(({ activeSizes }) => {
            let newState = [];
            if (activeSizes.includes(size)) {
                newState = activeSizes.filter((elm) => {
                    return elm !== size
                })
            } else {
                newState = activeSizes.concat(size)
            }
            return {
                activeSizes: newState
            }
        }, () => { this.handleFilter() })
    }

    handleSortByPrice = (event) => {
        this.setState({
            selectedOrder: event.target.value
        }, () => {
            this.handleFilter()
        })
    }

    handleCart = (item) => {
        const { cartItem } = this.state;
        let newCart = [];
        let isExist = cartItem.some((elm) => {
            return item.sku === elm.sku
        })

        if (!isExist) {
            item.quantity = 1
            newCart = cartItem.concat(item)
        } else {

            newCart = cartItem.map((elm) => {
                if (elm.sku === item.sku) {
                    elm.quantity = elm.quantity + 1
                }
                return elm;
            })
        }
        this.setState({ cartItem: newCart })
    }

    handleCartDelete = (skuId) => {
        const { cartItem } = this.state;
        this.setState({
         cartItem: cartItem.filter(item => item.sku !== skuId)
        })
    }


    
    handleCartMinus = (item) => {
        const { cartItem } = this.state;
        let newCart = [];
        newCart = cartItem.map((elm) => {
            if (elm.sku === item.sku) {
                elm.quantity = elm.quantity - 1
            } 
            return elm;
        })
        this.setState({ cartItem: newCart })
    }

    render() {
        return (
            <div className="flex space-between">
                <Aside
                    state={this.state}
                    handleBySize={this.handleBySize}
                />
                <div className="box">

                    <Section
                        state={this.state}
                        data={this.state.filterData}
                        handleSortByPrice={this.handleSortByPrice}
                        handleCart={this.handleCart}
                    />
                </div>
                <Cart
                handleCartDelete={this.handleCartDelete}
                handleCartMinus={this.handleCartMinus}
                    handleCart={this.handleCart}
                    cartItem={this.state.cartItem}
                />
            </div>


        )
    }
}

export default App