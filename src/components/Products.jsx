import {
  IndexTable,
  Card,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Pagination,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        const matchFilter =
          filterType === "active"
            ? item.status
            : filterType === "no_rules"
            ? item.ruleCount < 1
            : true;

        const matchTitle = item.title
          .toLowerCase()
          .includes(queryValue.toLowerCase());

        return matchFilter && matchTitle;
      }),
    [products, filterType, queryValue]
  );

  const totalItems = filteredProducts.length;

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(currentItems);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage))
      setCurrentPage(currentPage + 1);
  };

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
          queryPlaceholder="Search by title"
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
          itemCount={currentItems.length}
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
          {currentItems?.map((product) => (
            <ProductRowMarkup
              key={product.id}
              product={product}
              selectedResources={selectedResources}
            />
          ))}
        </IndexTable>

        <Pagination
          hasPrevious={currentPage > 1}
          onPrevious={handlePreviousPage}
          hasNext={currentPage < Math.ceil(totalItems / itemsPerPage)}
          onNext={handleNextPage}
        />
      </BlockStack>
    </Card>
  );
}

export default Products;
