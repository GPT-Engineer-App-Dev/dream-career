import React, { useState } from "react";
import { Box, Container, Heading, Input, Button, VStack, HStack, Text, SimpleGrid, Badge, useColorModeValue } from "@chakra-ui/react";
import { FaSearch, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

const jobListings = [
  { id: 1, title: "Software Engineer", company: "TechCorp", location: "San Francisco, CA", type: "Full-time" },
  { id: 2, title: "Product Manager", company: "InnovateCo", location: "New York, NY", type: "Full-time" },
  { id: 3, title: "UX Designer", company: "DesignHub", location: "Remote", type: "Contract" },
  { id: 4, title: "Data Analyst", company: "DataDriven", location: "Chicago, IL", type: "Part-time" },
  { id: 5, title: "Marketing Specialist", company: "GrowthInc", location: "Los Angeles, CA", type: "Full-time" },
];

const JobCard = ({ job }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
      <Heading fontSize="xl">{job.title}</Heading>
      <Text mt={2}>{job.company}</Text>
      <HStack mt={2}>
        <FaMapMarkerAlt />
        <Text>{job.location}</Text>
      </HStack>
      <Badge mt={2} colorScheme="green">{job.type}</Badge>
    </Box>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>Find Your Dream Job</Heading>
          <Text fontSize="xl" color="gray.500">Discover opportunities that match your skills and aspirations</Text>
        </Box>

        <HStack as="form" spacing={4}>
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            borderRadius="full"
          />
          <Button leftIcon={<FaSearch />} colorScheme="blue" size="lg" borderRadius="full" type="submit">
            Search
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </SimpleGrid>

        {filteredJobs.length === 0 && (
          <Box textAlign="center" py={10}>
            <FaBriefcase size="48px" style={{ margin: '0 auto' }} />
            <Text mt={4} fontSize="xl">No jobs found. Try adjusting your search.</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;