import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import VerticalListItem from '@/components/verticalListItem'
import { useEffect, useState } from 'react'
import { Item } from '@/app/multiple-vertical-lists/page'
import { useDroppable } from '@dnd-kit/core'
import AddNewVerticalListItem from './addNewVerticalListItem'

function VerticalList({
  columnId,
  title,
  items,
  addNewItemHandler,
  removeItemHandler,
}: {
  columnId: string
  title: string
  items: Item[]
  addNewItemHandler: (title: string, columnId?: string) => void
  removeItemHandler: (id: string) => void
}) {
  const [columnItems, setColumnItems] = useState<Item[]>(
    items.filter((item) => item.columnId === columnId)
  )

  useEffect(() => {
    setColumnItems(items.filter((item) => item.columnId === columnId))
  }, [columnId, items])

  const { setNodeRef } = useDroppable({ id: columnId })
  return (
    <div className="bg-white rounded-md min-h-16 w-96">
      <div className="bg-neutral-900 rounded-t-md flex flex-row justify-between items-center">
        <h2 className="text-white p-3 text-2xl">{title}</h2>
      </div>
      <div className="flex flex-col p-4" ref={setNodeRef}>
        <SortableContext
          items={columnItems!}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            if (item.columnId === columnId) {
              return (
                <VerticalListItem
                  key={item.key}
                  item={item}
                  removeItemHandler={removeItemHandler}
                />
              )
            }
          })}
        </SortableContext>
        <AddNewVerticalListItem
          addNewItemHandler={addNewItemHandler}
          columnId={columnId}
        />
      </div>
    </div>
  )
}

export default VerticalList
