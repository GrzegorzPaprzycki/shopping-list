"use client";
import { createNewShoppingList } from "@/lib/api";
import { SyntheticEvent, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

const NewShoppingList = () => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await createNewShoppingList(name);
    closeModal();
    router.refresh();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Shopping List</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8">
        <h1 className="text-3xl mb-6">New Shopping List</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="list name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button className="mx-4" type="submit">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default NewShoppingList;
