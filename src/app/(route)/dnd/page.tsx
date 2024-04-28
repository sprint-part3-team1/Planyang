'use client';

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './_component/DraggableItem';
import DropZone from './_component/DropZone';

const DndPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'ITEM 1', droppedAt: null },
    { id: 2, name: 'ITEM 2', droppedAt: null },
    { id: 3, name: 'ITEM 3', droppedAt: null },
  ]);

  const handleDrop = (itemId, zoneId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId.id ? { ...item, droppedAt: zoneId } : item,
    );
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <DraggableItem id={1} name="Item 1" />
          <DraggableItem id={2} name="Item 2" />
          <DraggableItem id={3} name="Item 3" />
        </div>
        <div>
          <DropZone
            id={1}
            onDrop={(itemId) => handleDrop(itemId, 1)}
            items={items}
          />
          <DropZone
            id={2}
            onDrop={(itemId) => handleDrop(itemId, 2)}
            items={items}
          />
          <DropZone
            id={3}
            onDrop={(itemId) => handleDrop(itemId, 3)}
            items={items}
          />
        </div>
      </div>
      <div>
        <p>Items:</p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - Dropped at:{' '}
              {item.droppedAt ? `Zone ${item.droppedAt}` : 'Not dropped'}
            </li>
          ))}
        </ul>
      </div>
    </DndProvider>
  );
};

export default DndPage;
