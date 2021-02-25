import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './AdminTableRow.css';
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { ZoomIn } from 'react-bootstrap-icons';


function AdminTableRow({order}) {

  const store = useSelector((store) => store);
  const formatDate = (orderDate) =>{
    const date = new Date(orderDate);
    const options = {month:"short", day: "numeric", year: "numeric"}
    const fd = new Intl.DateTimeFormat('en-us', options).format(date);
    return fd.toString();
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
            {order.complete ? "Sent (Resend)" : "Pending"}
            </td>
            <td>
                <PencilSquare font-size="2rem" color="black"/> - <Trash font-size="2rem" color="black"/> - <ZoomIn font-size="2rem" color="black"/>
            </td>
        </tr>
        <tr>

        </tr>
        </>
    );
}

export default AdminTableRow;

/* const flagFeedback = (feedback) => {
    const flag = feedback.flagged;
    axios.put(`/feedback/flag/${feedback.id}`, { flagged: !flag }).then((response) => { getFeedback(); }).catch((error) => { console.log(`HEY MITCH - CAN"T FLAG IT FOR SOME REASON ${error}`) })
} */