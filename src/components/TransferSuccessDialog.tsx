import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

export function TransferSuccessDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg">
          <Dialog.Title className="text-lg font-bold mb-2">Transferência realizada!</Dialog.Title>
          <Dialog.Description className="mb-4">Sua transferência foi concluída com sucesso.</Dialog.Description>
          <Dialog.Close className="btn btn-primary transition-all duration-300 active:scale-95 focus:ring-2 focus:ring-indigo-400">Fechar</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
