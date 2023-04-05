import React from 'react';
import styles from "./Card.module.scss";

const Card = ({children, cardClass}) => {
  return (
    <div className={styles.card}>
        <div className={cardClass}>
            {children}
        </div>
    </div>
  )
}

export default Card