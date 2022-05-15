import Link from "next/link";
import Image from "next/image";

import Property from "../components/Property";

import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  butonText,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1} <br /> {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>{butonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForSale, propertiesForRent);
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        butonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/170790211/7f71a54661bf4a389ccd3e38c766c5d6"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map(property => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy and Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        butonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/170063902/86176551087d4f61ae454f0d8ccd0c3d"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map(property => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

// If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
