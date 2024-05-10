'use client'

import AddNewKanbanColumn from '@/components/addNewKanbanColumn'
import DragHandleIcon from '@/components/icons/dragHandle'
import KanbanColumn from '@/components/kanbanColumn'
import KanbanItem from '@/components/kanbanItem'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  rectIntersection,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'

type Column = {
  id: string
  title: string
}

export type Item = {
  id: string
  title: string
  columnId: string
}

function KanbanBoardPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'c1',
      title: 'col 1',
    },
    {
      id: 'c2',
      title: 'col 2',
    },
    {
      id: 'c3',
      title: 'col 3',
    },
  ])

  const [items, setItems] = useState<Item[]>([
    {
      id: 'i1',
      title: 'item1',
      columnId: 'c3',
    },
    {
      id: 'i2',
      title: 'item2',
      columnId: 'c1',
    },
    {
      id: 'i3',
      title: 'item3',
      columnId: 'c2',
    },
    {
      id: 'i4',
      title: 'item4',
      columnId: 'c1',
    },
    {
      id: 'i5',
      title: 'item5',
      columnId: 'c2',
    },
    {
      id: 'i6',
      title: 'item6',
      columnId: 'c1',
    },
    {
      id: 'i7',
      title: 'item7',
      columnId: 'c1',
    },
  ])

  const [lastColumnId, setLastColumnId] = useState<number>(3)
  const [lastItemId, setLastItemId] = useState<number>(7)

  const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(
    null
  )

  const getColumnId = (itemId: string) => {
    const item = items.find((item) => item.id === itemId)
    return item ? item.columnId : null
  }

  const changeItemTitle = (id: string, newTitle: string) => {
    if (!id || !newTitle) return

    const newItems = items.map((item) => {
      if (item.id !== id) return item
      return { ...item, title: newTitle }
    })
    setItems(newItems)
  }

  const addNewColumn = (title: string) => {
    if (!title) return

    const newColumnId = 'c' + lastColumnId + 1
    setColumns((columns) => [...columns, { id: newColumnId, title }])
    setLastColumnId(lastColumnId + 1)
  }

  const changeColumnTitle = (id: string, newTitle: string) => {
    if (!id || !newTitle) return

    const newColumns = columns.map((column) => {
      if (column.id !== id) return column
      return { ...column, title: newTitle }
    })
    setColumns(newColumns)
  }

  const removeColumn = (id: string) => {
    if (!id) return

    const newColumns = columns.filter((column) => column.id !== id)
    setColumns(newColumns)
  }

  const removeItem = (id: string) => {
    if (!id) return

    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const addNewItem = (columnId: string, title: string) => {
    const newItemId = 'i' + lastItemId + 1
    setItems((items) => [...items, { id: newItemId, columnId, title }])
    setLastItemId(lastItemId + 1)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    if (
      Array.from(active.id.toString())[0] === 'i' &&
      Array.from(over.id.toString())[0] === 'i'
    ) {
      const activeItemColumnId = getColumnId(active.id.toString())
      const overItemColumnId = getColumnId(over.id.toString()) || ''

      if (activeItemColumnId !== overItemColumnId) {
        setItems((items) => {
          const activeIndex = items.findIndex((item) => item.id === active.id)

          items[activeIndex].columnId = overItemColumnId
          return arrayMove(items, activeIndex, activeIndex)
        })
      }
    }
    if (
      Array.from(active.id.toString())[0] === 'i' &&
      Array.from(over.id.toString())[0] === 'c'
    ) {
      setItems((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id)

        items[activeIndex].columnId = over.id.toString()
        return arrayMove(items, activeIndex, activeIndex)
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    if (
      Array.from(active.id.toString())[0] === 'c' &&
      Array.from(over.id.toString())[0] === 'c'
    ) {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === active.id
      )
      const overColumnIndex = columns.findIndex(
        (column) => column.id === over.id
      )

      setColumns((columns) =>
        arrayMove(columns, activeColumnIndex, overColumnIndex)
      )
    }
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

  return (
    <main className="flex flex-row justify-center gap-6 overflow-x-auto pt-16">
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              columnId={column.id}
              title={column.title}
              items={items}
              changeColumnTitleHandler={changeColumnTitle}
              removeColumnHandler={removeColumn}
              changeItemTitleHandler={changeItemTitle}
              removeItemHandler={removeItem}
              addNewItemHandler={addNewItem}
            />
          ))}
        </SortableContext>
        <AddNewKanbanColumn addNewColumnHandler={addNewColumn} />
        {activeDragId ? (
          <DragOverlay>
            {Array.from(activeDragId.toString())[0] === 'c' ? (
              <div className="min-h-16 w-96 rounded-md bg-white">
                <div className="flex flex-row items-center justify-between rounded-t-md bg-neutral-900">
                  <div className="flex h-14 flex-row items-center">
                    <h2 className="p-3 text-2xl text-white">
                      {
                        columns[
                          columns.findIndex(
                            (column) => column.id === activeDragId
                          )
                        ].title
                      }
                    </h2>
                  </div>
                  <DragHandleIcon color="bg-white" />
                </div>
                <div className="flex flex-col p-4">
                  {items.map((item) => {
                    if (item.columnId === activeDragId) {
                      return (
                        <KanbanItem
                          key={item.id}
                          itemId={item.id}
                          title={item.title}
                          changeItemTitleHandler={changeItemTitle}
                          isDragOverlay={true}
                          removeItemHandler={removeItem}
                        />
                      )
                    }
                  })}
                </div>
              </div>
            ) : (
              <div className="my-2 flex h-16 flex-row items-center justify-between rounded-md bg-gray-300">
                <div className="flex h-16 flex-row items-center gap-1">
                  <div className=" ml-2 mr-1 h-6 w-6 scale-90"></div>
                  <h3 className="text-lg">
                    {
                      items[items.findIndex((item) => item.id === activeDragId)]
                        .title
                    }
                  </h3>
                </div>
                <div>
                  <DragHandleIcon color="bg-black" />
                </div>
              </div>
            )}
          </DragOverlay>
        ) : null}
      </DndContext>
    </main>
  )
}

export default KanbanBoardPage
