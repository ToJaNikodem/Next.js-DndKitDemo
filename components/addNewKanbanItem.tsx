import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'

function AddNewKanbanItem({
  columnId,
  addNewItemHandler,
}: {
  columnId: string
  addNewItemHandler: (columnId: string, title: string) => void
}): JSX.Element {
  const [itemName, setItemName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="m-auto mt-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className={buttonVariants({ variant: 'default' })}>
            Add new item
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new item</DialogTitle>
            <DialogDescription>
              Enter the name of the item you want to add and then click the add
              button.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name">Item name</Label>
            <Input
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              value={itemName}
              id="name"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setOpen(false)
                addNewItemHandler(columnId, itemName)
                setItemName('')
              }}
              type="submit"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewKanbanItem
