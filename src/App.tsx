import { useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import './index.css';

function Item({ id, index }: { id: string, index: number }) {
  const { ref, isDragging } = useSortable({ id, index });
  return (
    <button className="Item" ref={ref} data-dragging={isDragging}>
      {id}
    </button>
  );
}

export default function App() {
  const [items, setItems] = useState<string[]>(['first', 'second', 'third', 'fourth']);
  return (
    <DragDropProvider onDragOver={(event) => {
      setItems((items) => move(items, event));
    }}>
      <div className="Root">
        <div key="Flat" className="Column">
          {items.map((id, index) => (
            <Item key={id} id={id} index={index} />
          ))}
        </div>
      </div>
      <div>
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
    </DragDropProvider>

  );
}