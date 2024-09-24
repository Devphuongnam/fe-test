import { Button, Modal } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { useState } from 'react';
import AddRule from './AddRule';

function AddRuleModal({ product }) {
  const [isShow, setIsShow] = useState(false);

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState([{}]);

  const handleSubmit = () => {
    setErrors([]);

    let isSuccessfully = true;

    formData?.forEach((row, index) => {
      const { title, startDate, endDate, buyFrom, buyTo, discount } = row;

      if (startDate) {
        if (!endDate) {
          isSuccessfully = false;
          setErrors((prev) => {
            prev[index] = prev[index] || {};
            prev[index]['startDate'] = 'Start Date phải nhỏ hơn End Date';
            return [...prev];
          });
        } else {
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);

          if (startDateObj >= endDateObj) {
            isSuccessfully = false;
            setErrors((prev) => {
              prev[index] = prev[index] || {};
              prev[index]['startDate'] = 'Start Date phải nhỏ hơn End Date';
              return [...prev];
            });
          }
        }
      }

      console.log({ buyFrom, buyTo });

      if (buyFrom && (!buyTo || buyFrom >= buyTo)) {
        isSuccessfully = false;
        setErrors((prev) => {
          prev[index] = prev[index] || {};
          prev[index]['buyFrom'] = 'Buy From phải nhỏ hơn Buy To';
          return [...prev];
        });
      }
    });

    if (isSuccessfully) {
      setFormData([{}]);
      setIsShow(false);
    }

    console.log({ formData });
  };

  return (
    <Modal
      activator={
        <Button
          icon={PlusIcon}
          onClick={() => {
            setIsShow(true);
          }}
        >
          Add Rule
        </Button>
      }
      open={isShow}
      onClose={() => setIsShow(false)}
      title={`Add rule for product: #${product.id}`}
      primaryAction={{
        content: 'Save',
        onAction: () => handleSubmit(),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => setIsShow(false),
        },
      ]}
    >
      <Modal.Section>
        <AddRule errors={errors} formData={formData} setFormData={setFormData} />
      </Modal.Section>
    </Modal>
  );
}

export default AddRuleModal;
