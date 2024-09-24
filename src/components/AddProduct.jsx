import { DropZone, Form, FormLayout, LegacyStack, Text, TextField, Thumbnail } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import { useCallback } from 'react';

function AddProduct({ errors, formData, setFormData }) {
  const handleDropZoneDrop = useCallback(
    (dropFiles, acceptedFiles, rejectedFiles) =>
      setFormData((prev) => ({ ...prev, files: [...(prev.files ?? []), ...acceptedFiles] })),
    []
  );
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  return (
    <Form>
      <FormLayout>
        <TextField
          label='Title'
          value={formData?.title}
          onChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
          error={errors?.title}
        />

        <TextField
          label='Price'
          type='number'
          value={formData?.price}
          onChange={(value) => setFormData((prev) => ({ ...prev, price: value }))}
          error={errors?.price}
        />

        <DropZone onDrop={handleDropZoneDrop} accept='image/*' type='image'>
          {(formData?.files?.length ?? 0) <= 5 && (
            <DropZone.FileUpload actionHint='Accepts .gif, .jpg, and .png' actionTitle='Add Images' />
          )}
        </DropZone>

        <div style={{ padding: '0' }}>
          <LegacyStack vertical>
            {formData?.files?.map((file, index) => (
              <LegacyStack alignment='center' key={index}>
                <Thumbnail
                  size='small'
                  alt={file.name}
                  source={validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon}
                />
                <div>
                  {file.name}{' '}
                  <Text variant='bodySm' as='p'>
                    {file.size} bytes
                  </Text>
                </div>
              </LegacyStack>
            ))}
          </LegacyStack>
        </div>

        <TextField
          label='Description'
          multiline={4}
          autoComplete='off'
          value={formData?.description}
          onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
          error={errors?.description}
        />
      </FormLayout>
    </Form>
  );
}

export default AddProduct;
