import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart:[],
    modalOpen:false,
    modalProduct:detailProduct,
  };
  componentDidMount(){
    this.setProducts();
  }
  setProducts = ()=>{
    let products = [];
    storeProducts.forEach(item=>{
      const singleProduct = {...item}
      products =[...products,singleProduct];
    });
    this.setState(()=>{
      return {products:products}
    })
    
  }
  getItem = id =>{
      const product = this.state.products.find(item=>item.id===id);
      return product;
  }
  handleDetail = id=>{
    const product = this.getItem(id);
    this.setState(()=>{
      return {detailProduct:product};
    })

  }
  addToCart = id =>{
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.count = 1;
    product.inCart = true;
    const price = product.price;
    product.total = price;
    this.setState(()=>{
      return {
          products:[...tempProducts],
          cart:[...this.state.cart,product],
          detailProduct:{product}
      }
    })
  }
  openModal = id=>{
    const product = this.getItem(id);
    this.setState(()=>{
      return {modalProduct:product,modalOpen:true}
    })
  }
  closeModal = () =>{
    this.setState(()=>{
      return {modalOpen:false}
    })
  }
  
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail:this.handleDetail,
          addToCart:this.addToCart,
          openModal:this.openModal,
          closeModal:this.closeModal
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};