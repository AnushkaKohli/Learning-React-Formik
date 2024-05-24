# Formik : New Way

Using `formik.handleBlur`, `formik.handleChange` and `formik.values.name` can be a tedious process. Formik provides a new way to handle form state and form events.

We can use the `formik.getFieldProps` method to handle form state and form events. In this method, we pass the id of the input field as an argument. This method returns an object with the necessary props to handle form state and form events.

```html
<input
    type="password"
    id="password"
    {...formik.getFieldProps("password")}
    placeholder="••••••••"
/>
```

It returns an object with the following properties:

- `value`: The value of the input field.
- `onChange`: The event handler for the `onChange` event.
- `onBlur`: The event handler for the `onBlur` event.
- `name`: The name of the input field.

It is similar to :

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

## Using Formik Components

Formik provides a set of components to handle form state and form events. These components are:

### `<Formik>` Component

The `<Formik>` component is the top-level component that wraps the form. Itr is a replacement to the `useFormik` hook. The  object that is passed to the `useFormik` hook is passed as props to the `<Formik>` component.

```tsx
import { Formik } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
        </form>
    )}
</Formik>
```

### `<Form>` Component

The `<Form>` component is a replacement to the `<form>` tag. It is used to wrap the form fields. The `onSubmit` prop is removed because the `<Form>` component is a small wrapper around the html `<form>` element that automatically hooks into Formik's `handleSubmit` method.

```tsx
import { Formik, Form } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        {/* Form fields */}
    </Form>
</Formik>
```

### `<Field>` Component

The `<Field>` component is a replacement to the `<input>` tag. It is used to define the input fields in the form. The `<Field>` component does the following things for you:

- It automatically hooks up the `value` prop to Formik's `values` prop for the field.
- It automatically hooks up the `onChange` prop to Formik's `handleChange` method for the field.
- It automatically hooks up the `onBlur` prop to Formik's `handleBlur` method for the field.
- It uses the `name` attribute to match the formik state.
- It by default renders an `<input>` tag. You can pass the `as` prop to render a different tag.

```tsx
import { Formik, Form, Field } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        <Field type="text" name="name" />
        <Field type="email" name="email" />
        <Field type="password" name="password" />
        <button type="submit">Submit</button>
    </Form>
</Formik>
```

### `<ErrorMessage>` Component

The `<ErrorMessage>` component is used to display error messages. It is used to display the error message for a specific field. The `name` prop is used to specify the field for which the error message should be displayed only if the field has been visited and the error message exists.

```tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
<Formik 
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
>
    <Form>
        <Field type="text" name="name" />
        <ErrorMessage name="name" />
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
    </Form>
</Formik>
```
