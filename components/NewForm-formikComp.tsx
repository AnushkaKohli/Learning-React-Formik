"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from "formik";
import * as Yup from "yup";

import './styles.css';

const initialValues = {
    name: "",
    email: "",
    password: "",
    comments: "",
    address: "",
    socials: {
        facebook: "",
        twitter: "",
    },
    phonenumbers: ["", ""],
    friends: [""],
}

const onSubmit = (values: any) => {
    console.log("Values: ", values);
}

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character")
        .required("Required"),
    comments: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    socials: Yup.object({
        facebook: Yup.string().required("Required"),
        twitter: Yup.string().required("Required"),
    }).required("Required"),
});

const NewForm_formikComp = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="space-y-4 md:space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="labelTag block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Full name
                    </label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Emelia Erickson"
                        className="formInput bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="name" component="div" className="error text-red-500 text-sm mt-1" />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="labelTag"
                    >
                        Email
                    </label>
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="emelia_erickson24@gmail.com"
                        className="formInput"
                    />
                    <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="labelTag"
                    >
                        Password
                    </label>
                    <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        className="formInput"
                    />
                    <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div>
                    <label
                        htmlFor="comments"
                        className="labelTag"
                    >
                        Comments
                    </label>
                    <Field
                        as="textarea"
                        id="comments"
                        name="comments"
                        placeholder="Your comments here..."
                        className="formInput"
                    />
                    <ErrorMessage name="comments">
                        {(errorMsg) =>
                            <div className="error">{errorMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <div>
                    <label
                        htmlFor="address"
                        className="labelTag"
                    >
                        Address
                    </label>
                    <FastField name="address">
                        {
                            (props: any) => {
                                console.log("FieldProps: ", props);
                                const { field, form, meta } = props;
                                return (
                                    <div>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="1234 Main St"
                                            {...field}
                                            className="formInput"
                                        />
                                        {meta.touched && meta.error && (
                                            <div className="error">
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        }
                    </FastField>
                </div>
                <div>
                    <label
                        htmlFor="facebook"
                        className="labelTag"
                    >
                        Facebook
                    </label>
                    <Field
                        type="text"
                        id="facebook"
                        name="socials.facebook"
                        placeholder="https://www.facebook.com/username"
                        className="formInput"
                    />
                    <ErrorMessage name="socials.facebook" component="div" className="error" />
                </div>
                <div>
                    <label
                        htmlFor="twitter"
                        className="labelTag"
                    >
                        Twitter
                    </label>
                    <Field
                        type="text"
                        id="twitter"
                        name="socials.twitter"
                        placeholder="https://twitter.com/username"
                        className="formInput"
                    />
                    <ErrorMessage name="socials.twitter" component="div" className="error" />
                </div>
                <div>
                    <label
                        htmlFor="phone1"
                        className="labelTag"
                    >
                        Phone 1
                    </label>
                    <Field
                        type="text"
                        id="phone1"
                        name="phonenumbers[0]"
                        placeholder="123-456-7890"
                        className="formInput"
                    />
                    <ErrorMessage name="phonenumbers[0]" component="div" className="error" />
                </div>
                <div>
                    <label
                        htmlFor="phone2"
                        className="labelTag"
                    >
                        Phone 2
                    </label>
                    <Field
                        type="text"
                        id="phone2"
                        name="phonenumbers[1]"
                        placeholder="123-456-7890"
                        className="formInput"
                    />
                    <ErrorMessage name="phonenumbers[1]" component="div" className="error" />
                </div>

                <div>
                    <label htmlFor="friends">List of Friends</label>
                    <FieldArray name="friends">
                        {
                            (fieldArrayProps) => {
                                // console.log("FieldArrayProps: ", fieldArrayProps);
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { friends } = values;
                                return (
                                    <div className="flex flex-col gap-4">
                                        {
                                            friends.map((friend: any, index: number) => (
                                                <div key={index} className="flex">
                                                    <Field name={`friends[${index}]`} className="formInput" />
                                                    <button
                                                        type="button"
                                                        onClick={() => push("")}
                                                        className="text-white bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 m-2"
                                                    >
                                                        +
                                                    </button>
                                                    {
                                                        index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="text-white bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 m-2"
                                                            >
                                                                -
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save
                </button>
            </Form>
        </Formik>
    );
}

export default NewForm_formikComp