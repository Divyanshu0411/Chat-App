import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  // image manage
  // const postDetails = (pics) => {
  //     setLoading(true);
  //     if (pics === undefined) {
  //         toast({
  //             title: "Please Select an Image !",
  //             description: "warning",
  //             duration: 5000,
  //             isClosable: true,
  //             position: "top",
  //         });
  //         return;
  //     }
  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //         const data = new FormData();
  //         data.append("file", pics);
  //         data.append("upload_preset", "chat-app");
  //         data.append("cloud_name", "dmszoafyt");
  //         fetch("https://api.cloudinary.com/v1_1/dmszoafyt/image/upload", {
  //             method: "post",
  //             body: data,
  //         })
  //             .then((res) => res.json())
  //             .then((data) => {
  //                 setPic(data.url.toString());
  //                 console.log(data.url.toString());
  //                 setLoading(false);
  //             })
  //             .catch((err) => {
  //                 console.log(err);
  //                 setLoading(false);
  //             });
  //     } else {
  //         toast({
  //             title: "Please Select an Image!",
  //             status: "warning",
  //             duration: 5000,
  //             isClosable: true,
  //             position: "bottom",
  //         });
  //         setLoading(false);
  //         return;
  //     }
  // };
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dmszoafyt");

      fetch("https://api.cloudinary.com/v1_1/dmszoafyt/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            setPic(data.secure_url.toString());
            toast({
              title: "Image Uploaded Successfully!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            console.log(data.secure_url.toString());
          } else {
            throw new Error("Failed to upload image.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          toast({
            title: "Error Uploading Image!",
            description:
              err.message || "Something went wrong. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select a Valid Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  // const submitHandler = async () => {
  //     setLoading(true);
  //     if (!name || !email || !password || !confirmpassword) {
  //         toast({
  //             title: "Please Fill all the Feilds",
  //             status: "warning",
  //             duration: 3000,
  //             isClosable: true,
  //             position: "top",
  //         });
  //         setLoading(false);
  //         return;
  //     }
  //     if (password !== confirmpassword) {
  //         toast({
  //             title: "Password Do Not Match",
  //             status: "warning",
  //             duration: 3000,
  //             isClosable: true,
  //             position: "top",
  //         });
  //         return;
  //     }
  //     try {
  //         const config = {
  //             headers: {
  //                 "Content-type": "application/json",
  //             },
  //         };
  //         const { data } = await axios.post(
  //             "http://localhost:5000/api/user",
  //             { name, email, password, pic },
  //             config
  //         );
  //         toast({
  //             title: "Registration Successful",
  //             status: "success",
  //             duration: 3000,
  //             isClosable: true,
  //             position: "bottom",
  //         });
  //         localStorage.setItem("userInfo", JSON.stringify(data));
  //         setLoading(false);
  //         navigate("/chats");
  //     } catch (error) {
  //         toast({
  //             title: "Error Ocured!",
  //             description: error.response.data.message,
  //             status: "error",
  //             duration: 3000,
  //             isClosable: true,
  //             position: "bottom",
  //         });
  //         setLoading(false);
  //     }
  // };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name </FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email </FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="cpassword" isRequired>
        <FormLabel>Confirm Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            value={confirmpassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
