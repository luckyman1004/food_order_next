import styles from '../../styles/Admin.module.css'
import Image from "next/image";
import axios from 'axios';
import { useState } from 'react';

const Index = ({orders, products}) => {
 
     const [pizzaList, setPizzaList] = useState(products);
     const [orderList, setOrderList] = useState(orders);

    const handleDelete = async(id) => {
        try {
            const res = await axios.delete("http://localhost:3000/api/products/"+id);
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id)) 
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div className={styles.container}>
        <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
            <tbody>
                <tr className={styles.trTitle}>
                    <td>Image</td>
                    <td>Id</td>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Action</td>

                </tr>
            </tbody>
            { pizzaList.map(product => {

            <tbody key={product._id}>
          
     
                <tr className={styles.trTitle}>
                <td>
                  <Image
                  src={product.img}
                  width={50}
                  height={50}
                  objectFit="cover"
                  alt=""
                  />
                </td>
                    <td>{product._id.slice(0,5)}...</td>
                    <td>{product.title}</td>
                    <td>${product.prices[0]}</td>
                    <td>
                        <button className={styles.button}>Edit</button>
                        <button className={styles.button} onClick={()=> handleDelete(product._id)}>Delete</button>
                    </td>

                </tr>
           
            </tbody>
        })}
        </table>
        </div>

        <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
            <tbody>
                <tr className={styles.trTitle}>
                    <td>Id</td>
                    <td>Customer</td>
                    <td>Total</td>
                    <td>Payment</td>
                    <td>Status</td>
                    <td>Action</td>

                </tr>
            </tbody>
            <tbody>
                <tr className={styles.trTitle}>
                    <td>{"89123434323231121".slice(0,5)}...</td>
                    <td>John Doe</td>
                    <td>$50</td>
                    <td>Paid</td>
                    <td>Preparing</td>
                    <td>
                        <button>Next Stage</button>
                    </td>

                </tr>
            </tbody>
        </table>
            </div>
    

    </div>
    )
}

export const getServerSideProps = async() => {
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
        props: {
            orders: orderRes.data,
            products: productRes.data,
        }
    }
}

export default Index;