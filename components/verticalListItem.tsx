'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TrashIcon from './icons/trash'

type Item = {
  id: string
  title: string
}

function VerticalListItem({
  item,
  removeItemHandler,
}: {
  item: Item
  removeItemHandler: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!isDragging) {
    return (
      <div
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        className="bg-gray-200 p-4 mb-3 rounded-md text-lg flex flex-row justify-between"
      >
        <p>{item.title}</p>
        <button
          onClick={() => removeItemHandler(item.id)}
          className="text-red-600"
        >
          <TrashIcon />
        </button>
      </div>
    )
  } else {
    return (
      <div
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        className="bg-gray-100 p-4 mb-3 rounded-md text-lg flex flex-row justify-between text-gray-100 border-2 border-black"
      >
        <p>{item.title}</p>
      </div>
    )
  }
}

export default VerticalListItem
