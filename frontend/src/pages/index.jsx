import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCafe,
    deleteCafe,
    setEditCafe,
    clearEditCafe,
} from "../redux/slice/cafe";
import { Button, Col, Row } from "antd";
import { Input, Popconfirm } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

export default function IndexPage() {
    const dispatch = useDispatch();
    const route = useNavigate();
    const gridRef = useRef(null);
    const rowData = useSelector((state) => state.cafe.data);
    const [searchParams, setSearchParams] = useSearchParams();

    const [columnDefs] = useState([
        { field: "name", maxWidth: 200 },
        { field: "description" },
        {
            field: "employees",
            cellRenderer: (params) => (
                <Button
                    block
                    onClick={() => route("/employees?cafe=" + params.data.id)}
                >
                    {params.value}
                </Button>
            ),
            maxWidth: 120,
        },
        { field: "location" },
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
                                dispatch(setEditCafe(params.data));
                                route("/cafe/" + params.data.id);
                            }}
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col>
                        <Popconfirm
                            title="Delete the Cafe"
                            description="Are you sure to delete this cafe & it's employees?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
                            onConfirm={() => {
                                setSearchParams({ location: "" });
                                dispatch(deleteCafe(params.data.id));
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
        dispatch(getCafe(searchParams.get("location")));
    }, []);

    useEffect(() => {
        gridRef?.current?.api?.sizeColumnsToFit();
    }, [rowData]);

    return (
        <div className="body-content">
            <Row gutter={[16, 16]}>
                <Col span={20}>
                    <Search
                        placeholder="Search Cafe by location"
                        onSearch={(e) => {
                            setSearchParams({ location: e });
                            dispatch(getCafe(e));
                        }}
                        enterButton
                    />
                </Col>
                <Col span={4}>
                    <Button
                        block
                        type="primary"
                        onClick={() => {
                            dispatch(clearEditCafe());
                            route("/cafe/add");
                        }}
                    >
                        Add New Cafe
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
