'use client'

import VerticalList from '@/components/verticalList'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'

export interface Item {
  id: string
  title: string
  columnId: string
  key: number
}

interface Column {
  id: string
  title: string
  key: number
}

function MultipleVerticalListsPage(): JSX.Element {
  const [items, setItems] = useState<Item[]>([
    {
      id: 'i1',
      title: 'test 1, col 1',
      columnId: 'c1',
      key: 1,
    },
    {
      id: 'i2',
      title: 'test 2, col 1',
      columnId: 'c1',
      key: 2,
    },
    {
      id: 'i3',
      title: 'test 12312, col 2',
      columnId: 'c2',
      key: 3,
    },
    {
      id: 'i4',
      title: 'test 1321, col 3',
      columnId: 'c3',
      key: 4,
    },
    {
      id: 'i5',
      title: 'test 32131, col 2',
      columnId: 'c2',
      key: 5,
    },
    {
      id: 'i6',
      title: 'test 3211, col 1',
      columnId: 'c1',
      key: 6,
    },
    {
      id: 'i7',
      title: 'test 431, col 3',
      columnId: 'c3',
      key: 7,
    },
    {
      id: 'i8',
      title: 'test 4231, col 1',
      columnId: 'c1',
      key: 8,
    },
  ])

  const [columns] = useState<Column[]>([
    {
      id: 'c1',
      title: 'col 1',
      key: 1,
    },
    {
      id: 'c2',
      title: 'col 2',
      key: 2,
    },
    {
      id: 'c3',
      title: 'col 3',
      key: 3,
    },
  ])

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [lastItemId, setLastItemId] = useState<number>(9)

  const getColumnId = (itemId: string): string | null => {
    const item = items.find((item) => item.id === itemId)
    return item ? item.columnId : null
  }

  const addNewItem = (title: string, columnId?: string): void => {
    if (!title || !columnId) return

    setLastItemId(lastItemId + 1)
    console.log('last: ', lastItemId)

    const newItemId = 'i' + lastItemId.toString()
    console.log('new: ', newItemId)
    setItems((items) => [
      ...items,
      { id: newItemId.toString(), title, columnId, key: lastItemId + 1 },
    ])
  }

  const removeItem = (id: string): void => {
    if (!id) return

    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    setActiveId(null)
    const { active, over } = event

    if (!over) return

    if (
      Array.from(over.id.toString())[0] === 'i' &&
      Array.from(active.id.toString())[0] === 'i'
    ) {
      const activeIndex = items.findIndex((item) => item.id === active.id)
      const overIndex = items.findIndex((item) => item.id === over.id)
      setItems((items) => {
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  const handleDragStart = (event: DragStartEvent): void => {
    setActiveId(event.active.id)
  }

  const handleDragOver = (event: DragOverEvent): void => {
    const { active, over } = event

    if (!over) return

    if (Array.from(over.id.toString())[0] === 'c') {
      setTimeout(() => {
        setItems((items) => {
          const activeIndex = items.findIndex((item) => item.id === active.id)

          items[activeIndex].columnId = over.id.toString()
          return arrayMove(items, activeIndex, activeIndex)
        })
      }, 0)
    }
    if (Array.from(over.id.toString())[0] === 'i') {
      const activeItemColumnId = getColumnId(active.id.toString())
      const overItemColumnId = getColumnId(over.id.toString()) ?? ''

      if (activeItemColumnId !== overItemColumnId) {
        setTimeout(() => {
          setItems((items) => {
            const activeIndex = items.findIndex((item) => item.id === active.id)

            items[activeIndex].columnId = overItemColumnId
            return arrayMove(items, activeIndex, activeIndex)
          })
        }, 0)
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  return (
    <main className="flex flex-row justify-center gap-6 pt-16">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        {columns.map((column) => (
          <VerticalList
            items={items}
            key={column.key}
            columnId={column.id}
            title={column.title}
            addNewItemHandler={addNewItem}
            removeItemHandler={removeItem}
          />
        ))}
        {activeId ? (
          <DragOverlay>
            <div className="mb-3 flex flex-row justify-between rounded-md bg-gray-200 p-4 text-lg">
              <p>
                {items[items.findIndex((item) => item.id === activeId)].title}
              </p>
            </div>
          </DragOverlay>
        ) : null}
      </DndContext>
    </main>
  )
}

export default MultipleVerticalListsPage
