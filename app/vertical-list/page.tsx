'use client'

import AddNewVerticalListItem from '@/components/addNewVerticalListItem'
import VerticalListItem from '@/components/verticalListItem'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

interface Item {
  id: string
  title: string
}

function VerticalListPage() {
  const [lastItemId, setLastItemId] = useState<number>(4)
  const [items, setItems] = useState<Item[]>([
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

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const addNewItem = (title: string) => {
    if (!title) {
      return
    }
    setItems((items) => [...items, { id: (lastItemId + 1).toString(), title }])
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)

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
      <div className="m-auto mt-16 w-96 rounded-md bg-white">
        <div className="rounded-t-md bg-neutral-900">
          <h2 className="p-3 text-2xl text-white">Vertical list</h2>
        </div>
        <div className="flex flex-col p-4">
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            sensors={sensors}
          >
            <SortableContext items={items}>
              {items.map((item) => (
                <VerticalListItem
                  removeItemHandler={removeItem}
                  key={item.id}
                  item={item}
                />
              ))}
            </SortableContext>
            {activeId ? (
              <DragOverlay>
                <div className="mb-3 flex flex-row justify-between rounded-md bg-gray-200 p-4 text-lg">
                  <p>
                    {
                      items[items.findIndex((item) => item.id === activeId)]
                        .title
                    }
                  </p>
                </div>
              </DragOverlay>
            ) : null}
          </DndContext>
          <div className="mt-2 flex justify-center">
            <AddNewVerticalListItem
              addNewItemHandler={addNewItem}
              columnId=""
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerticalListPage
