import { Button, Input, Popconfirm, Select, Space, Typography } from "antd";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

const { Text } = Typography;

const reuseableTextField = ({ input, meta: { touched, error } }) => (
    <>
        <Input {...input} status={touched && error ? "error" : ""} />
        {touched && error && <small className="error-text">{error}</small>}
    </>
);

let EmployeeForm = (props) => {
    const { handleSubmit, submit, pristine, submitting, cafe } = props;

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="input-container">
                <Text>Employee Name</Text>
                <Field name="name" component={reuseableTextField} type="text" />
            </div>
            <div className="input-container">
                <Text>Email Address</Text>
                <Field
                    name="email_address"
                    component={reuseableTextField}
                    type="email"
                />
            </div>
            <div className="input-container">
                <Text>Phone Number</Text>
                <Field
                    name="phone_number"
                    component={reuseableTextField}
                    type="text"
                />
            </div>
            <div className="input-container">
                <Text>Gender</Text>
                <br />
                <Field
                    name="gender"
                    component="input"
                    type="radio"
                    value="Male"
                />
                <span>Male</span>
                &nbsp;
                <Field
                    name="gender"
                    component="input"
                    type="radio"
                    value="Female"
                />
                <span>Female</span>
            </div>
            <div className="input-container">
                <Text>Assigned Café</Text>
                <br />
                <Field name="cafeId" component="select">
                    <option value="">Select Cafe</option>
                    {cafe.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Field>
            </div>
            <Button
                type="primary"
                htmlType="submit"
                disabled={pristine || submitting}
            >
                Submit
            </Button>
            &nbsp;
            <Popconfirm
                title="Are you sure ?"
                description="all unsaved data will be lost."
                onConfirm={() => history.back()}
                disabled={pristine}
            >
                <Button
                    type="primary"
                    ghost
                    onClick={() => pristine && history.back()}
                >
                    Cancel
                </Button>
            </Popconfirm>
        </form>
    );
};

const validateInput = (input) => {
    let errors = {};
    if (!input.name || input.name.length < 6 || input.name.length > 10) {
        errors.name = "Employee Name must be between 6 and 10 characters";
    }

    if (!input.email_address) {
        errors.email_address = "Email Address is required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email_address)
    ) {
        errors.email_address = "Invalid email address";
    }

    if (!input.phone_number) {
        errors.phone_number = "Phone Number is required";
    } else if (!/^[8-9]\d{7}$/i.test(input.phone_number)) {
        errors.phone_number = "Invalid phone number";
    }

    if (!input.gender) {
        errors.gender = "Gender is required";
    }
    return errors;
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.employee.edit,
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: "employee",
        validate: validateInput,
        enableReinitialize: true,
        destroyOnUnmount: false,
    })(EmployeeForm),
);
