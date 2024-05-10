import { Item } from '@/app/kanban-board/page'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import TrashIcon from './icons/trash'
import EditIcon from './icons/edit'
import { Input } from './ui/input'
import KanbanItem from './kanbanItem'
import DragHandleIcon from './icons/dragHandle'
import AddNewKanbanItem from './addNewKanbanItem'

function KanbanColumn({
  columnId,
  title,
  items,
  removeColumnHandler,
  changeColumnTitleHandler,
  removeItemHandler,
  changeItemTitleHandler,
  addNewItemHandler,
}: {
  columnId: string
  title: string
  items: Item[]
  removeColumnHandler: (id: string) => void
  changeColumnTitleHandler: (id: string, newTitle: string) => void
  removeItemHandler: (id: string) => void
  changeItemTitleHandler: (id: string, newTitle: string) => void
  addNewItemHandler: (columId: string, title: string) => void
}) {
  const [columnItems, setColumnItems] = useState<Item[]>(
    items.filter((item) => item.columnId === columnId)
  )

  useEffect(() => {
    setColumnItems(items.filter((item) => item.columnId === columnId))
  }, [columnId, items])

  const [editMode, setEditMode] = useState<boolean>(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: columnId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!isDragging) {
    return (
      <div
        className="bg-white rounded-md min-h-16 w-96 relative"
        ref={setNodeRef}
        style={style}
      >
        <div className="bg-neutral-900 rounded-t-md flex flex-row justify-between items-center">
          <div className="flex flex-row h-14 items-center">
            {editMode ? (
              <Input
                value={title}
                className="m-2 h-8"
                onKeyDown={(event) => {
                  if (event.key !== 'Enter') return
                  setEditMode(false)
                }}
                onChange={(e) =>
                  changeColumnTitleHandler(columnId, e.target.value)
                }
                autoFocus
                onBlur={() => {
                  setEditMode(false)
                }}
              />
            ) : (
              <>
                <h2 className="text-white p-3 text-2xl">{title}</h2>
                <button
                  onClick={() => setEditMode(true)}
                  className="text-gray-200"
                >
                  <EditIcon />
                </button>
              </>
            )}
          </div>
          <div {...attributes} {...listeners}>
            <DragHandleIcon color="bg-white" scale="scale-125" />
          </div>
        </div>
        <div className="flex flex-col p-4">
          <SortableContext items={columnItems!}>
            {items.map((item) => {
              if (item.columnId === columnId) {
                return (
                  <KanbanItem
                    key={item.id}
                    itemId={item.id}
                    title={item.title}
                    changeItemTitleHandler={changeItemTitleHandler}
                    removeItemHandler={removeItemHandler}
                  />
                )
              }
            })}
          </SortableContext>
          <AddNewKanbanItem
            columnId={columnId}
            addNewItemHandler={addNewItemHandler}
          />
        </div>
        <div className="h-12 flex items-center justify-end absolute right-4 bottom-1">
          <button
            onClick={() => removeColumnHandler(columnId)}
            className="text-red-600"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="bg-white rounded-md min-h-16 w-96 border-black border-2 opacity-15"
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }
}

export default KanbanColumn
