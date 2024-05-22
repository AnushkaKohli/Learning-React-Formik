# React Formik

## What?

Formik is a small library that helps you deal with forms in React. Formik keeps track of form's state and handles form submission.

## Why?

1. Managing form data or form state
2. Form submission
3. Form validation and displaying error messages

## How to use formik?

### Import the `useFormik` hook

```ts
import { useFormik } from "formik";
```

### Create a formik instance

```ts
const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
    });
```

The initialValues 'name', 'email', 'password' correspond to the name attribute of the input fields.

### Add the onChange and value props to the input fields

```html
<form>
    <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
    />
    <button type="submit">Submit</button>
</form>
```

- `formik.values.password` is the value of the input field. And password is the name attribute of the input field.

- `handleChange` is a function (formik helper) that updates the form state.

- `formik.values` is an object that contains the form state and will give us access to the form data.

### Add the onSubmit event to the form

```html
<form onSubmit={formik.handleSubmit}>
</form>
```

- `formik.handleSubmit` is a function that handles form submission.

### Add the onSubmit function to the formik instance

```ts
const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
```

- `values` is an object that contains the form data that we were referring to using `formik.values`.

### Validate the form

Formik lets you define a validation function that will run when the form is submitted. This validation function needs to be assigned to the validate property of the formik instance in the `useFormik` hook.

```ts
const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("Values: ", values);
    },
    validate: (values) => {
      // errors.name, errors.email, errors.password
      //name, email, password are the name attributes of the input fields
      const errors: any = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } 
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
  });
```

### Display the error messages

```tsx
{
    formik.errors.name ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
    ) : null
}
```

> To make sure the error is shown only for visited fields, add the `onBlur` prop to the input fields with the value `formik.handleBlur`.

```html
<input
    type="text"
    name="name"
    id="name"
    onChange={formik.handleChange}
    value={formik.values.name}
    onBlur={formik.handleBlur}
    placeholder="Emelia Erickson"
    className=""
/>
```

We can keep track of the visited fields using the `touched` property of the formik instance.

```tsx
{
    formik.touched.name && formik.errors.name ? (
        <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
    ) : null
}
```

## Yup

To make the form validation more robust, we can use the Yup library. Yup is a JavaScript schema builder for value parsing and validation.

### Install Yup

```bash
npm install yup
```

### Import Yup

```ts
import * as Yup from "yup";
```

### Create a validation schema

```ts
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});
```

The `object` method of Yup is used to create a schema object. The schema object is used to define the validation rules for the form fields.

### Pass the validation schema to the `useFormik` hook

```ts
const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
    },
    onSubmit: (values) => {
        console.log("Values: ", values);
    },
    validationSchema: validationSchema,
});
```