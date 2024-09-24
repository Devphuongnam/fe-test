import { Button, Modal } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import AddProduct from "./AddProduct";

function AddProductModal() {
  const [isShow, setIsShow] = useState(false);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    setErrors({});

    let isSuccessfully = true;

    if (!formData?.title?.length) {
      isSuccessfully = false;
      setErrors((prev) => ({ ...prev, title: "Trường bắt buộc." }));
    }

    if (!formData?.price?.length) {
      isSuccessfully = false;
      setErrors((prev) => ({ ...prev, price: "Trường bắt buộc." }));
    }

    if (isSuccessfully) {
      setFormData({});
      setIsShow(false);
    }

    console.log({ formData });
  };

  return (
    <Modal
      activator={
        <Button onClick={() => setIsShow(true)} icon={PlusIcon}>
          Add Product
        </Button>
      }
      open={isShow}
      onClose={() => setIsShow(false)}
      title="Add Product"
      primaryAction={{
        content: "Save",
        onAction: () => handleSubmit(),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => setIsShow(false),
        },
      ]}
    >
      <Modal.Section>
        <AddProduct
          errors={errors}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal.Section>
    </Modal>
  );
}

export default AddProductModal;
