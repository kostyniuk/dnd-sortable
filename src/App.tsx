import { useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { Grip } from 'lucide-react';

import './index.css';

function ItemWithGrip({ id, index }: { id: string, index: number }) {
  const { ref, isDragging, handleRef } = useSortable({ id, index });
  return (
    <div className="Item" ref={ref} data-dragging={isDragging}>
      <Grip className="Grip" ref={handleRef} />
      {id}
    </div>
  );
}

function Item({ id, index }: { id: string, index: number }) {
  const { ref, isDragging } = useSortable({ id, index });
  return (
    <div className="Item" ref={ref} data-dragging={isDragging}>
      {id}
    </div>
  );
}

function Table({ items }: { items: string[] }) {
  return (
    <div className="Table">
      <tr>
        <th>Index</th>
        <th>ID</th>
      </tr>
      {items.map((id, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{id}</td>
        </tr>
      ))}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState<string[]>(['first', 'second', 'third', 'fourth']);
  const [items2, setItems2] = useState<string[]>(['first', 'second', 'third', 'fourth']);
  return (
    <div className="App">
      <DragDropProvider onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}>
        <div className="Root">
          <div key="Flat" className="Column">
            {items.map((id, index) => (
              <ItemWithGrip key={id} id={id} index={index} />
            ))}
          </div>
        </div>
        <Table items={items} />
      </DragDropProvider>
      <DragDropProvider onDragOver={(event) => {
        setItems2((items) => move(items, event));
      }}>
        <div className="Root">
          <div key="Flat" className="Column">
            {items2.map((id, index) => (
              <Item key={id} id={id} index={index} />
            ))}
          </div>
        </div>
        <div className="Table">
          <Table items={items2} />
        </div>
      </DragDropProvider>
    </div>
  );
}