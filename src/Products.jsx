import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css"

const Products = () => {
  const [Product, setProduct] = useState([]);
  const [page, setpage] = useState(2)
  //const [totalpages,settotalpages]= usestate(0) 
  const fetchProductdata = () =>
    axios
      .get('https://dummyjson.com/products')
      .then((res) => {
        let data = res.data;
        console.log("Response:", res);
        console.log("Data:", data);
        if (res && res.data) {
          console.log("Products:", data.products);
          setProduct(data.products);
          //settotalpages(data.total/10)
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  console.log(Product, "state");
  useEffect(() => {
    fetchProductdata();
  }, []);

  const changePageHandler=(selectedPage)=>{
    if(selectedPage>=1 && selectedPage<=Product.length / 10 && selectedPage!==page)
    setpage(selectedPage)
  }
  return <div>
    {
      Product.length > 0 && <div className="products">
        {
          Product.slice(page*10-10,page*10).map((products)=>{   // we can apid the slice method when we create the total page state method
             return (
             <span className="products__single" key={products.id}>
              <img src={products.thumbnail} alt={products.title} />
              <span>{products.title}</span>
             </span>
             )
          })
        }
      </div>
    }
    {
      Product.length>0 && <div className="pagination">
     <span 
     className={page>1?"":"pagination_disabled"}
     onClick={()=>changePageHandler(page-1)}>👈</span>
   {
    [...Array(Product.length/10)].map((_,i)=>{
     return <span 
     className={page== i+1 ?"pagination__selected":""}
     onClick={()=>changePageHandler(i+1)} key={i}>{i+1}</span>
    })
   }
     <span  
     className={page<Product.length /10 ?"":"pagination_disabled"}
     onClick={()=>changePageHandler(page+1)}>👉</span>
        </div>
    }
  </div>
};

export default Products;


//https://www.youtube.com/watch?v=cBsB7hhOzQI&t=518s
