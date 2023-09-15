import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearEditEmployee,
    deleteEmployee,
    getEmployee,
    setEditEmployee,
} from "../redux/slice/employee";
import { Button, Col, Row, Popconfirm } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function EmployeesPage() {
    const dispatch = useDispatch();
    const route = useNavigate();
    const gridRef = useRef(null);
    const rowData = useSelector((state) => state.employee.data);
    const [searchParams] = useSearchParams();

    const [columnDefs] = useState([
        { field: "id", headerName: "Employee ID" },
        { field: "name" },
        { field: "email_address", headerName: "Email Address" },
        { field: "phone_number", headerName: "Phone Number" },
        { field: "worked", headerName: "Days worked in the café" },
        { field: "cafe", headerName: "Café name" },
        {
            field: "actions",
            maxWidth: 200,
            cellRenderer: (params) => (
                <Row gutter={[10, 10]}>
                    <Col>
                        <Button
                            size="small"
                            ghost
                            type="primary"
                            onClick={() => {
                                dispatch(setEditEmployee(params.data));
                                route("/employee/" + params.data.id);
                            }}
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col>
                        <Popconfirm
                            title="Delete the Employee"
                            description="Are you sure to delete this employee?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
                            onConfirm={() => {
                                dispatch(deleteEmployee(params.data.id));
                            }}
                        >
                            <Button size="small" danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
            ),
        },
    ]);

    useEffect(() => {
        dispatch(getEmployee(searchParams.get("cafe")));
    }, []);

    useEffect(() => {
        gridRef?.current?.api?.sizeColumnsToFit();
    }, [rowData]);

    return (
        <div className="body-content">
            <Row gutter={[16, 16]}>
                <Col span={20}></Col>
                <Col span={4}>
                    <Button
                        block
                        type="primary"
                        onClick={() => {
                            dispatch(clearEditEmployee());
                            route("/employee/add");
                        }}
                    >
                        Add New Employee
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24} className="table-container">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowHeight={50}
                        className="ag-theme-alpine"
                    ></AgGridReact>
                </Col>
            </Row>
        </div>
    );
}
