'use client'

import AddNewVerticalListItem from '@/components/AddNewVerticalListItem'
import VerticalListItem from '@/components/VerticalListItem'
import { DndContext, DragEndEvent, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

function VerticalListPage() {
  const [lastItemId, setLastItemId] = useState(4)
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'title1',
    },
    {
      id: '2',
      title: 'title2',
    },
    {
      id: '3',
      title: 'title3',
    },
  ])

  const addNewItem = (title: string) => {
    if (!title) {
      return
    }
    setItems((items) => [
      ...items,
      { id: (lastItemId + 1).toString(), title },
    ])
    setLastItemId(lastItemId + 1)
    console.log(lastItemId)
  }

  const removeItem = (id: string) => {
    if (!id) {
      return
    }
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const getItemPosition = (id: UniqueIdentifier) =>
    items.findIndex((task) => task.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id === over?.id) {
      return
    }

    if (!over) {
      return
    }

    setItems((items) => {
      const startPosition = getItemPosition(active.id)
      const endPosition = getItemPosition(over.id)
      return arrayMove(items, startPosition, endPosition)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  return (
    <main>
      <div className="m-auto mt-16 w-1/4 bg-white rounded-md">
        <div className="bg-neutral-900 rounded-t-md">
          <h2 className="text-white p-3 text-2xl">Vertical list</h2>
        </div>
        <div className="flex flex-col p-4">
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
            <SortableContext items={items}>
              {items.map((item) => (
                <VerticalListItem onClick={removeItem} key={item.id} item={item} />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center mt-2">
            <AddNewVerticalListItem onClick={addNewItem} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerticalListPage
