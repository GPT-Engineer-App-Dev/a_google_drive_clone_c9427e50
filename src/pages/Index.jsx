import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Image, Grid, GridItem, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { FaFolder, FaFile, FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddFolder = () => {
    if (folderName.trim() !== "") {
      setFiles([...files, { name: folderName, type: "folder" }]);
      setFolderName("");
      onClose();
    }
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        My Drive
      </Heading>
      <Box mb={8}>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          New Folder
        </Button>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {files.map((file, index) => (
          <GridItem key={index}>
            <Box borderWidth={1} borderRadius="lg" p={4} display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                {file.type === "folder" ? <FaFolder size={24} /> : <FaFile size={24} />}
                <Text ml={2}>{file.name}</Text>
              </Box>
              <IconButton icon={<FaTrash />} size="sm" onClick={() => handleDeleteFile(index)} />
            </Box>
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Folder</ModalHeader>
          <ModalBody>
            <Input placeholder="Folder Name" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddFolder}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
