"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
    name: "",
    email: "",
    password: "",
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
});

const NewForm = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate,
        validationSchema,
    });
    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Full name
                </label>
                <input
                    type="text"
                    id="name"
                    {...formik.getFieldProps("name")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Emelia Erickson"
                />
                {
                    formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                    ) : null
                }
            </div>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="emelia_erickson24@gmail.com"
                />
                {
                    formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    ) : null
                }
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps("password")}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {
                    formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    ) : null
                }
            </div>
            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Save
            </button>
        </form>
    );
}

export default NewForm
