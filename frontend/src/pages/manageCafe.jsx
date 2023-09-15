import { Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CafeForm from "../forms/cafe";
import { useDispatch } from "react-redux";
import { createCafe, updateCafe } from "../redux/slice/cafe";

const { Title } = Typography;

export default function AddEditCafe() {
    const location = useLocation();
    const dispatch = useDispatch();
    const route = useNavigate();
    const { cafeId } = useParams();
    const mode = location.pathname.split("/")[2] === "add" ? "Add" : "Edit";

    const submit = (values) => {
        if (mode === "Add") {
            dispatch(createCafe(values));
        } else {
            dispatch(updateCafe({ id: cafeId, ...values }));
        }
        setTimeout(() => {
            route("/");
        }, 2000);
    };

    return (
        <>
            <Title level={2}>{mode} Cafe</Title>
            <CafeForm onSubmit={submit} />
        </>
    );
}
