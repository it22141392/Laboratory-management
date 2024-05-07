import React from "react";
import { Button, Card } from 'antd';



const ItemList = ({ item }) => {
    
    return <div>
        <Card
    title={item.Treatment}
    bordered={false}
    style={{
      width: 300,
    }}
  >
   
    <p>{item.price}</p>
    <div className="item-button">
       <Button>Add Treatment</Button>
    </div>
   
  </Card>
  
    </div>;
};
 export default ItemList;