import { IndexTable, Text, Badge, Thumbnail } from '@shopify/polaris';
import AddRuleModal from './AddRuleModal';

function ProductRowMarkup({ product, selectedResources }) {
  return (
    <IndexTable.Row id={product.id} key={product.id} selected={selectedResources.includes(product.id)}>
      <IndexTable.Cell>
        <Thumbnail
          source='https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg'
          alt='Black choker necklace'
        />
      </IndexTable.Cell>
      <IndexTable.Cell>{product.title}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as='span' alignment='center' numeric>
          {product.ruleCount}
        </Text>
      </IndexTable.Cell>

      <IndexTable.Cell>{product.lastUpdate}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={product.status ? 'success' : undefined}>{product.status ? 'Active' : 'Unactive'}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AddRuleModal product={product} />
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}

export default ProductRowMarkup;
