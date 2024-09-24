import {
  IndexTable,
  Card,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";
import { useEffect, useMemo, useState } from "react";
import ProductRowMarkup from "./ProductRowMarkup";
import AddProductModal from "./AddProductModal";

const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

function Products() {
  const { mode, setMode } = useSetIndexFiltersMode();

  const [queryValue, setQueryValue] = useState("");

  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        const startDate = new Date(2024, 1, 1);
        const endDate = new Date();

        const fakeData = data.map((item) => {
          return {
            ...item,
            ruleCount: Math.floor(Math.random() * 10),
            lastUpdate: randomDate(startDate, endDate).toLocaleString(),
            status: Math.random() < 0.5,
          };
        });
        setProducts(fakeData);
      });
  }, []);

  const filteredProducts = useMemo(
    () =>
      products?.filter((item) => {
        switch (filterType) {
          case "active":
            return item.status;

          case "no_rules":
            return item.ruleCount < 1;

          default:
            return true;
        }
      }),
    [products, filterType]
  );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(filteredProducts);

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Products
          </Text>
          <AddProductModal />
        </InlineGrid>
        <IndexFilters
          tabs={[
            {
              content: "All",
              id: 0,
              onAction: () => setFilterType("all"),
            },
            {
              content: "Active",
              id: 1,
              onAction: () => setFilterType("active"),
            },
            {
              content: "No rules",
              id: 2,
              onAction: () => setFilterType("no_rules"),
            },
          ]}
          queryValue={queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={(value) => setQueryValue(value)}
          onQueryClear={() => setQueryValue("")}
          cancelAction={{
            onAction: () => null,
            disabled: false,
            loading: false,
          }}
          filters={[]}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          resourceName={{
            singular: "product",
            plural: "products",
          }}
          itemCount={filteredProducts.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "" },
            { title: "Product" },
            { title: "Rule(s)", alignment: "center" },
            { title: "Last update" },
            { title: "Status" },
            { title: "" },
          ]}
        >
          {filteredProducts?.map((product) => (
            <ProductRowMarkup
              key={product.id}
              product={product}
              selectedResources={selectedResources}
            />
          ))}
        </IndexTable>
      </BlockStack>
    </Card>
  );
}

export default Products;
