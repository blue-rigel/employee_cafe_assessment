import { Button, Input, Popconfirm, Typography } from "antd";
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

let CafeForm = (props) => {
    const { handleSubmit, submit, pristine, submitting } = props;

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="input-container">
                <Text>Cafe Name</Text>
                <Field name="name" component={reuseableTextField} type="text" />
            </div>
            <div className="input-container">
                <Text>Description</Text>
                <Field
                    name="description"
                    component={reuseableTextField}
                    type="text"
                />
            </div>
            <div className="input-container">
                <Text>Location</Text>
                <Field
                    name="location"
                    component={reuseableTextField}
                    type="text"
                />
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
        errors.name = "Cafe Name must be between 6 and 10 characters";
    }

    if (!input.description) {
        errors.description = "Description is required";
    } else if (input.description.length > 256) {
        errors.description = "Description is too long";
    }

    if (!input.location) {
        errors.location = "Location is required";
    }

    return errors;
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.cafe.edit,
    };
};

export default connect(mapStateToProps)(
    reduxForm({
        form: "cafe",
        validate: validateInput,
        enableReinitialize: true,
        destroyOnUnmount: false,
    })(CafeForm),
);
