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

function AddNewKanbanColumn({
  addNewColumnHandler,
}: {
  addNewColumnHandler: (title: string) => void
}): JSX.Element {
  const [columnName, setColumnName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: 'default' })}>
          Add new column
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new column</DialogTitle>
          <DialogDescription>
            Enter the name of the column you want to add and then click the add
            button.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name">Column name</Label>
          <Input
            onChange={(e) => {
              setColumnName(e.target.value)
            }}
            value={columnName}
            id="name"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false)
              addNewColumnHandler(columnName)
              setColumnName('')
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

export default AddNewKanbanColumn
