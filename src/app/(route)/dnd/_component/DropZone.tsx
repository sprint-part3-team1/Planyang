import React from 'react';

import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const DropZone = ({ id, onDrop, items }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item) => onDrop(item, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const filteredItems = items.filter((item) => item.droppedAt === id);
  return (
    <div
      ref={drop}
      style={{
        border: '1px dashed black',
        backgroundColor: isOver ? 'lightgray' : 'white',
        padding: '20px',
        marginTop: '20px',
      }}
    >
      Drop Zone
      {filteredItems.map((item) => (
        <div key={item.id}>
          <DraggableItem id={item.id} name={item.name} />
        </div>
      ))}
    </div>
  );
};

export default DropZone;
