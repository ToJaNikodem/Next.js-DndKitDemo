'use client'

import { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

function AddNewVerticalListItem({
  columnId,
  addNewItemHandler,
}: {
  columnId: string
  addNewItemHandler: (title: string, columnId?: string) => void
}): JSX.Element {
  const [itemName, setItemName] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="m-auto">
        <DialogTrigger>
          <div className={buttonVariants({ variant: 'default' })}>
            Add new item
          </div>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
          <DialogDescription>
            Enter the name of the item you want to add and then click add
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
              setItemName('')
              setOpen(false)
              addNewItemHandler(itemName, columnId)
            }}
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewVerticalListItem
