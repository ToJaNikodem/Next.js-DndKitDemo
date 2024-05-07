import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon } from 'lucide-react'

type Item = {
  id: string
  title: string
}

function VerticalListItem({ item, onClick }: { item: Item, onClick: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <div
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="bg-gray-200 p-4 mb-3 rounded-md text-lg flex flex-row justify-between"
    >
      <p>{item.title}</p>
      <TrashIcon onClick={() => onClick(item.id)} className='text-red-600'/>
    </div>
  )
}

export default VerticalListItem
