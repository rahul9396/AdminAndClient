import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardBody, Table, Spinner } from "reactstrap";
import { useApi } from "../../hooks/useApi";
import { useDeleteApi } from "../../hooks/usePostApi";
import { Pencil, Trash } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";


export default function Home() {
    const { data, loading, isError } = useApi('products')
    const { mutate: deleteProduct, isLoading: deleting, isError: deleteError } = useDeleteApi("products");
    const navigate = useNavigate()

    console.log("data in admin", data)

    if (loading) {
        <div> <Spinner color="primary">
            Loading...
        </Spinner></div>
    }

    if (isError) {
        <p>Something Went Wrong</p>
    }

    const navigateWithId = (id) => {
        navigate(`/admin/product/${id}`, {
            state: {
                productId: id
            }
        })
    }

    const handleDelete = (id) => {
        console.log("id in delete", id)
        deleteProduct(id, {
            onSuccess: () => {
                toast.success('Successfully Deleted!')
            },
            onError: (error) => {
                toast.error('Toast Not Deleted!')
            },
        });
    };

    const desccutter = (data) => {
        if (data.length > 70) {
            return `${data.slice(0, 70)}...`
        } else {
            return data
        }
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
                            {data && <Table
                                bordered
                                hover
                                responsive
                                size="sm"
                                striped
                            >
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Rating
                                        </th>
                                        <th>
                                            Edit
                                        </th>
                                        <th>
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.map((data, index) => {
                                        return (<tr key={index}>
                                            <th className="text-center">{index + 1}</th>
                                            <th>{data.title}</th>
                                            <th >{data.category}</th>
                                            <th >{desccutter(data.description)}</th>
                                            <th className="text-center">{data.price}</th>
                                            <th className="text-center">{data.rating.rate}</th>
                                            <th className="text-center hover:cursor-pointer" onClick={() => navigateWithId(data.id)}><Pencil /></th>
                                            <th className="text-center hover:cursor-pointer"
                                                onClick={() => handleDelete(data.id)}><Trash /></th>
                                        </tr>)
                                    })}

                                </tbody>
                            </Table>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}