import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

function Sidebar() {
    const rooms = ['first room', 'second room', 'third room']
    return <>
    <h2>Available Rooms</h2>
    <ListGroup>
        {rooms.map((rooms, idx) => {
            <ListGroup.Item key = {idx}>
                {rooms}
            </ListGroup.Item>
        })}
    </ListGroup>
    <h2>Members</h2>
  </>
}

export default Sidebar
