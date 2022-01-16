import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pizzaList.title}</h1>
      <p className={styles.desc}>
       Welcome to Pizza Order prepared for you by LayMui.
      </p>
      <div className={styles.wrapper}>
      { pizzaList.map((pizza) => (
        <PizzaCard key={pizza._id} pizza={pizza}/>
         
      ))}
      
      </div>
    </div>
  );
};

export default PizzaList;
