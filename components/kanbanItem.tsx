import { useState } from 'react'
import DragHandleIcon from './icons/dragHandle'
import EditIcon from './icons/edit'
import { Input } from './ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function KanbanItem({
  itemId,
  title,
  isDragOverlay = false,
  changeItemTitleHandler,
  removeItemHandler,
}: {
  itemId: string
  title: string
  isDragOverlay?: boolean
  changeItemTitleHandler: (itemId: string, newTitle: string) => void
  removeItemHandler: (itemId: string) => void
}): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!isDragging) {
    return (
      <div
        className="my-2 flex h-16 flex-row items-center justify-between rounded-md bg-gray-200"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex h-16 flex-row items-center gap-1">
          {editMode ? (
            <Input
              value={title}
              className="m-2 h-6"
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                setEditMode(false)
              }}
              onChange={(e) => {
                changeItemTitleHandler(itemId, e.target.value)
              }}
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
            />
          ) : (
            <>
              {!isDragOverlay ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className=" ml-2 mr-1 scale-90">
                      <EditIcon />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditMode(true)
                      }}
                    >
                      <span>Edit title</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        removeItemHandler(itemId)
                      }}
                    >
                      <span className="text-red-600">Remove item</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className=" ml-2 mr-1 h-6 w-6 scale-90"></div>
              )}
              <h3 className="text-lg">{title}</h3>
            </>
          )}
        </div>
        <div {...attributes} {...listeners}>
          <DragHandleIcon color="bg-black" />
        </div>
      </div>
    )
  } else {
    return (
      <div
        className="my-2 flex h-16 flex-row items-center justify-between rounded-md border-2 border-black bg-gray-200 opacity-20"
        ref={setNodeRef}
        style={style}
      ></div>
    )
  }
}

export default KanbanItem
