import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, name }: { id: number; name: string }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: () => ({ id, name }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
