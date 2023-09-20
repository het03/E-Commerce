"use client";
import { Modal } from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
export const StoreModal = () => {
  const StoreModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Create a new store"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future create store form
    </Modal>
  );
};
