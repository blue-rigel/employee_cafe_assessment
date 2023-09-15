import { Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../forms/employee";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, updateEmployee } from "../redux/slice/employee";

const { Title } = Typography;

export default function AddEditEmployee() {
    const location = useLocation();
    const dispatch = useDispatch();
    const cafe = useSelector((state) => state.cafe.data);
    const route = useNavigate();
    const { employeeId } = useParams();
    const mode = location.pathname.split("/")[2] === "add" ? "Add" : "Edit";

    const submit = (values) => {
        if (mode === "Add") {
            dispatch(
                createEmployee({
                    id: `UI${Math.random()
                        .toString(36)
                        .substr(2, 7)}`.toUpperCase(),
                    ...values,
                }),
            );
        } else {
            dispatch(updateEmployee({ id: employeeId, ...values }));
        }
        setTimeout(() => {
            route("/employees");
        }, 2000);
    };

    return (
        <>
            <Title level={2}>{mode} Employee</Title>
            <EmployeeForm onSubmit={submit} cafe={cafe} />
        </>
    );
}
