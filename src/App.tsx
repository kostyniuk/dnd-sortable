import { useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import './index.css';

function Item({ id, index, column }: { id: string, index: number, column: string }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: 'item',
    accept: 'item',
    group: column,
  });
  return (
    <button className="Item" ref={ref} data-dragging={isDragging}>
      {id}
    </button>
  );
}

export default function App() {
  const [itemsFlat] = useState<string[]>(['first', 'second', 'third', 'fourth']);

  return (
    <div className="Root">
      <div key="Flat" className="Column">
        {itemsFlat.map((id, index) => (
          <Item key={id} id={id} index={index} column="Flat" />
        ))}
      </div>
    </div>

  );
}