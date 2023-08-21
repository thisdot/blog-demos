import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Card,
  Button,
  HorizontalStack,
  Box,
  Divider,
  List,
  Link,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `query getOrders {
        fulfillmentOrders (first: 30) {
          edges {
            node {
              requestStatus
              createdAt
              updatedAt
              status
              fulfillAt
              fulfillBy
              fulfillments (first: 10) {
                edges {
                  node {
                    createdAt
                    deliveredAt
                    displayStatus
                    estimatedDeliveryAt
                    id
                    inTransitAt
                    legacyResourceId
                    name
                    status
                    totalQuantity
                    updatedAt
                    trackingInfo {
                      company
                      number
                      url
                    }
                  }
                }
              }
              order {
                id
                name
                note
                createdAt
                displayFulfillmentStatus
              }
              assignedLocation {
                address1
                address2
                city
                countryCode
                name
                phone
                province
                zip
              }
              destination {
                address1
                address2
                city
                company
                countryCode
                email
                firstName
                lastName
                phone
                province
                zip
              }
            }
          }
        }
      }
    `
  );

  const responseJson = await response.json();
  const orders = responseJson?.data?.fulfillmentOrders?.edges?.map(
    (edge) => edge.node
  ) || [[]];

  const { session } = await authenticate.admin(request);
  const fulfillmentIds = [];
  for (const { order } of orders) {
    const fulfillmentOrder = await admin.rest.resources.FulfillmentOrder.all({
      session: session,
      order_id: order.id.replace("gid://shopify/Order/", ""),
    });
    fulfillmentOrder.data.map(({ id, status }) => {
      if (status === "open") fulfillmentIds.push({ id });
    });
  }

  fulfillmentIds.map((item) => {
    item.company = "USPS";
    item.trackingNumber = "1Z001985YW99744790";
  });

  for (const fulfillmentId of fulfillmentIds) {
    if (fulfillmentId) {
      const fulfillment = new admin.rest.resources.Fulfillment({
        session: session,
      });
      fulfillment.line_items_by_fulfillment_order = [
        {
          fulfillment_order_id: fulfillmentId?.id,
        },
      ];
      fulfillment.tracking_info = {
        company: fulfillmentId?.company,
        number: fulfillmentId?.trackingNumber,
      };
      await fulfillment.save({
        update: true,
      });
    }
  }

  return json({
    orders: orders,
    fulfillmentIds: fulfillmentIds,
  });
}

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();

  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  useEffect(() => {
    if (actionData?.orders) {
      shopify.toast.show("Orders received");
    }
  }, [actionData]);

  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Generate a product
        </button>
      </ui-title-bar>
      <VerticalStack gap="5">
        <Layout>
          <Layout.Section>
            <Card>
              <VerticalStack gap="5">
                <VerticalStack gap="2">
                  <Text as="h2" variant="headingMd">
                    Congrats on creating a new Shopify app 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This embedded app template uses{" "}
                    <Link
                      url="https://shopify.dev/docs/apps/tools/app-bridge"
                      target="_blank"
                    >
                      App Bridge
                    </Link>{" "}
                    interface examples like an{" "}
                    <Link url="/app/additional">
                      additional page in the app nav
                    </Link>
                    , as well as an{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql"
                      target="_blank"
                    >
                      Admin GraphQL
                    </Link>{" "}
                    mutation demo, to provide a starting point for app
                    development.
                  </Text>
                </VerticalStack>
                <VerticalStack gap="2">
                  <Text as="h3" variant="headingMd">
                    Get started with products
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Generate a product with GraphQL and get the JSON output for
                    that product. Learn more about the{" "}
                    <Link
                      url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                      target="_blank"
                    >
                      productCreate
                    </Link>{" "}
                    mutation in our API references.
                  </Text>
                </VerticalStack>
                <HorizontalStack gap="3" align="end">
                  <Button loading={isLoading} primary onClick={generateProduct}>
                    Generate a product
                  </Button>
                </HorizontalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <VerticalStack gap="5">
              <Card>
                <VerticalStack gap="2">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <VerticalStack gap="2">
                    <Divider />
                    <HorizontalStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link url="https://remix.run" target="_blank">
                        Remix
                      </Link>
                    </HorizontalStack>
                    <Divider />
                    <HorizontalStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link url="https://www.prisma.io/" target="_blank">
                        Prisma
                      </Link>
                    </HorizontalStack>
                    <Divider />
                    <HorizontalStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link url="https://polaris.shopify.com" target="_blank">
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                        >
                          App Bridge
                        </Link>
                      </span>
                    </HorizontalStack>
                    <Divider />
                    <HorizontalStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                      >
                        GraphQL API
                      </Link>
                    </HorizontalStack>
                  </VerticalStack>
                </VerticalStack>
              </Card>
              <Card>
                <VerticalStack gap="2">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List spacing="extraTight">
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </VerticalStack>
              </Card>
            </VerticalStack>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
