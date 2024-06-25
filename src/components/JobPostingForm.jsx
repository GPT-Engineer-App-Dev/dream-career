import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, useToast } from "@chakra-ui/react";

const JobPostingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.company && formData.location && formData.type) {
      onSubmit(formData);
      setFormData({ title: "", company: "", location: "", type: "" });
      toast({
        title: "Job Posted",
        description: "Your job listing has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Software Engineer" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Company</FormLabel>
          <Input name="company" value={formData.company} onChange={handleChange} placeholder="e.g. TechCorp" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. San Francisco, CA" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Job Type</FormLabel>
          <Select name="type" value={formData.type} onChange={handleChange} placeholder="Select job type">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Post Job
        </Button>
      </VStack>
    </Box>
  );
};

export default JobPostingForm;