"use client";
import { createNewItem } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewItem = () => {
  const router = useRouter();
  const params: any = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    params && (await createNewItem(name, params.id));
    closeModal();
    router.refresh();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button
        className="text-violet-400"
        intent="text"
        onClick={() => openModal()}>
        + Create New Item
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8">
        <h1 className="text-3xl mb-6">New Item</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            placeholder="item name"
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

export default NewItem;
