import { Button, Form, FormLayout, TextField } from '@shopify/polaris';
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import './AddRule.css';

function AddRule({ errors, formData, setFormData }) {
  return (
    <Form>
      <FormLayout>
        {formData?.map((item, index) => (
          <div className='add-rule-row' key={index}>
            <FormLayout.Group condensed>
              <TextField
                label='Title campaign'
                value={formData?.[index]?.title}
                error={errors?.[index]?.title}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].title = value;
                    return [...prev];
                  });
                }}
              />

              <TextField
                label='Start date'
                type='date'
                value={formData?.[index]?.startDate}
                error={errors?.[index]?.startDate}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].startDate = value;
                    return [...prev];
                  });
                }}
              />

              <TextField
                label='End date'
                type='date'
                value={formData?.[index]?.endDate}
                error={errors?.[index]?.endDate}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].endDate = value;
                    return [...prev];
                  });
                }}
              />

              <TextField
                label='Buy from'
                type='number'
                value={formData?.[index]?.buyFrom}
                error={errors?.[index]?.buyFrom}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].buyFrom = value;
                    return [...prev];
                  });
                }}
              />

              <TextField
                label='Buy to'
                type='number'
                value={formData?.[index]?.buyTo}
                error={errors?.[index]?.buyTo}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].buyTo = value;
                    return [...prev];
                  });
                }}
              />

              <TextField
                label='Discount per item(%}'
                type='number'
                min={0}
                max={100}
                value={formData?.[index]?.discount}
                error={errors?.[index]?.discount}
                onChange={(value) => {
                  setFormData((prev) => {
                    prev[index].discount = value;
                    return [...prev];
                  });
                }}
              />
            </FormLayout.Group>
            <Button
              icon={DeleteIcon}
              onClick={() =>
                setFormData((prev) => {
                  prev?.splice(index, 1);
                  return [...prev];
                })
              }
            />
          </div>
        ))}
      </FormLayout>

      <hr />
      <Button
        icon={PlusIcon}
        onClick={() => {
          setFormData((prev) => {
            return [...prev, {}];
          });
        }}
      >
        Add
      </Button>
    </Form>
  );
}

export default AddRule;
