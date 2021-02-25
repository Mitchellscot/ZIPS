import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './AdminTableRow.css';


function AdminTableRow({order}) {

  const store = useSelector((store) => store);
  const formatDate = (orderDate) =>{
    let date = new Date(orderDate);
    return date.toString();
  }

  return (
        <>
        <tr>
            <td>
                {formatDate(order.order_date)}
            </td>
            <td>
                {order.name}
            </td>
            <td>
                {order.email}
            </td>
            <td>
                {order.complete}
            </td>
            <td>
                {order.complete ? "Send Email" : "Resend Email"}
                {" | "}
                {"Delete"}
            </td>
        </tr>
        </>
    );
}

export default AdminTableRow;

/* const flagFeedback = (feedback) => {
    const flag = feedback.flagged;
    axios.put(`/feedback/flag/${feedback.id}`, { flagged: !flag }).then((response) => { getFeedback(); }).catch((error) => { console.log(`HEY MITCH - CAN"T FLAG IT FOR SOME REASON ${error}`) })
} */