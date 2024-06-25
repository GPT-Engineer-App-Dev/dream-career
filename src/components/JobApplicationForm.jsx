import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast } from "@chakra-ui/react";

const JobApplicationForm = ({ jobId, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: "",
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
    if (formData.name && formData.email && formData.resume) {
      onSubmit({ ...formData, jobId });
      setFormData({ name: "", email: "", resume: "", coverLetter: "" });
      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
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
          <FormLabel>Full Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Resume (URL)</FormLabel>
          <Input name="resume" value={formData.resume} onChange={handleChange} placeholder="https://example.com/resume.pdf" />
        </FormControl>
        <FormControl>
          <FormLabel>Cover Letter</FormLabel>
          <Textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Your cover letter..." />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="100%">
          Submit Application
        </Button>
      </VStack>
    </Box>
  );
};

export default JobApplicationForm;