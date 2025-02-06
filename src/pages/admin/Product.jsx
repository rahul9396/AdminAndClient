import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePostApi } from "../../hooks/usePostApi";
import { Row, Col, Card, CardBody, Input, FormGroup, Label, Form, Button } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";

export default function Product() {
    const { id } = useParams()
    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        image: null,
        description: "",
    })

    const { mutate, isLoading, isError, error, isSuccess } = usePostApi("products");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setForm((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form, {
            onSuccess: () => {
                toast.success("Data Edited Successfully");
                // navigate("/admin"); 
            },
            onError: (error) => {
                toast.error(`Failed to Edit Data: ${error.message}`);
            }
        });
    };

    if (isError) {
        <p>Cant Post Data</p>
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="title">
                                                Title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="Enter Title"
                                                type="text"
                                                value={form.title}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="category">
                                                Category
                                            </Label>
                                            <Input
                                                id="category"
                                                name="category"
                                                placeholder="Enter Category"
                                                type="text"
                                                value={form.category}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="price">
                                                Price
                                            </Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                placeholder="Enter Price"
                                                type="number"
                                                value={form.price}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="image">
                                                Image
                                            </Label>
                                            <Input
                                                id="image"
                                                name="image"
                                                type="file"
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="description">
                                                Description
                                            </Label>
                                            <Input
                                                id="description"
                                                name="description"
                                                placeholder="Enter Description"
                                                type="textarea"
                                                value={form.description}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Save
                                </Button>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}