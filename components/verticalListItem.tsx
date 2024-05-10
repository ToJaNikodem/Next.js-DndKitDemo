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
        className="mb-3 flex flex-row justify-between rounded-md bg-gray-200 p-4 text-lg"
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
        className="mb-3 flex flex-row justify-between rounded-md border-2 border-black bg-gray-100 p-4 text-lg text-gray-100"
      >
        <p>{item.title}</p>
      </div>
    )
  }
}

export default VerticalListItem
